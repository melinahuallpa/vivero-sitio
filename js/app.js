document.addEventListener("DOMContentLoaded", () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const renderizarProductos = () => {
    const url = "https://dummyjson.com/products/category/home-decoration";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.products); // 🔍 Verifica en consola
        const contenedorProductos = document.getElementById("contenedor-productos");

        data.products.forEach((producto) => {
          const tarjetaProducto = document.createElement("article");
          tarjetaProducto.classList.add("tarjeta-producto");

          const imagenProducto = document.createElement("img");
          imagenProducto.src = producto.images[0];
          imagenProducto.alt = producto.title;

          const tituloProducto = document.createElement("h3");
          tituloProducto.textContent = producto.title;

          const precioProducto = document.createElement("p");
          precioProducto.textContent = `$${producto.price}`;

          const btnAgregar = document.createElement("button");
          btnAgregar.textContent = "Agregar";

          btnAgregar.addEventListener("click", () => {
            carrito.push(producto);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarAgregados();
            alert(`${producto.title} agregado`);
          });

          tarjetaProducto.append(imagenProducto, tituloProducto, precioProducto, btnAgregar);
          contenedorProductos.appendChild(tarjetaProducto);
        });
      })
      .catch((err) => console.error("Error:", err));
  };

  const actualizarAgregados = () => {
    const contadorCarrito = document.getElementById("contador-carrito");
    contadorCarrito.textContent = carrito.length;
  };

  renderizarProductos();
  actualizarAgregados();
});


