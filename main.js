const EsferaApp = (() => {
    const init = () => {
        try {
            const cartBtn = document.getElementById('cartBtn');
            if (!cartBtn) return;
            
            cartBtn.addEventListener('click', () => {
                alert('Esfera Deportiva: Tu equipo está por armarse. ¡Explora productos!');
            });

            // Navbar cambia al hacer scroll - mejora UX
            const navbar = document.querySelector('.navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.style.background = 'rgba(10,10,10,0.95)';
                } else {
                    navbar.style.background = 'rgba(10,10,10,0.8)';
                }
            });

        } catch (error) {
            console.error('Error en Esfera App:', error.message);
        }
    };
    return { init };
})();

document.addEventListener('DOMContentLoaded', EsferaApp.init);