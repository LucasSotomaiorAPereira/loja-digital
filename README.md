# Projeto de Loja Virtual

## Descrição:

Este projeto foi desenvolvido como parte da disciplina de Programação WEB no segundo período do curso de Ciência da Computação. O objetivo era criar uma loja virtual funcional, utilizando as tecnologias aprendidas durante o semestre, com foco no desenvolvimento full-stack, abrangendo frontend e backend.

## Funcionalidades:

* **Catálogo de Produtos:**
    * Exibição de produtos.
    * Sistema de busca por nome.
    * Detalhes do produto com imagens.
* **Carrinho de Compras:**
    * Adicionar e remover produtos.
    * Atualizar a quantidade de itens.
    * Calcular o valor total da compra.
    * Salvar o carrinho para compras futuras (se o usuário estiver logado).
* **Cadastro e Autenticação de Usuários:**
    * Criação de contas de usuário.
    * Login e logout.
* **Painel Administrativo:**
    * Gerenciar produtos (adicionar, editar, remover).
    * Gerenciar usuários.

## Tecnologias Utilizadas:

* **Frontend:**
    * **HTML5:** Estruturação do conteúdo da página.
    * **CSS3:** Estilização visual da loja, incluindo layout, cores e fontes.
    * **JavaScript:** * Validação de formulários.
        * Requisições assíncronas (AJAX) para interação com o backend.
        * Manipulação dinâmica do DOM para atualizar a interface.
* **Backend:**
    * **PHP:** Linguagem de programação server-side para processar dados e gerar conteúdo dinâmico.
    * **SQL:** Linguagem de consulta para interagir com o banco de dados (MySQL).
    * **Banco de Dados (MySQL):** Armazenamento de informações sobre produtos, usuários, pedidos, etc.
* **Servidor Web:**
    * **Apache:** Servidor web local para hospedar a aplicação.

## Bibliotecas e Frameworks:

* **Bootstrap (opcional):** Framework CSS para facilitar a criação de layouts responsivos.
* **Font Awesome (opcional):** Biblioteca de ícones para adicionar elementos visuais.

## Observações:

* Este projeto foi desenvolvido em equipe, com a colaboração de três alunos.
* O foco principal foi o aprendizado das tecnologias web e a aplicação prática dos conceitos.
* A segurança foi considerada, mas o projeto pode precisar de medidas adicionais para um ambiente de produção.

## Instruções de Uso:

1. Clone o repositório para sua máquina local.
2. Importe o arquivo `database.sql` para seu servidor MySQL.
3. Configure as informações de conexão com o banco de dados no arquivo `connection.php`.
4. Configure o servidor Apache local para apontar para o diretório raiz do projeto.
5. Abra o arquivo `index.html` em seu navegador.
