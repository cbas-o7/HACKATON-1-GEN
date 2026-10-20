const productos = [
  {
    id: 1,
    nombre: "AeroRun Pro",
    categoria: "Running",
    img: "imgs/tenis.jpg",
    tag: "Mas Vendido",
    precio: 1299,
  },
  {
    id: 2,
    nombre: "Kipsta Chamarra",
    categoria: "LifeStyle",
    img: "imgs/chaqueta.jpg",
    tag: "Esencial",
    precio: 899,
  },
  {
    id: 3,
    nombre: "Mancuernas Hexagonales 5kg",
    categoria: "Accesorios",
    img: "imgs/mancuernas.webp",
    tag: "Básico",
    precio: 450,
  },
  {
    id: 4,
    nombre: "Balón Básquet Elite",
    categoria: "Accesorios",
    img: "imgs/balon-basquet.webp",
    tag: "Mas Vendido",
    precio: 749,
  },
  {
    id: 5,
    
    nombre: "Soft Zip Jacket",
    categoria: "LifeStyle",
    img: "imgs/chaqueta_mujer.webp",
    tag: "Nuevo",
    precio: 950,
  },
  {
    id: 6,
    nombre: "Mini Portería Plegable",
    categoria: "Accesorios",
    img: "imgs/porteria.jpg",
    tag: "Esencial",
    precio: 1250,
  },
];

let carrito = JSON.parse(localStorage.getItem("cart")) || [];
let favoritos = JSON.parse(localStorage.getItem("favs")) || [];

const botonesFiltro = document.querySelectorAll(".btn-filtro");
const contenedor = document.getElementById("productContainer");
const contenedorCarrito = document.getElementById("cartItems");
const contadorCarrito = document.getElementById("badgeCartCount");
const totalCarrito = document.getElementById("cartTotal");

// ==========================================
// RENDERIZADO DE PRODUCTOS & CARRITO
// ==========================================
function renderizarProductos(filtroSeleccionado = "Todos") {
  contenedor.innerHTML = "";

  // SE FILTRA ARREGLO SEGUN EL FILTRO
  const productosFiltrados =
    filtroSeleccionado === "Todos"
      ? productos
      : productos.filter((prod) => prod.categoria === filtroSeleccionado);

  // SE RENDERIZA EN HTML
  productosFiltrados.forEach((prod) => {
    const esFavorito = favoritos.includes(prod.id);

    const claseCorazon = esFavorito
      ? "imgs/favorite_24dp_D16D6A.png"
      : "imgs/favorite_border_42dp_434343.png";

    const tarjetaHTML = `
      <div class="col-12 col-md-6 col-lg-4 mb-4">
        <div class="tarjeta-hover">
          <div class="card border-0 position-relative bg-transparent">
            <img src="${prod.img}" class="card-img img-producto" alt="${prod.nombre}" />
            
            <div class="card-img-overlay d-flex flex-column justify-content-between p-3">
              <!-- Parte superior: Tag y Favorito -->
              <div class="d-flex justify-content-between align-items-start">
                <span class="badge tag-adaptable rounded-pill px-3 py-2 shadow-sm fw-bold">
                    ${prod.tag}
                </span>
                <button class="btn btn-light  rounded-circle shadow-sm btn-favorito" onclick="toggleFavorito(${prod.id})">
                  <img src="${claseCorazon}" alt="Fav" style="width: 20px" />
                </button>
              </div>

              <!-- Parte inferior: Botón Carrito -->
              <button class="btn btn-outline-secondary glass-efecto rounded-pill shadow-sm fw-bold w-100 py-2" onclick="agregarAlCarrito(${prod.id},'${prod.img}' ,'${prod.nombre}', ${prod.precio})">
                Agregar al carrito +
              </button>
            </div>
          </div>
          
          <!-- Textos debajo de la tarjeta -->
          <div class="mt-3 px-1">
            <p class="text-secondary fst-italic mb-1" style="font-size: 0.85rem;">${prod.categoria.toUpperCase()}</p>
            <h5 class="fw-bold mb-1">${prod.nombre}</h5>
            <p class="fw-bold mb-0">$${prod.precio} MXN</p>
          </div>
        </div>
      </div>
    `;

    contenedor.innerHTML += tarjetaHTML;
  });
}

