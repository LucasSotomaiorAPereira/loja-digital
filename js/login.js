async function checkLogIn() {
    let promise = await fetch("../php/session.php", {
        method: "POST",
    });

    let session = await promise.json();
    console.log(session);
    if (session[0] == "Administrador" || session[0] == "Cliente") {
        window.location = "../index.html"
    }
}
checkLogIn()

async function login()
{
    var form = document.getElementById('formLogin');
    var dados = new FormData(form);

    var resposta = await fetch("../php/login.php", {
        method: "POST",
        body: dados
    });

    resposta = await resposta.json();
    alert(resposta);

    if (resposta === "Login realizado com sucesso.")
    {
        window.location="../index.html";
    } 
    else if
    (resposta === "Login do admin realizado com sucesso."){
        window.location="admin-logado.html";
    }
}
