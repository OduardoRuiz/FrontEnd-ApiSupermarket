let info = undefined;

let login = function () {
    let body = {
        'email': document.getElementById('email').value,
        'password': document.getElementById('password').value,
        'device_name': 'WebConnection'
    }

    let headers = {
        'Content-Type': 'application/json',
    }

    fetch('http://127.0.0.1:8000/api/login', {
        'method': 'POST',
        'headers': headers,
        'body': JSON.stringify(body)
    }).then(res => res.json())
        .then((data) => {
            console.log(data);
            if (data.error) {
                alert(data.error);
            } else {
                info = data;
                let elemento = document.getElementById('login');
                elemento.innerHTML = `<span>${data.user.name}</span>`;

            }
        });
}

let carregaProduto = function () {
    if (!info) {
        alert("Faça o login primeiro");
        return;
    }

    let headers = {
        'Authorization': `Bearer ${info.token}`
    }

    fetch('http://127.0.0.1:8000/api/product', {
        'headers': headers,
    }).then(res => res.json())
        .then((data) => {
            let select = document.getElementById('produtos');
            select.innerHTML = '';
            for (let i = 0; i < data.length; i++) {
                select.innerHTML += `<option value="${data[i].id}">${data[i].name}</option>`
            }
        });
}

let carregaMercado = function () {
    if (!info) {
        alert("Faça o login primeiro");
        return;
    }

    let headers = {
        'Authorization': `Bearer ${info.token}`
    }

    fetch('http://127.0.0.1:8000/api/market', {
        'headers': headers,
    }).then(res => res.json())
        .then((data) => {
            let select = document.getElementById('mercados');
            select.innerHTML = '';
            for (let i = 0; i < data.length; i++) {
                select.innerHTML += `<option value="${data[i].id}">${data[i].name}</option>`
            }
        });
}

let cadastrarMarket = function () {
    let body = {
        'name': document.getElementById('name').value,
        'address': document.getElementById('address').value,
        'cnpj': document.getElementById('cnpj').value
    }

    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${info.token}`
    }

    fetch('http://127.0.0.1:8000/api/market', {
        'method': 'POST',
        'headers': headers,
        'body': JSON.stringify(body)
    });
    document.getElementById('name').value = '';
    document.getElementById('address').value = '';
    document.getElementById('cnpj').value = '';
}

let cadastrarProduct = function () {
    let body = {

        'EAN': document.getElementById('EAN').value,
        'name': document.getElementById('name1').value,
        'quantity': document.getElementById('quantity').value,
        'unit': document.getElementById('unit').value
    }

    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${info.token}`
    }

    fetch('http://127.0.0.1:8000/api/product', {
        'method': 'POST',
        'headers': headers,
        'body': JSON.stringify(body)
    });
    document.getElementById('name1').value = '';
    document.getElementById('EAN').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('unit').value = '';
}



let carregaProdutosMercados = {

    carregar1: function () {
        

        let headers = {
            'Authorization': `Bearer ${info.token}`
        }

        fetch('http://127.0.0.1:8000/api/product', {
            'headers': headers,
        }).then(res => res.json())
            .then((data) => {
                let select = document.getElementById('produtos2');
                select.innerHTML = '';
                for (let i = 0; i < data.length; i++) {
                    select.innerHTML += `<option value="${data[i].id}"id="product_id">${data[i].name}</ option>`
                }
            });
        fetch('http://127.0.0.1:8000/api/market', {
            'headers': headers,
        }).then(res => res.json())
            .then((data) => {
                let select = document.getElementById('mercados2');
                select.innerHTML = '';
                for (let i = 0; i < data.length; i++) {
                    select.innerHTML += `<option value="${data[i].id}id="market_id">${data[i].name}</option>`
                    
                }
            });

    },
    carregar2: function () {
        
        let body = {
            'product_id': document.getElementById('product_id').value,
            
            'price': document.getElementById('price').value
        }
        
        let headers = {
            'Content-Type': 'application/json',
        }
    
        fetch('http://127.0.0.1:8000/api/price/'+market, {
            'method': 'POST',
            'headers': headers,
            'body': JSON.stringify(body)
        });
        document.getElementById('price').value = '';
        
    }
}

let MostrarProdutos = function () {
    if (!info) {
        alert("Faça o login primeiro");
        return;
    }

    let headers = {
        'Authorization': `Bearer ${info.token}`
    }

    fetch('http://127.0.0.1:8000/api/product', {
        'headers': headers,
    }).then(res => res.json())
        .then((data) => {
            let tabela = document.getElementById('tabela');
            tabela.innerHTML = '';
            for (let i = 0; i < data.length; i++) {
                tabela.innerHTML += `<tr><td>${data[i].id}</td><td>${data[i].name}</td><td>${data[i].quantity}</td><td>${data[i].EAN}</td><td>${data[i].unit}</td></tr>`
                
            }
        });
}

