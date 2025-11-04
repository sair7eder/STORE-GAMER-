const CHECKOUT_URL = "https://resilient-kheer-370902pago.netlify.app/";

const productos = [
  { id: 1, nombre: "Teclado Gamer Mecánico RGB", precio: 29.19, imagen: "img/teclado.png" },
  { id: 2, nombre: "Mouse Gamer Pro", precio: 59.99, imagen: "img/mause.png" },
  { id: 3, nombre: "Audífonos Gamer Naceb", precio: 47.0, imagen: "img/audifonos.jpg" },
  { id: 4, nombre: "Silla Ergonómica RGB Pro", precio: 199.99, imagen: "img/silla.webp" },
];

let carrito = [];

const grid = document.getElementById("productGrid");
const modal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const checkoutBtn = document.getElementById("checkoutBtn");
const closeModal = document.getElementById("closeModal");
const cartTotal = document.getElementById("cartTotal");

function mostrarProductos() {
  grid.innerHTML = "";
  productos.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" onerror="this.src='img/default.jpg'">
      <h3>${p.nombre}</h3>
      <p class="price">$${p.precio.toFixed(2)}</p>
      <button class="add-btn" onclick="agregarAlCarrito(${p.id})">Añadir al carrito</button>
    `;
    grid.appendChild(card);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find((item) => item.id === id);
  const existente = carrito.find((item) => item.id === id);

  if (existente) existente.cantidad++;
  else carrito.push({ ...producto, cantidad: 1 });

  mostrarCarrito();
}

function mostrarCarrito() {
  cartItems.innerHTML = "";
  let total = 0;

  carrito.forEach((item) => {
    total += item.precio * item.cantidad;
    const row = document.createElement("div");
    row.classList.add("cart-item");
    row.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}">
      <div class="cart-info">
        <p>${item.nombre}</p>
        <span>$${item.precio.toFixed(2)} × ${item.cantidad}</span>
      </div>
    `;
    cartItems.appendChild(row);
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;
  modal.classList.add("show");
}

closeModal.addEventListener("click", () => modal.classList.remove("show"));

checkoutBtn.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío 😅");
    return;
  }
  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const url = `${CHECKOUT_URL}?total=${total.toFixed(2)}`;
  window.location.href = url;
});

mostrarProductos();

