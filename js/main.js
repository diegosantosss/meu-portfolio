// Função para Troca de Idioma
function setLanguage(lang) {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');

        if (translations[lang][key]) {

            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.setAttribute('placeholder', translations[lang][key]);
            } else {
                el.innerHTML = translations[lang][key];
            }

        }
    });

    document.getElementById('btn-pt').classList.toggle(
        'active-lang',
        lang === 'pt'
    );

    document.getElementById('btn-en').classList.toggle(
        'active-lang',
        lang === 'en'
    );

    document.getElementById('btn-pt').classList.toggle(
        'opacity-50',
        lang !== 'pt'
    );

    document.getElementById('btn-en').classList.toggle(
        'opacity-50',
        lang !== 'en'
    );
}


// Função para Copiar E-mail
function copyEmail() {

    navigator.clipboard
        .writeText("diegosantos041201@gmail.com")
        .then(() => alert('E-mail copiado!'));

}
