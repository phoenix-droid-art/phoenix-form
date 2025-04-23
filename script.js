const telefoneInput = document.getElementById('telefone');
IMask(telefoneInput, {
    mask: '(00) 00000-0000'
});

function mostrarEtapa(id) {
    const etapas = document.querySelectorAll('.etapa');
    etapas.forEach(el => el.classList.remove('ativa'));
    document.getElementById(id).classList.add('ativa');
}

document.getElementById('formulario').addEventListener('submit', function (e) {
    e.preventDefault();
    
    mostrarEtapa('loading'); // Mostra a tela de carregamento

    const dados = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
    };

    fetch('/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro');
        return response.json();
    })
    .then(() => {
        mostrarEtapa('confirmacao'); // Mostra tela de sucesso
    })
    .catch(() => {
        alert("Erro ao enviar. Tente novamente.");
        mostrarEtapa('formulario-section'); // Volta pro formulário
    });
});
