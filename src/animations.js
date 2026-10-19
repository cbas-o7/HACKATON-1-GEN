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
  transform: scale(1.2);
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
