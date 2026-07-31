// Função para Troca de Idioma
function setLanguage(lang) {
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
    document.getElementById('btn-pt').classList.toggle('active-lang', lang === 'pt');
    document.getElementById('btn-en').classList.toggle('active-lang', lang === 'en');
    document.getElementById('btn-pt').classList.toggle('opacity-50', lang !== 'pt');
    document.getElementById('btn-en').classList.toggle('opacity-50', lang !== 'en');
}

// Função para Copiar E-mail
function copyEmail() {
    navigator.clipboard.writeText("diegosantos041201@gmail.com").then(() => alert('E-mail copiado!'));
}

// Animação do Canvas (Background)
const canvas = document.getElementById('code-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const codes = "JAVA SPRING SQL REACT ANGULAR DOCKER CLOUD 01";
const columns = canvas.width / 20;
const drops = [];
for(let x = 0; x < columns; x++) drops[x] = 1;

function drawCode() {
    ctx.fillStyle = "rgba(1, 14, 36, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#58f5d1";
    ctx.font = "10px monospace";
    for(let i = 0; i < drops.length; i++) {
        const text = codes[Math.floor(Math.random() * codes.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);
        if(drops[i] * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawCode, 50);