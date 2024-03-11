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
        document.getElementById("username").innerHTML = session[1] + "\n" + session[0];
    }
}
checkLogIn()
async function gravar() {
    var nome = document.getElementById('nome').value
    var email = document.getElementById('email').value
    var senha = document.getElementById('senha').value
    var confirmaSenha = document.getElementById('confirmar-senha').value
    var form = document.getElementById('formCadastro');
    var dados = new FormData(form);
    const regex = new RegExp("\\w+@admin\\.com");

    if (nome == "" || email == "" || senha == "" || confirmaSenha == "") {
        alert("Preencha todos os campos!");
    }
    else if (senha != confirmaSenha) {
        alert("As senhas não são iguais!");
    }
    else if (!regex.test(email)) {
        alert("Email Inválido!")
    }
    else {
        var resposta = await fetch("../php/cadastro-adm.php", {
            method: "POST",
            body: dados
        });
        resposta = await resposta.json();
        if (resposta) {
            alert("Adminstrado Cadastrado!")
            window.location = "../index.html";
        } else {
            alert("Algo deu Errado. Tente novamente.")
        }
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