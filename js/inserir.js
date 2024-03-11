async function checkLogIn() {
    let promise = await fetch("../php/session.php", {
        method: "POST",
    });

    let session = await promise.json();
    console.log(session);
    if (session[0] != "Administrador") {
        window.location = "../index.html"
    }
    else {
        document.getElementById("cadastro").innerHTML = "Sair";
        document.getElementById("cadastro").setAttribute("onclick", "logOut()");
        document.getElementById("aCadastro").removeAttribute("href");
        document.getElementById("login").remove();
        document.getElementById('aAdm').setAttribute('href', '../pages/admin-logado.html')
        document.getElementById("user").style.display = "flex";
        document.getElementById("user").style.flexDirection = "column";
        document.getElementById("username").innerHTML = session[1] + "<br>" + session[0];
    }
}
checkLogIn()

async function gravar() {

    var form = document.getElementById('formProduto');
    var nome = document.getElementById("nome").value;
    var preco = document.getElementById("preco").value;
    var img = document.getElementById("imagem").value;
    const regexPreco = new RegExp("^([0-9]{1,11}(\.[0-9]{1,2}))$|^[0-9]{1,14}$");
    const regexNome = new RegExp("^((.){1,51})$");

    preco = parseFloat(preco).toFixed(2);

    var dados = new FormData(form);
    dados.append("imagem", img[0])

    if (!nome || !preco || !img) {
        alert("Você deve preencher todos os campos!");
    } else {
        if (regexNome.test(nome) && regexPreco.test(preco)) {
            var promise = await fetch("../php/insere-produto.php", {
                method: "POST",
                body: dados
            });

            var resposta = await promise.json();

            console.log(resposta);

            console.log(resposta.null);
            console.log(resposta.tamanho);
            console.log(resposta.valor);

            if (!resposta.null && resposta.tamanho && resposta.valor) {
                alert("Produto Inserido!");
            } else if (resposta.null) {
                alert("Você deve preencher todos os campos!");
            }
            else if (!resposta.tamanho) {
                alert("Nome Inválido");
            }
            else if (!resposta.valor) {
                alert("Preço Inválido");
            }
        } else {
            alert("Entradas Invalidas");
        }
    }

}

function labelUpdate() {
    var label = document.getElementById("label");
    var img = document.getElementById("imagem").files;

    label.innerHTML = img[0].name;

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