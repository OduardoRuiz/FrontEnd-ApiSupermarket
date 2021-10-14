let info = undefined;

let login = function(){
    let body = { 
        'email' : document.getElementById('email').value,
        'password' : document.getElementById('password').value,
        'device_name' : 'WebConnection'
    }

    let headers = {
        'Content-Type' : 'application/json',
    }

    fetch('http://127.0.0.1:8000/api/login', {
        'method' : 'POST',
        'headers' : headers,
        'body' : JSON.stringify(body)
    }).then(res => res.json())
      .then((data) => {
        console.log(data);
        if(data.error){
            alert(data.error);
        }else{
            info = data;
            let elemento = document.getElementById('login');
            elemento.innerHTML = `<span>${data.user.name}</span>`;

        }
    });
}

let carregaProduto = function(){
    if(!info){
        alert("Faça o login primeiro");
        return;
    }
    
    let headers = {
        'Authorization' : `Bearer ${info.token}`
    }

    fetch('http://127.0.0.1:8000/api/product', {
        'headers' : headers,
    }).then(res => res.json())
      .then((data) => {
        let select = document.getElementById('produtos');
        select.innerHTML = '';
        for(let i = 0; i < data.length; i++){
            select.innerHTML += `<option value="${data[i].id}">${data[i].name}</option>`
        }
    });
}