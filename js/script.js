/* * ARQUIVO: js/script.js (Versão Otimizada para SPA)
 * OBJETIVO: Roteamento, Menu e Validação.
 */

// ===================================================================
// INICIALIZAÇÃO GERAL
// ===================================================================

// Espera o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSPARouter();
});

// ===================================================================
// MÓDULO 1: NAVEGAÇÃO (Menu Hambúrguer)
// ===================================================================
function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');

    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }
}

// ===================================================================
// MÓDULO 2: ROTEADOR SPA (Single Page Application)
// ===================================================================

const mainContent = document.getElementById('main-content');
const pageCache = new Map(); // Cache para não recarregar páginas

async function loadPageContent(path, hash) {
    if (!mainContent) return;

    // Fecha o menu mobile ao navegar
    document.getElementById('main-nav').classList.remove('active');

    // Define o caminho da página
    let pagePath = path === '/' ? '/index.html' : path;
    
    // Otimização: Se for '/index.html', carrega o 'home.html' (template)
    // Para simplificar, vou criar um template da home
    if (pagePath === '/index.html') {
         pagePath = '/home.html';
    }

    let content = '';

    // 1. Tenta pegar do Cache
    if (pageCache.has(pagePath)) {
        content = pageCache.get(pagePath);
    } else {
        // 2. Se não está no cache, busca na rede (fetch)
        try {
            // OTIMIZAÇÃO: O 'fetch' agora usa o caminho absoluto
            const response = await fetch(pagePath);
            if (!response.ok) throw new Error('Página não encontrada.');
            
            content = await response.text();
            pageCache.set(pagePath, content); // Salva no cache

        } catch (error) {
            console.error('Erro ao carregar página:', error);
            content = `<div class="container"><p>Erro ao carregar o conteúdo. Tente novamente.</p></div>`;
        }
    }

    // 3. Injeta o conteúdo no <main>
    mainContent.innerHTML = content;

    // 4. OTIMIZAÇÃO: Lida com âncoras (ex: /projetos.html#doacoes)
    if (hash) {
        const element = document.querySelector(hash);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // 5. IMPORTANTE: Se for a página de cadastro, inicializa o formulário
    if (pagePath === '/cadastro.html') {
        initFormValidation();
    }
}

function initSPARouter() {
    // Delegação de evento: ouve todos os cliques no body
    document.body.addEventListener('click', event => {
        const target = event.target.closest('a'); // Acha o link clicado

        // Se o link não for um 'spa-link', deixa o navegador agir
        if (!target || !target.classList.contains('spa-link')) {
            return;
        }

        event.preventDefault(); // Impede o recarregamento

        // OTIMIZAÇÃO: Pega o 'href' e o 'hash'
        const href = target.getAttribute('href');
        const url = new URL(href, window.location.origin);
        const path = url.pathname;
        const hash = url.hash;

        // Atualiza a URL na barra do navegador
        history.pushState({ path }, '', href);
        // Carrega o conteúdo
        loadPageContent(path, hash);
    });

    // Ouve os botões Voltar/Avançar do navegador
    window.addEventListener('popstate', (event) => {
        const path = window.location.pathname;
        const hash = window.location.hash;
        loadPageContent(path, hash);
    });

    // Carrega a página inicial ou a página de F5
    const initialPath = window.location.pathname;
    const initialHash = window.location.hash;
    loadPageContent(initialPath, initialHash);
}

// ===================================================================
// MÓDULO 3: VALIDAÇÃO DE FORMULÁRIO (Entrega III)
// ===================================================================
function initFormValidation() {
    const form = document.getElementById('form-cadastro');
    if (!form) return; // Segurança, caso o form não exista

    form.addEventListener('submit', event => {
        event.preventDefault();
        
        let isFormValid = true;
        
        // Limpa erros antigos
        form.querySelectorAll('.input-error').forEach(input => {
            input.classList.remove('input-error');
        });

        // Pega todos os inputs com 'required'
        const inputs = form.querySelectorAll('input[required]');

        inputs.forEach(input => {
            let isValid = input.checkValidity(); // Usa a validação do navegador (pattern, email, etc)
            
            if (input.type === 'text' && input.value.trim().length < 3) {
                 isValid = false; // Regra customizada para nome
            }
            
            if (!isValid) {
                isFormValid = false;
                input.classList.add('input-error');
            }
        });

        if (isFormValid) {
            console.log('Formulário válido. Enviando...');
            const successMsg = document.getElementById('form-success-message');
            if (successMsg) successMsg.style.display = 'block';
            form.reset(); // Limpa o formulário
        } else {
            console.log('Formulário inválido.');
        }
    });
}