function renderizarCarrito() {
  const btnConfirmar = document.getElementById("checkoutBtn");
  contenedorCarrito.innerHTML = "";
  let total = 0;

  if (btnConfirmar) {
    btnConfirmar.disabled = carrito.length === 0;
  }

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML =
      '<p class="text-center my-4">Tu carrito está vacío.</p>';
    contadorCarrito.innerText = "0";
    totalCarrito.innerText = "$0.00 MXN";
    return;
  }

  carrito.forEach((producto) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    const imagenProd = producto.img ? producto.img : "imgs/default.jpg";

    contenedorCarrito.innerHTML += `
      <div class="d-flex align-items-center mb-3 border-bottom pb-3">
        <!-- IMAGEN DEL PRODUCTO (Lado Izquierdo) -->
        <img src="${imagenProd}" alt="${producto.nombre}" 
             style="width: 65px; height: 65px; object-fit: cover;" 
             class="rounded me-3 shadow-sm">

        <!-- DETALLES Y BOTONES DE CANTIDAD (Centro) -->
        <div class="flex-grow-1">
          <h6 class="mb-0 fw-bold" style="font-size: 0.95rem;">${producto.nombre}</h6>
          <small class="text-muted">$${producto.precio} MXN</small>
          
          <!-- Controles + y - -->
          <div class="d-flex align-items-center mt-2">
            <button class="btn btn-sm btn-outline-secondary py-0 px-2 rounded" onclick="restarCantidad(${producto.id})">
               <b>-</b>
            </button>
            <span class="mx-3 fw-bold" style="font-size: 0.9rem;">${producto.cantidad}</span>
            <button class="btn btn-sm btn-outline-secondary py-0 px-2 rounded" onclick="agregarAlCarrito(${producto.id},'${producto.img}' ,'${producto.nombre}', ${producto.precio})">
               <b>+</b>
            </button>
          </div>
        </div>

        <!-- SUBTOTAL Y ELIMINAR (Lado Derecho) -->
        <div class="text-end">
          <div class="fw-bold mb-2" style="font-size: 0.95rem;">$${subtotal}</div>
           <button class="btn btn-sm btn-outline-danger py-1 px-2 rounded-pill d-inline-flex align-items-center" onclick="eliminarDelCarrito(${producto.id})">
            <svg xmlns="http://w3.org" width="18" height="18" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  });

  // .reduce ayuda a sacar la cantidad de articulos de la lista completa
  const totalArticulos = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  contadorCarrito.innerText = totalArticulos;
  totalCarrito.innerText = `$${total} MXN`;

}

// ==========================================
// GUARDADO EN LOCAL STORAGE (FUNCIONES CARRITO, FAVS)
// ==========================================
function agregarAlCarrito(id, img, nombre, precio) {
  const productoExistente = carrito.find((p) => p.id === id);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ id, img, nombre, precio, cantidad: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(carrito));

  renderizarCarrito();
}

function restarCantidad(idProducto) {
  const producto = carrito.find((p) => p.id === idProducto);
  if (producto) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
      localStorage.setItem("cart", JSON.stringify(carrito));
      renderizarCarrito();
    } else {
      eliminarDelCarrito(idProducto);
    }
  }
}

function eliminarDelCarrito(idProducto) {
  carrito = carrito.filter((p) => p.id !== idProducto);

  localStorage.setItem("cart", JSON.stringify(carrito));
  renderizarCarrito();
}

function toggleFavorito(idProducto) {
  const indice = favoritos.indexOf(idProducto);

  if (indice === -1) {
    favoritos.push(idProducto);
  } else {
    favoritos.splice(indice, 1);
  }

  localStorage.setItem("favs", JSON.stringify(favoritos));

  const botonActivo = document.querySelector(".btn-filtro.btn-dark");
  const categoriaActual = botonActivo
    ? botonActivo.getAttribute("data-categoria")
    : "Todos";

  renderizarProductos(categoriaActual);
}

function procesarCompra() {
  if (carrito.length === 0) return;

  const modalElement = document.getElementById("modalProcesando");
  const modalProcesando = new bootstrap.Modal(modalElement);
  modalProcesando.show();

  // (3000 milisegundos = 3 segundos)
  setTimeout(() => {
    modalProcesando.hide();

    carrito = [];
    localStorage.setItem("cart", JSON.stringify(carrito));

    renderizarCarrito();

    alert("¡Pago aprobado! Gracias por tu compra en Esfera Deportiva.");
  }, 3000);
}

// ==========================================
// FILTRO POR CATEGORIA
// ==========================================
// Supongamos que tus botones están dentro de un div con id "contenedor-filtros"
const container = document.getElementById("contenedor-filtros");

container.addEventListener("click", (e) => {
  if (!e.target.matches(".btn")) return; 

  const activo = container.querySelector(".btn-dark");
  if (activo) {
    activo.classList.remove("btn-dark", "btn-sm");
    activo.classList.add("btn-outline-dark", "btn");
  }

  e.target.classList.remove("btn-outline-dark", "btn");
  e.target.classList.add("btn-dark", "btn-sm");

  const categoria = e.target.getAttribute("data-categoria");
  renderizarProductos(categoria);
});



window.procesarCompra = procesarCompra;
window.toggleFavorito = toggleFavorito;
window.agregarAlCarrito = agregarAlCarrito;
window.restarCantidad = restarCantidad;
window.eliminarDelCarrito = eliminarDelCarrito;

renderizarCarrito();
renderizarProductos();

(() => {
  const body = document.body;
  const btnDark = document.getElementById("btnDark");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const cartBtn = document.getElementById("cartBtn");
  const searchBtn = document.getElementById("searchBtn");
  const notificationBtn = document.getElementById("notificationBtn");

  // MODO OSCURO CON LOCALSTORAGE
  try {
    const savedTheme = localStorage.getItem("esfera-dark");

    if (savedTheme === "1") {
      body.classList.add("dark");
    }
  } catch (error) {
    console.warn("No se pudo recuperar la preferencia de tema.", error);
  }

  function updateThemeButton() {
    const isDark = body.classList.contains("dark");
    btnDark.textContent = isDark ? "☀️" : "🌙";
    btnDark.setAttribute(
      "aria-label",
      isDark ? "Activar modo claro" : "Activar modo oscuro",
    );
  }

  updateThemeButton();

  btnDark.addEventListener("click", () => {
    body.classList.toggle("dark");

    try {
      localStorage.setItem(
        "esfera-dark",
        body.classList.contains("dark") ? "1" : "0",
      );
    } catch (error) {
      console.warn("No se pudo guardar la preferencia de tema.", error);
    }

    updateThemeButton();
  });

  // Menú responsive
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("nav__menu--open");

    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  // Cerrar el menú después de seleccionar una sección
  navMenu.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("nav__menu--open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Abrir menú");

      navMenu.querySelectorAll(".nav__link").forEach((item) => {
        item.classList.remove("active");
        item.removeAttribute("aria-current");
      });

      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    });
  });

  // Acciones provisionales de los botones
  cartBtn.addEventListener("click", () => {});

  searchBtn.addEventListener("click", () => {
    alert("La búsqueda de productos se puede conectar aquí.");
  });

  notificationBtn.addEventListener("click", () => {
    alert("Por ahora no tienes notificaciones nuevas.");
  });

  // Carrusel Bootstrap
  const carouselElement = document.getElementById("esferaCarousel");

  if (carouselElement && window.bootstrap) {
    bootstrap.Carousel.getOrCreateInstance(carouselElement, {
      interval: 3000,
      ride: "carousel",
      pause: "hover",
    });
  }
})();
