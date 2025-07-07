let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Actualiza el contador del carrito en el menú
const actualizarAgregados = () => {
  const contadorCarrito = document.getElementById("contador-carrito");
  contadorCarrito.textContent = carrito.length;
};

actualizarAgregados();

// Elimina un producto por índice
const eliminarProducto = (indice) => {
  carrito.splice(indice, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarAgregados();
  pintarCarrito();
};

// Vacia todo el carrito
const vaciarCarrito = () => {
  carrito = [];
  localStorage.removeItem("carrito");
  actualizarAgregados();
  pintarCarrito();
};

// Finaliza compra
const finalizarCompra = () => {
  alert("¡Gracias por tu compra! 🌱");
  carrito = [];
  localStorage.removeItem("carrito");
  actualizarAgregados();
  window.location.href = "index.html"; // Redirecciona al home
};

// Renderiza el resumen y botones
const renderizarResumenCarrito = () => {
  const resumen = document.getElementById("resumen-carrito");
  resumen.innerHTML = "";

  if (carrito.length === 0) return;

  const cantidadProductos = carrito.length;
  const totalImporte = carrito.reduce((acc, producto) => acc + producto.price, 0);

  const cantidad = document.createElement("p");
  cantidad.textContent = `Cantidad de productos: ${cantidadProductos}`;

  const total = document.createElement("p");
  total.textContent = `Importe total: $${totalImporte.toFixed(2)}`;

  const btnVaciar = document.createElement("button");
  btnVaciar.textContent = "Vaciar carrito";
  btnVaciar.addEventListener("click", vaciarCarrito);

  const btnFinalizar = document.createElement("button");
  btnFinalizar.textContent = "Finalizar compra";
  btnFinalizar.addEventListener("click", finalizarCompra);

  resumen.appendChild(cantidad);
  resumen.appendChild(total);
  resumen.appendChild(btnVaciar);
  resumen.appendChild(btnFinalizar);
};

// Renderiza los productos del carrito
const pintarCarrito = () => {
  const listadoCompra = document.getElementById("contenedor-carrito");
  listadoCompra.innerHTML = "";

  if (carrito.length === 0) {
    listadoCompra.innerHTML = `
      <h3>Tu carrito está vacío 😧</h3>
      <a href="tienda.html" class="btn-ir-tienda">Ir a la tienda</a>
    `;
  } else {
    carrito.forEach((producto, indice) => {
      const tarjetaProducto = document.createElement("article");
      tarjetaProducto.classList.add("tarjeta-producto");

      const imagenProducto = document.createElement("img");
      imagenProducto.src = producto.images[0];
      imagenProducto.alt = producto.title;

      const tituloProducto = document.createElement("h3");
      tituloProducto.textContent = producto.title;

      const precioProducto = document.createElement("p");
      precioProducto.textContent = `$${producto.price}`;

      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.addEventListener("click", () => eliminarProducto(indice));

      tarjetaProducto.appendChild(imagenProducto);
      tarjetaProducto.appendChild(tituloProducto);
      tarjetaProducto.appendChild(precioProducto);
      tarjetaProducto.appendChild(btnEliminar);

      listadoCompra.appendChild(tarjetaProducto);
    });
  }

  renderizarResumenCarrito();
};

pintarCarrito();
