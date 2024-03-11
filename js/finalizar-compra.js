async function checkLogIn() {
    let promise = await fetch("../php/session.php", {
        method: "POST",
    });

    let session = await promise.json();
    console.log(session);
    if (session[0] == "Cliente") {
        document.getElementById("cadastro").innerHTML = "Sair";
        document.getElementById("cadastro").setAttribute("onclick", "logOut()");
        document.getElementById("aCadastro").removeAttribute("href");
        document.getElementById("login").remove();
        document.getElementById("user").style.display = "flex";
        document.getElementById("user").style.flexDirection = "column";
        document.getElementById("username").innerHTML = session[1] + "\n" + session[0];
        document.getElementById("cliente").innerHTML = session[1];
    }
    else if (session[0] == "Administrador") {
        window.location = "../index.html"
    }
    else if (session[0] != "Administrador" && session[0] != "Cliente") {
        window.location = "../index.html"
    }
}
checkLogIn()

fetch("../php/listar-carrinho.php",
    {
        method: "GET"
    }
).then(async function (resposta) {
    var dados = await resposta.json();
    escreverDada(dados);
    mostrar(dados);
});

async function escreverDada(dados) {
    var preco_final = 0;

    for (var i = 0; i < dados.length; i++) {
        preco_final = parseFloat(preco_final) + parseFloat(dados[i].preco_total);
    }
    document.getElementById("texto_total").innerHTML += preco_final.toFixed(2);
}

function mostrar(dados) {
    for (var i = 0; i < dados.length; i++) {
        conteudo = `
                        <div class="produto" id="produto${dados[i].id}">
                        <div class="nomeProduto" id="nome${dados[i].id}">${dados[i].nome}</div>
                        <div></div>
                        <div class="qnt">Qnt: ${dados[i].quantidade}</div>
                        <div></div>
                        <div class="preco" id="preco${dados[i].id}">R$: ${dados[i].preco_unitario}</div>
                        </div>
                    `;
        console.log(conteudo);

        document.getElementById("lista_produtos").innerHTML += conteudo;
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