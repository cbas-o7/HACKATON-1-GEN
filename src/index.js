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
    nombre: "Soft Zip Jacket",
    categoria: "LifeStyle",
    img: "imgs/chaqueta_mujer.webp",
    tag: "Nuevo",
    precio: 950,
  },
  {
    id: 4,
    nombre: "Calcetas Grip Ultra",
    categoria: "Accesorios",
    img: "imgs/calcetas.webp",
    tag: "Básico",
    precio: 250,
  },
  {
    id: 5,
    nombre: "Gorra Runner X",
    categoria: "Accesorios",
    img: "imgs/gorra.jpg",
    tag: "Mas Vendido",
    precio: 399,
  },
  {
    id: 6,
    nombre: "Shorts Flex",
    categoria: "Running",
    img: "imgs/shorts.jpg",
    tag: "Nuevo",
    precio: 599,
  },
];

let carrito = JSON.parse(localStorage.getItem("cart")) || [];
let favoritos = JSON.parse(localStorage.getItem("favs")) || [];

const contenedor = document.getElementById("contenedor-productos");
const botonesFiltro = document.querySelectorAll(".btn-filtro");

// ==========================================
// RENDERIZADO DE PRODUCTOS
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
          <div class="card border-0 position-relative">
            <img src="${prod.img}" class="card-img img-producto" alt="${prod.nombre}" />
            
            <div class="card-img-overlay d-flex flex-column justify-content-between p-3">
              <!-- Parte superior: Tag y Favorito -->
              <div class="d-flex justify-content-between align-items-start">
                <span class="badge bg-white text-dark rounded-pill px-3 py-2 shadow-sm fw-bold">
                  ${prod.tag}
                </span>
                <button class="btn btn-light  rounded-circle shadow-sm btn-favorito" onclick="toggleFavorito(${prod.id})">
                  <img src="${claseCorazon}" alt="Fav" style="width: 20px" />
                </button>
              </div>

              <!-- Parte inferior: Botón Carrito -->
              <button class="btn btn-light rounded-pill shadow-sm fw-bold w-100 py-2" onclick="agregarAlCarrito(${prod.id},'${prod.img}' ,'${prod.nombre}', ${prod.precio})">
                Agregar al carrito +
              </button>
            </div>
          </div>
          
          <!-- Textos debajo de la tarjeta -->
          <div class="mt-3 px-1">
            <p class="text-secondary fst-italic mb-1" style="font-size: 0.85rem;">${prod.categoria.toUpperCase()}</p>
            <h5 class="fw-bold mb-1">${prod.nombre}</h5>
            <p class="fw-bold text-dark mb-0">$${prod.precio} MXN</p>
          </div>
        </div>
      </div>
    `;

    contenedor.innerHTML += tarjetaHTML;
  });
}

// ==========================================
// FILTRO POR CATEGORIA
// ==========================================
botonesFiltro.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesFiltro.forEach((b) => {
      b.classList.remove("btn-dark");
      b.classList.add("btn-outline-dark");
      b.classList.remove("btn-sm");
      b.classList.add("btn");
    });

    e.target.classList.remove("btn-outline-dark");
    e.target.classList.add("btn-dark");
    e.target.classList.remove("btn");
    e.target.classList.add("btn-sm");

    const categoria = e.target.getAttribute("data-categoria");
    renderizarProductos(categoria);
  });
});

// ==========================================
// GUARDADO EN LOCAL STORAGE
// ==========================================
function agregarAlCarrito(id, img, nombre, precio) {
  const productoExistente = carrito.find((p) => p.id === id);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ id, img, nombre, precio, cantidad: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(carrito));

  /* alert(
    `Se agregó "${nombre}" al carrito. (Tienes ${carrito.length} productos diferentes)`,
  );*/
  console.log("Carrito actual:", carrito);
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

window.agregarAlCarrito = agregarAlCarrito;
window.toggleFavorito = toggleFavorito;
renderizarProductos();



(() => {
      const body = document.body;
      const btnDark = document.getElementById('btnDark');
      const navToggle = document.getElementById('navToggle');
      const navMenu = document.getElementById('navMenu');
      const cartBtn = document.getElementById('cartBtn');
      const searchBtn = document.getElementById('searchBtn');
      const notificationBtn = document.getElementById('notificationBtn');

      // MODO OSCURO CON LOCALSTORAGE
      try {
        const savedTheme = localStorage.getItem('esfera-dark');

        if (savedTheme === '1') {
          body.classList.add('dark');
        }
      } catch (error) {
        console.warn('No se pudo recuperar la preferencia de tema.', error);
      }

      function updateThemeButton() {
        const isDark = body.classList.contains('dark');
        btnDark.textContent = isDark ? '☀️' : '🌙';
        btnDark.setAttribute(
          'aria-label',
          isDark ? 'Activar modo claro' : 'Activar modo oscuro'
        );
      }

      updateThemeButton();

      btnDark.addEventListener('click', () => {
        body.classList.toggle('dark');

        try {
          localStorage.setItem(
            'esfera-dark',
            body.classList.contains('dark') ? '1' : '0'
          );
        } catch (error) {
          console.warn('No se pudo guardar la preferencia de tema.', error);
        }

        updateThemeButton();
      });

      // Menú responsive
      navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('nav__menu--open');

        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute(
          'aria-label',
          isOpen ? 'Cerrar menú' : 'Abrir menú'
        );
      });

      // Cerrar el menú después de seleccionar una sección
      navMenu.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('nav__menu--open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'Abrir menú');

          navMenu.querySelectorAll('.nav__link').forEach(item => {
            item.classList.remove('active');
            item.removeAttribute('aria-current');
          });

          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        });
      });

      // Acciones provisionales de los botones
      cartBtn.addEventListener('click', () => {
        alert('Esfera Deportiva: aquí podrás consultar tu carrito de compras.');
      });

      searchBtn.addEventListener('click', () => {
        alert('La búsqueda de productos se puede conectar aquí.');
      });

      notificationBtn.addEventListener('click', () => {
        alert('Por ahora no tienes notificaciones nuevas.');
      });

      // Carrusel Bootstrap
      const carouselElement = document.getElementById('esferaCarousel');

      if (carouselElement && window.bootstrap) {
        bootstrap.Carousel.getOrCreateInstance(carouselElement, {
          interval: 3000,
          ride: 'carousel',
          pause: 'hover'
        });
      }
    })();