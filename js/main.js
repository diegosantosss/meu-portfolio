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

    document.querySelectorAll('[data-contact-status]').forEach(element => {
        element.textContent = translations[lang][element.dataset.contactStatus];
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

const copyButton = document.getElementById('copy-email');
const copyStatus = document.getElementById('copy-status');
const contactEmail = document.getElementById('contact-email');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const sendButton = contactForm.querySelector('button[type="submit"]');
let copyFeedbackTimer;

function showContactStatus(element, key, error = false) {
    const language = document.documentElement.lang === 'en' ? 'en' : 'pt';
    element.dataset.contactStatus = key;
    element.textContent = translations[language][key];
    element.classList.toggle('text-red-300', error);
    element.classList.toggle('text-primary', !error);
}

copyButton.addEventListener('click', async () => {
    clearTimeout(copyFeedbackTimer);
    try {
        await navigator.clipboard.writeText(contactEmail.textContent.trim());
        showContactStatus(copyStatus, 'copy-success');
        copyFeedbackTimer = setTimeout(() => {
            copyStatus.textContent = '';
            delete copyStatus.dataset.contactStatus;
        }, 3500);
    } catch {
        showContactStatus(copyStatus, 'copy-error', true);
    }
});

contactForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (sendButton.disabled) return;

    sendButton.disabled = true;
    sendButton.dataset.i18n = 'form-sending';
    showContactStatus(sendButton, 'form-sending');
    formStatus.textContent = '';
    delete formStatus.dataset.contactStatus;

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(contactForm))),
            redirect: 'error',
            signal: AbortSignal.timeout(20000)
        });
        const result = await response.json();
        if (!response.ok || result.success !== true) throw new Error('Submission rejected');

        showContactStatus(formStatus, 'form-success');
        contactForm.reset();
    } catch {
        showContactStatus(formStatus, 'form-error', true);
    } finally {
        sendButton.disabled = false;
        sendButton.dataset.i18n = 'form-btn';
        showContactStatus(sendButton, 'form-btn');
    }
});
