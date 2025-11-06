# 🚀 Projeto ONG AcolheTech (Front-end)

Este é o projeto final da disciplina de Desenvolvimento Front-end para Web, focado na criação de uma plataforma profissional para uma ONG fictícia, a AcolheTech. O projeto evoluiu de HTML puro para uma Single Page Application (SPA) completa, interativa e acessível.

## 🎯 Objetivo

Desenvolver uma plataforma web que permita à AcolheTech gerenciar atividades, divulgar projetos e captar voluntários, aplicando conceitos de HTML5, CSS3, JavaScript, Acessibilidade (WCAG) e Versionamento (Git).

## ✨ Funcionalidades Principais

* **Single Page Application (SPA):** Navegação fluida sem recarregamento da página, implementada com JavaScript puro (Fetch API e History API).
* **Design Responsivo:** Layout adaptável para dispositivos móveis, tablets e desktops (Mobile First).
* **Sistema de Design:** UI consistente usando Variáveis CSS (cores, fontes, espaçamento).
* **Modo Escuro (Acessibilidade):** Botão para alternar entre temas claro e escuro, com preferência salva no LocalStorage.
* **Validação de Formulário:** Verificação de dados de formulário em tempo real com JavaScript.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica e acessível.
* **CSS3:** Layouts modernos (Grid e Flexbox), animações e design responsivo.
* **JavaScript (ES6+):** Manipulação do DOM, roteamento SPA, validação e lógica do Modo Escuro.
* **Git & GitHub:** Controle de versão, GitFlow (branches) e gerenciamento de projeto (Issues, PRs).
* **Node.js (para desenvolvimento):** O projeto requer um servidor local para funcionar.

---

## 🔴 ATENÇÃO: Como Executar o Projeto

Este projeto é uma **Single Page Application (SPA)** e utiliza `fetch()` para carregar templates. Por razões de segurança (CORS) dos navegadores, ele **não funcionará** se o `index.html` for aberto diretamente (via `file:///`).

**É obrigatório executá-lo a partir de um servidor local.**

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão LTS)
* `lite-server` (um servidor leve)

### Passos para Execução

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/MahoragaX/projeto-ong-entrega1.git](https://github.com/MahoragaX/projeto-ong-entrega1.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd projeto-ong-entrega1
    ```

3.  **Instale o `lite-server` (se ainda não o tiver):**
    ```bash
    npm install -g lite-server
    ```

4.  **Execute o servidor:**
    ```bash
    lite-server
    ```

5.  O servidor irá iniciar e abrir o seu navegador automaticamente na porta correta (ex: `http://localhost:3000`).

---

## 👨‍💻 Autor

* **Yago Medina**
    * Aluno de Análise e Desenvolvimento de Sistemas