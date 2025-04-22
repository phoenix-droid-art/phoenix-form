const telefoneInput = document.getElementById('telefone');
IMask(telefoneInput, {
    mask: '(00) 00000-0000'
});

document.getElementById('formulario').addEventListener('submit', function (e) {
    e.preventDefault();

    const formulario = document.getElementById('formulario-section');
    const loading = document.getElementById('loading');
    const confirmacao = document.getElementById('confirmacao');

    formulario.classList.add('hidden');
    loading.classList.remove('hidden');

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
        loading.classList.add('hidden');
        confirmacao.classList.remove('hidden');
    })
    .catch(() => {
        alert("Erro ao enviar. Tente novamente.");
        loading.classList.add('hidden');
        formulario.classList.remove('hidden');
    });
});
