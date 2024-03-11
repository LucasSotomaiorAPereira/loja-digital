fetch("php/listar-produtos.php",
    {
        method: "GET"
    }
).then(async function (resposta) {
    var dados = await resposta.json();
    listarProdutos(dados);
    checkLogIn(dados);
});

async function checkLogIn(dados) {
    let promise = await fetch("php/session.php", {
        method: "POST",
    });

    let session = await promise.json();
    console.log(session);
    if (session[0] == "Cliente") {
        document.getElementById("cadastro").innerHTML = "Sair";
        document.getElementById("cadastro").setAttribute("onclick", "logOut()");
        document.getElementById("aCadastro").removeAttribute("href");
        document.getElementById("aLogin").remove();
        document.getElementById("user").style.display = "flex";
        document.getElementById("user").style.flexDirection = "column";
        document.getElementById("username").innerHTML = session[1] + "<br>" + session[0];
    }
    else if (session[0] == "Administrador") {
        document.getElementById("cadastro").innerHTML = "Sair";
        document.getElementById("cadastro").setAttribute("onclick", "logOut()");
        document.getElementById("aCadastro").removeAttribute("href");
        document.getElementById("aLogin").remove();
        document.getElementById('aAdm').setAttribute('href', 'pages/admin-logado.html')
        document.getElementById("user").style.display = "flex";
        document.getElementById("user").style.flexDirection = "column";
        document.getElementById("username").innerHTML = session[1] + "<br>" + session[0];
    }
    if (session[0] != "Cliente") {
        if (dados == null){
            return;
        }
        for (var i = 0; i < dados.length; i++) {
            document.getElementById("btnCarrinho" + i).setAttribute("onclick", "alertCarrinho()");
        }
    }
}

function listarProdutos(dados) {
    if (dados == null){
        return;
    }
    for (var i = 0; i < dados.length; i++) {
        var conteudo = "";

        conteudo += '<div class="produto">';
        conteudo += '<div class="imagemProduto"> <img src="img/' + dados[i].imagem + '"> </img>' + '</div>';
        conteudo += '<div class="nomeProduto" id="' + dados[i].nome + '">' + dados[i].nome + '</div>';
        conteudo += '<div class="preco">' + "R$: " + dados[i].preco + '</div>';
        conteudo += '<button id="btnCarrinho' + i + '" class="adicionarCarrinho" type="button" onclick="adicionar( ' + dados[i].id + ', \'' + dados[i].nome + '\', ' + dados[i].preco + ', \'' + dados[i].imagem + '\')">Adicionar ao Carrinho</button>';
        conteudo += '</div>';

        document.getElementById("body").innerHTML += conteudo;
    }
}

async function pesquisar() {
    var nome = document.getElementById("txtBusca").value;

    var formPes = document.getElementById('formPesquisa');

    var dadosPes = new FormData(formPes);



    if (nome.toString().length < 51) {
        var promise = await fetch("php/pesquisar.php", {
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

        conteudo += '<div class="produto">';
        conteudo += '<div class="imagemProduto"> <img src="img/' + dados[i].imagem + '"> </img>' + '</div>';
        conteudo += '<div class="nomeProduto" id="' + dados[i].nome + '">' + dados[i].nome + '</div>';
        conteudo += '<div class="preco">' + "R$: " + dados[i].preco + '</div>';
        conteudo += '<button id="btnCarrinho' + i + '" class="adicionarCarrinho" type="button" onclick="adicionar( ' + dados[i].id + ', \'' + dados[i].nome + '\', ' + dados[i].preco + ', \'' + dados[i].imagem + '\')">Adicionar ao Carrinho</button>';
        conteudo += '</div>';

        document.getElementById("body").innerHTML += conteudo;
    }
}

async function adicionar(id, nome, valor, img) {

    var promise1 = await fetch("php/listar-carrinho.php", {
        method: "GET"
    });

    var dados_carrinho = await promise1.json();

    console.log(dados_carrinho);

    var igual = new Boolean;

    if (dados_carrinho.length < 1) {
        igual = false;
    } else {
        for (var i = 0; i < dados_carrinho.length; i++) {
            console.log(dados_carrinho[i].nome);
            console.log(dados_carrinho[i].preco);
            console.log(dados_carrinho[i].imagem);
            if (dados_carrinho[i].nome == nome && dados_carrinho[i].preco == valor && dados_carrinho[i].imagem == img) {
                igual = true;
                break;
            }
        }
    }

    var data = new FormData();
    data.append("id", id);
    data.append("nome", nome);
    data.append("preco", valor);
    data.append("imagem", img);

    if (igual == false) {
        var promise = await fetch("php/carrinho.php", {
            method: "POST",
            body: data
        });
    }

    var resposta = await promise.json();

    console.log(resposta);

    if (resposta && !resposta.igual) {
        alert("Adicionado ao carrinho!");
    }

    if (resposta.igual) {
        alert("Este item já está no carrinho!");
    }
}

async function logOut() {
    await fetch("php/logout.php", {
        method: "POST",
    });
    window.location = "index.html"
}

function alertCarrinho() {
    alert("Só é possível realizar um compra com uma conta de Cliente.")
}

async function showMenu() {
    let promise = await fetch("php/session.php", {
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
        document.getElementById('aAdm-vertical').setAttribute('href', 'pages/admin-logado.html')
        document.getElementById("user-vertical").style.display = "flex";
        document.getElementById("user-vertical").style.flexDirection = "column";
        document.getElementById("username-vertical").innerHTML = session[1] + "<br>" + session[0];
    }
}
function closeMenu() {
    document.getElementById("menuVertical").style.width = "0px"
    document.getElementById("user-vertical").style.display = "none";
    document.getElementById("menuBars").setAttribute("onclick", "showMenu()");
}

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