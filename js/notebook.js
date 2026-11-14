const notebook = document.querySelector('.notebook');

if (notebook) {
    const hover = matchMedia('(any-hover: hover)');
    let pointerOver = false;
    let powerOverride = null;

    function updateScreen() {
        const poweredOn = powerOverride ?? pointerOver;
        notebook.setAttribute('aria-pressed', String(poweredOn));
    }

    notebook.addEventListener('pointerenter', (event) => {
        if (event.pointerType !== 'mouse' || !hover.matches) return;
        pointerOver = true;
        powerOverride = null;
        updateScreen();
    });

    notebook.addEventListener('pointerleave', (event) => {
        if (event.pointerType !== 'mouse') return;
        if (powerOverride === false) powerOverride = null;
        pointerOver = false;
        updateScreen();
    });

    notebook.addEventListener('click', () => {
        powerOverride = notebook.getAttribute('aria-pressed') !== 'true';
        updateScreen();
    });
}
