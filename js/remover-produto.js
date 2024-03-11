async function checkLogIn() {
    let promise = await fetch("../php/session.php", {
        method: "POST",
    });

    let session = await promise.json();
    console.log(session);
    if (session[0] != "Administrador") {
        window.location = "../index.html"
    }
    else if (session[0] == "Administrador") {
        document.getElementById("cadastro").innerHTML = "Sair";
        document.getElementById("cadastro").setAttribute("onclick", "logOut()");
        document.getElementById("aCadastro").removeAttribute("href");
        document.getElementById("login").remove();
        document.getElementById('aAdm').setAttribute('href', '../pages/admin-logado.html')
        document.getElementById("user").style.display = "flex";
        document.getElementById("user").style.flexDirection = "column";
        document.getElementById("username").innerHTML = session[1] + "\n" + session[0];
    }
}
checkLogIn()

fetch("../php/listar-produtos.php",
    {
        method: "GET"
    }
).then(async function (resposta) {
    var dados = await resposta.json();
    listarProdutos(dados);
})

function listarProdutos(dados) {
    for (var i = 0; i < dados.length; i++) {
        var conteudo = "";

        conteudo += '<div class="produto" id="produto' + dados[i].id + '">';
        conteudo += '<div class="imagemProduto"> <img src="../img/' + dados[i].imagem + '"> </img>' + '</div>';
        conteudo += '<div class="nomeProduto" id="' + dados[i].nome + '">' + dados[i].nome + '</div>';
        conteudo += '<div class="preco">' + "R$: " + dados[i].preco + '</div>';
        conteudo += '<button class="removerProduto" type="button" onclick="remover(' + dados[i].id + ')">Remover Produto</button>';
        conteudo += '</div>';

        document.getElementById("body").innerHTML += conteudo;
    }
}

async function pesquisar() {
    var nome = document.getElementById("txtBusca").value;

    var formPes = document.getElementById('formPesquisa');

    var dadosPes = new FormData(formPes);



    if (nome.toString().length < 51) {
        var promise = await fetch("../php/pesquisar.php", {
            method: "POST",
            body: dadosPes
        });
    } else {
        alert("O nome deve ter até 50 caracteres!");
    }


    var resposta = await promise.json();

    listarProdutosPesquisa(resposta);
}

function listarProdutosPesquisa(dados) {

    var div = document.getElementsByClassName("produto");
    while (div.length > 0) {
        div[0].parentNode.removeChild(div[0]);
    }

    for (var i = 0; i < dados.length; i++) {
        var conteudo = "";

        conteudo += '<div class="produto" id="produto' + dados[i].id + '">';
        conteudo += '<div class="imagemProduto"> <img src="../img/' + dados[i].imagem + '"> </img>' + '</div>';
        conteudo += '<div class="nomeProduto" id="' + dados[i].nome + '">' + dados[i].nome + '</div>';
        conteudo += '<div class="preco">' + "R$: " + dados[i].preco + '</div>';
        conteudo += '<button class="removerProduto" type="button" onclick="remover(' + dados[i].id + ')">Remover Produto</button>';
        conteudo += '</div>';

        document.getElementById("body").innerHTML += conteudo;
    }
}

async function remover(id) {

    var div = document.getElementById("produto" + id);

    var data = new FormData();
    data.append("id", id);

    var promise = await fetch("../php/remover-produto.php", {
        method: "POST",
        body: data
    });

    var resposta = await promise.json();

    console.log(resposta);

    if (resposta.sucesso) {
        div.remove();
    }
}

async function logOut() {
    await fetch("../php/logout.php", {
        method: "POST",
    });
    window.location = "../index.html"
}
async function showMenu() {
    let promise = await fetch("../php/session.php", {
        method: "POST",
    });
    let session = await promise.json();
    document.getElementById("menuVertical").style.width = "250px"
    document.getElementById("menuBars").setAttribute("onclick", "closeMenu()");
    if (session[0] == "Cliente" || session[0] == "Administrador") {
        document.getElementById("user-vertical").style.display = "flex";
        document.getElementById("user-vertical").style.marginTop = "20px";
        document.getElementById("user-vertical").style.flexDirection = "column";
    }
    if (session[0] == "Cliente") {
        if(document.getElementById("aLogin-vertical")!=null){
            document.getElementById("aLogin-vertical").remove();
        }
        document.getElementById("cadastro-vertical").innerHTML = "Sair";
        document.getElementById("cadastro-vertical").setAttribute("onclick", "logOut()");
        document.getElementById("aCadastro-vertical").removeAttribute("href");
        document.getElementById("aLogin-vertical").remove();
        document.getElementById("user-vertical").style.display = "flex";
        document.getElementById("user-vertical").style.flexDirection = "column";
        document.getElementById("username-vertical").innerHTML = session[1] + "<br>" + session[0];
    }
    else if (session[0] == "Administrador") {
        if(document.getElementById("aLogin-vertical")!=null){
            document.getElementById("aLogin-vertical").remove();
        }
        document.getElementById("cadastro-vertical").innerHTML = "Sair";
        document.getElementById("cadastro-vertical").setAttribute("onclick", "logOut()");
        document.getElementById("aCadastro-vertical").removeAttribute("href");
        document.getElementById('aAdm-vertical').setAttribute('href', 'admin-logado.html')
        document.getElementById("user-vertical").style.display = "flex";
        document.getElementById("user-vertical").style.flexDirection = "column";
        document.getElementById("username-vertical").innerHTML = session[1] + "<br>" + session[0];
    }
}

function closeMenu() {
    document.getElementById("menuVertical").style.width = "0px"
    document.getElementById("menuBars").setAttribute("onclick", "showMenu()");
}

document.addEventListener("DOMContentLoaded", function() {
    function verificarTamanhoDaTela() {
        if (window.innerWidth > 1000) {
            document.getElementById("menuVertical").style.display = 'none';
            document.getElementById("menuBars").style.display = 'none'
        } else {
            document.getElementById("menuVertical").style.display = 'block';
            document.getElementById("menuBars").style.display = 'block'
        }
    }
    
    verificarTamanhoDaTela();
    window.addEventListener('resize', verificarTamanhoDaTela);
  });