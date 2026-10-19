const EsferaApp = (() => {
  const init = () => {
    const cartBtn = document.getElementById("cartBtn");
    const cartMenu = document.getElementById("cartMenu");
    const closeCart = document.getElementById("closeCart");

    if (!cartBtn || !cartMenu || !closeCart) return;

    const cerrarCarrito = () => {
      cartMenu.classList.add("d-none");
      cartBtn.setAttribute("aria-expanded", "false");
    };

    cartBtn.addEventListener("click", () => {
      const estaCerrado = cartMenu.classList.contains("d-none");

      cartMenu.classList.toggle("d-none");
      cartBtn.setAttribute("aria-expanded", String(estaCerrado));
    });

    closeCart.addEventListener("click", cerrarCarrito);

    // Navbar: efecto al desplazarse
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
      if (!navbar) return;

      navbar.style.background =
        window.scrollY > 50
          ? "rgba(10,10,10,0.95)"
          : "rgba(10,10,10,0.8)";
    });
  };

  return { init };
})();

document.addEventListener("DOMContentLoaded", EsferaApp.init);