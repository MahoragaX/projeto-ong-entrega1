/* * ARQUIVO: js/script.js
 * OBJETIVO: Funcionalidade do menu hambúrguer
 */

// Espera o documento carregar para rodar o script
document.addEventListener('DOMContentLoaded', function() {
    
    // Seleciona o botão hambúrguer e o menu de navegação
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');

    // Verifica se os dois elementos existem na página
    if (hamburgerBtn && mainNav) {
        
        // Adiciona um evento de "clique" ao botão
        hamburgerBtn.addEventListener('click', function() {
            
            // Adiciona ou remove a classe 'active' do menu
            // O CSS em navigation.css cuida de mostrar/esconder
            mainNav.classList.toggle('active');
            
        });
    }

});