//Códico con Zoom en los Productos//
<!-- PRODUCTOS -->
<div class="container">
  <div class="row g-4">

    <!-- PRODUCTO 1 -->
    <div class="col-12 col-sm-6 col-lg-4">
      <div>
        <div class="card">
          <img
            src="imgs/tenis.jpg"
            class="card-img img-producto"
            alt="Tenis deportivos AeroRun Pro"
          />

          <div class="card-img-overlay d-flex flex-column justify-content-between">
            <div class="row">
              <div class="col">
                <div class="rounded-pill bg-white text-bg-info d-flex justify-content-center p-1">
                  Más vendido
                </div>
              </div>
              <div class="col d-flex align-items-center justify-content-end">
                <button class="btn rounded-pill bg-white p-1"
                        aria-label="Agregar AeroRun Pro a favoritos">
                  <img
                    src="imgs/favorite_border_42dp_434343.png"
                    alt=""
                    style="width: 20px"
                  />
                </button>
              </div>
            </div>

            <div>
              <button class="rounded-pill">
                Agregar al carrito +
              </button>
            </div>
          </div>
        </div>

        <p class="text-body-secondary fst-italic mb-0">RUNNING</p>
        <h5>AeroRun Pro</h5>
      </div>
    </div>

    <!-- PRODUCTO 2 -->
    <div class="col-12 col-sm-6 col-lg-4">
      <div>
        <div class="card">
          <img
            src="imgs/chaqueta.jpg"
            class="card-img img-producto"
            alt="Kipsta Chamarra deportiva"
          />

          <div class="card-img-overlay d-flex flex-column justify-content-between">
            <div class="row">
              <div class="col">
                <div class="rounded-pill bg-white text-bg-info d-flex justify-content-center p-1">
                  Esencial
                </div>
              </div>
              <div class="col d-flex align-items-center justify-content-end">
                <button class="btn rounded-pill bg-white p-1"
                        aria-label="Agregar Kipsta Chamarra a favoritos">
                  <img
                    src="imgs/favorite_border_42dp_434343.png"
                    alt=""
                    style="width: 20px"
                  />
                </button>
              </div>
            </div>

            <div>
              <button class="rounded-pill">
                Agregar al carrito +
              </button>
            </div>
          </div>
        </div>

        <p class="text-body-secondary fst-italic mb-0">LifeStyle</p>
        <h5>Kipsta Chamarra</h5>
      </div>
    </div>

    <!-- PRODUCTO 3 -->
    <div class="col-12 col-sm-6 col-lg-4">
      <div>
        <div class="card">
          <img
            src="imgs/chaqueta_mujer.webp"
            class="card-img img-producto"
            alt="Soft Zip Jacket para mujer"
          />

          <div class="card-img-overlay d-flex flex-column justify-content-between">
            <div class="row">
              <div class="col">
                <div class="rounded-pill bg-white text-bg-info d-flex justify-content-center p-1">
                  Nuevo
                </div>
              </div>
              <div class="col d-flex align-items-center justify-content-end">
                <button class="btn rounded-pill bg-white p-1"
                        aria-label="Agregar Soft Zip Jacket a favoritos">
                  <img
                    src="imgs/favorite_border_42dp_434343.png"
                    alt=""
                    style="width: 20px"
                  />
                </button>
              </div>
            </div>

            <div>
              <button class="rounded-pill">
                Agregar al carrito +
              </button>
            </div>
          </div>
        </div>

        <p class="text-body-secondary fst-italic mb-0">LifeStyle</p>
        <h5>Soft Zip Jacket</h5>
      </div>
    </div>

  </div>
</div>



//Funciones//
/* Tarjeta del producto */
.card {
  overflow: hidden;
  border-radius: 8px;
  position: relative;
}

/* Imagen del producto */
.card .img-producto {
  display: block;
  width: 100%;
  height: 350px;
  object-fit: cover;
  transition: transform 0.5s ease;
  transform-origin: center center;
}

/* Efecto zoom al pasar el cursor */
.card:hover .img-producto {
  transform: scale(1.3);
  cursor: zoom-in;
}

/* Mantiene los botones y etiquetas encima de la imagen */
.card .card-img-overlay {
  z-index: 1;
  pointer-events: none;
}

/* Permite seguir usando los botones */
.card .card-img-overlay button {
  pointer-events: auto;
}

/* Accesibilidad: reduce animaciones si el usuario lo prefiere */
@media (prefers-reduced-motion: reduce) {
  .card .img-producto {
    transition: none;
  }
}
