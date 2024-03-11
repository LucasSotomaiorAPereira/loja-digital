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
    mostrar(dados);
    atualizar_preco(dados);
});

async function atualizar_carrinho(info) {

    var valor_inical;

    var id = info.id;
    var preco = info.preco;
    var valor_select = info.quantidade;

    console.log(valor_select);
    console.log("preco: ", preco);

    var data = new FormData();


    if (valor_inical != valor_select && (valor_select > 0 && valor_select < 31)) {
        valor_inical = valor_select;

        data.append("id", id);
        data.append("preco", preco);
        data.append("valor_select", valor_select);

        var promise = await fetch("../php/atualizar-carrinho.php", {
            method: "POST",
            body: data
        });
    }

    var resposta = await promise.json();

    console.log(resposta);

    var get = await fetch("../php/listar-carrinho.php", {
        method: "GET"
    });

    var resposta_get = await get.json();

    var preco_final = 0;
    for (var i = 0; i < resposta_get.length; i++) {
        preco_final = parseFloat(preco_final) + parseFloat(resposta_get[i].preco_total);
        console.log(preco_final);
    }

    var div_preco = document.getElementById("preco_final");

    if (resposta.deu_certo) {
        div_preco.textContent = "Valor final: R$ " + parseFloat(preco_final).toFixed(2);
    } else {
        alert("Algo deu errado!");
    }
}

async function atualizar_preco(dados) {
    var i = 0;

    function mostrarProduto() {
        if (i < dados.length) {
            var id = dados[i].id;
            var preco = dados[i].preco_unitario;

            console.log("id: ", id);

            var selecionar_elemento = document.getElementById("quantidade" + id);

            if (localStorage.getItem("selecionado_" + id)) {
                var valorSelecionado = localStorage.getItem("selecionado_" + id);
                selecionar_elemento.value = valorSelecionado;

                var infoProduto = {
                    id: id,
                    preco: preco,
                    quantidade: valorSelecionado
                };
                atualizar_carrinho(infoProduto);
            }

            selecionar_elemento.addEventListener("change", function (event) { // change = quando o valor mudar
                var valorSelecionado = event.target.value; // pega o valor da variavel
                console.log("event.target.id: ", event.target.id);
                var id = event.target.id.replace("quantidade", "");  // id do elemento, mas sem a palavra quantidade

                var chaveLocalStorage = "selecionado_" + id;

                localStorage.setItem(chaveLocalStorage, valorSelecionado);
                var infoProduto = {
                    id: id,
                    preco: preco,
                    quantidade: valorSelecionado
                };
                atualizar_carrinho(infoProduto);
            });

            i++;

        } else {
            clearInterval(interval);
        }
    }
    var interval = setInterval(mostrarProduto, 1);
}

function mostrar(dados) {
    var preco_final = 0;
    for (var i = 0; i < dados.length; i++) {
        conteudo = `
                        <div class="produto" id="produto${dados[i].id}">
                        <div class="imagemProduto">
                            <img src="../img/${dados[i].imagem}" />
                        </div>
                        <div class="nomeProduto" id="${dados[i].nome}">${dados[i].nome}</div>
                        <div class="preco" id="preco${dados[i].id}">R$: ${dados[i].preco_unitario}</div>
                        <div class="qnt">
                            <form autocomplete="off" class="qnt" id="qnt${dados[i].id}">
                            <label>Quantidade:</label><br>
                            <select name="quantidade" id="quantidade${dados[i].id}">
                                ${Array.from({ length: 31 }, (_, index) => index === 0 ? '' : `<option value="${index}" ${index === 1 ? 'selected' : ''}>${index}</option>`).join('')}
                            </select>
                            </form>
                        </div>
                        <div></div>
                        <button class="removerCarrinho" type="button" onclick="remover(${dados[i].id}, ${dados[i].preco_unitario})">Remover</button>
                        </div>
                    `;

        document.getElementById("body").innerHTML += conteudo;

        preco_final = parseFloat(preco_final) + parseFloat(dados[i].preco_total);
        console.log(preco_final);
    }

    var conteudo_final = "";

    conteudo_final += '<div class="preco_final" id="preco_final">Valor final: R$ ' + preco_final.toFixed(2) + '</div>';

    document.getElementById("conteudo").innerHTML += conteudo_final;
}

async function remover(id, preco) {

    var div = document.getElementById("produto" + id);
    var selecionar_elemento = document.getElementById("quantidade" + id);

    var data = new FormData();
    data.append("id", id);

    var promise = await fetch("../php/remover-carrinho.php", {
        method: "POST",
        body: data
    });

    var resposta = await promise.json();

    console.log(resposta);

    if (resposta.sucesso) {
        var selecionar_elemento = document.getElementById("quantidade" + id);
        div.remove();

        if (localStorage.getItem("selecionado_" + id)) {
            var valorSelecionado = localStorage.getItem("selecionado_" + id);
            selecionar_elemento.value = valorSelecionado;
            console.log(valorSelecionado);

            var infoProduto = {
                id: id,
                preco: preco,
                quantidade: valorSelecionado
            };
            atualizar_carrinho(infoProduto);
        } else {
            var chaveLocalStorage = "selecionado_" + id;

            var valorSelecionado = selecionar_elemento.value
            console.log(valorSelecionado);
            localStorage.setItem(chaveLocalStorage, valorSelecionado);

            var infoProduto = {
                id: id,
                preco: preco,
                quantidade: valorSelecionado
            };
            atualizar_carrinho(infoProduto);
        }
    }
}

async function finalizar_compra() {
    window.location = "./finalizar-compra.html";
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