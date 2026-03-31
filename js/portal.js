document.getElementById('send-broadcast-btn')?.addEventListener('click', async () => {
    const message = document.getElementById('broadcast-message').value;
    const btn = document.getElementById('send-broadcast-btn');
    const status = document.getElementById('broadcast-status');

    if (!message.trim()) return;

    btn.style.display = 'none';
    status.style.display = 'block';
    status.textContent = 'ENVIANDO...';

    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'broadcast',
                message: message,
                whatsapp_token: WHATSAPP_TOKEN_API,
                whatsapp_phone_id: WHATSAPP_PHONE_ID
            })
        });

        setTimeout(() => {
            status.textContent = '✓ ENVIADO';
        }, 1000);

        document.getElementById('broadcast-message').value = '';

    } catch (error) {
        status.textContent = '❌ ERROR';
    }

    setTimeout(() => {
        status.style.display = 'none';
        status.textContent = 'ENVIANDO...';
        btn.style.display = 'block';
    }, 5000);
});

// --- SCRIPT PARA CONTADOR DINÁMICO ---
document.addEventListener('DOMContentLoaded', async () => {
    const countSpan = document.getElementById('count-number');
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        const data = await response.json();

        if (data && typeof data.count !== 'undefined') {
            countSpan.textContent = data.count;
        } else {
            countSpan.textContent = '0';
        }
    } catch (error) {
        countSpan.textContent = '+';
    }
});

// --- ADMIN ---
if (new URLSearchParams(window.location.search).get('admin') === 'true') {
    const title = document.getElementById('admin-title');
    const panel = document.getElementById('admin-panel');
    if (title) title.style.display = 'block';
    if (panel) panel.style.display = 'block';
}
