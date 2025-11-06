/* *
 * script.js - Funções principais da AcolheTech
 * * Lida com o roteamento da SPA, menu mobile,
 * validação de formulário e troca de tema.
 */

// ===================================================================
// INICIALIZAÇÃO GERAL
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSPARouter();
    initThemeToggle();
    // A validação do formulário (initFormValidation) é chamada
    // pelo roteador quando a página de cadastro é carregada.
});

// ===================================================================
// NAVEGAÇÃO (Menu Hambúrguer)
// ===================================================================

/**
 * Inicializa a funcionalidade do menu hambúrguer.
 */
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
// ROTEADOR SPA (Single Page Application)
// ===================================================================

const mainContent = document.getElementById('main-content');
const pageCache = new Map(); // Cache para não recarregar páginas já visitadas

/**
 * Carrega o conteúdo da página via fetch e o injeta no <main>.
 * @param {string} path - O caminho da URL (ex: "/projetos.html").
 * @param {string} [hash] - O fragmento da URL (ex: "#doacoes").
 */
async function loadPageContent(path, hash) {
    if (!mainContent) return;

    // Fecha o menu mobile ao navegar
    document.getElementById('main-nav').classList.remove('active');

    // Se for "/", carrega o template "home.html"
    let pagePath = (path === '/' || path.endsWith('index.html')) ? '/home.html' : path;

    let content = '';

    // 1. Tenta pegar do Cache
    if (pageCache.has(pagePath)) {
        content = pageCache.get(pagePath);
    } else {
        // 2. Se não está no cache, busca na rede (fetch)
        try {
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

    // 4. Lida com âncoras (ex: /projetos.html#doacoes)
    if (hash) {
        setTimeout(() => {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
    }

    // 5. Se for a página de cadastro, inicializa o formulário
    if (pagePath === '/cadastro.html') {
        initFormValidation();
    }
}

/**
 * Inicializa o roteador SPA.
 */
function initSPARouter() {
    // Delegação de evento: ouve todos os cliques no body
    document.body.addEventListener('click', event => {
        const target = event.target.closest('a'); // Acha o link clicado

        // Se o link não for um 'spa-link', deixa o navegador agir
        if (!target || !target.classList.contains('spa-link')) {
            return;
        }

        event.preventDefault(); // Impede o recarregamento

        const href = target.getAttribute('href');
        const url = new URL(href, window.location.origin);
        const path = url.pathname;
        const hash = url.hash;

        // Atualiza a URL na barra do navegador (se não for a mesma)
        if (window.location.href !== url.href) {
            history.pushState({ path }, '', href);
        }
        
        loadPageContent(path, hash);
    });

    // Ouve os botões Voltar/Avançar do navegador
    window.addEventListener('popstate', (event) => {
        const path = window.location.pathname;
        const hash = window.location.hash;
        loadPageContent(path, hash);
    });

    // Carrega o conteúdo da página inicial (ou da URL atual em caso de F5)
    const initialPath = window.location.pathname;
    const initialHash = window.location.hash;
    loadPageContent(initialPath, initialHash);
}

// ===================================================================
// VALIDAÇÃO DE FORMULÁRIO
// ===================================================================

/**
 * Inicializa a validação customizada do formulário de cadastro.
 * Esta função é chamada pelo Roteador quando a página de cadastro é carregada.
 */
function initFormValidation() {
    const form = document.getElementById('form-cadastro');
    if (!form) return; // Segurança, caso o form não exista

    form.addEventListener('submit', event => {
        event.preventDefault(); // Impede o envio real
        
        let isFormValid = true;
        
        // Limpa erros antigos
        form.querySelectorAll('.input-error').forEach(input => {
            input.classList.remove('input-error');
        });

        const inputs = form.querySelectorAll('input[required]');

        inputs.forEach(input => {
            let isValid = input.checkValidity(); // Usa a validação nativa
            
            if (input.id === 'nome' && input.value.trim().length < 3) {
                 isValid = false;
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
            form.reset(); 
            
            setTimeout(() => {
                if (successMsg) successMsg.style.display = 'none';
            }, 4000);

        } else {
            console.log('Formulário inválido.');
        }
    });
}

// ===================================================================
// ACESSIBILIDADE (Modo Escuro)
// ===================================================================

/**
 * Inicializa o botão de troca de tema (Modo Claro/Escuro).
 */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (!toggleBtn) return;

    // Aplica o tema (salvo ou do sistema)
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleBtn.innerHTML = '&#9728;'; // Ícone de Sol
        } else {
            document.documentElement.removeAttribute('data-theme');
            toggleBtn.innerHTML = '&#127769;'; // Ícone de Lua
        }
    }

    // Verifica preferência salva no LocalStorage
    let savedTheme = localStorage.getItem('theme');
    
    // Se não houver, verifica a preferência do sistema
    if (!savedTheme) {
        savedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    applyTheme(savedTheme);

    // Evento de clique ao botão
    toggleBtn.addEventListener('click', () => {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            localStorage.setItem('theme', 'light');
            applyTheme('light');
        } else {
            localStorage.setItem('theme', 'dark');
            applyTheme('dark');
        }
    });
}