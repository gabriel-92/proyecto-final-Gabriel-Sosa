//? Captura de eventos de click
document.addEventListener("click", (event) => {
  if (event.target && event.target.className.includes("btnCompra")) {
    btnComprasClick(event);
  }
});

const comprarButton = document.querySelector(".comprarButton");
comprarButton.addEventListener("click", comprarButtonClicked);
//? variable global del div creado
const shoppingCartItemsContainer = document.querySelector(
  ".shoppingCartItemsContainer"
);
//? Leer datos del producto
function btnComprasClick(event) {
  const button = event.target;
  const card = button.closest(".card");
  const cardTitle = card.querySelector(".card-title").textContent;
  const cardPrice = card.querySelector(".card-price").textContent;
  const cardImage = card.querySelector(".card-img-top").src;
  const itemId = card.dataset.id;

  agregarEleCart(cardTitle, cardPrice, cardImage, itemId);
}
//? agregar elementos al div del resumen
function agregarEleCart(cardTitle, cardPrice, cardImage, itemId) {
  const elemTitle = shoppingCartItemsContainer.getElementsByClassName(
    "shoppingCartItemTitle"
  );
  //? sirve para no pintar dos veces el mismo elemento
  for (let i = 0; i < elemTitle.length; i++) {
    if (elemTitle[i].innerText === cardTitle) {
      //? sweetalert
      Swal.fire({
        type: "info",
        title: "Oops...",
        text: "El producto ya está agregado",
        showConfirmButton: false,
        timer: 1000,
      });
      modificarCantCart();
      return;
    }
  }
  //? creación del resumen de compra
  const shoppingCartRow = document.createElement("div");
  shoppingCartContent = `
  <div class="row shoppingCartItem"  data-id=${itemId}>
        <div class="col-6">
            <div class="shopping-cart-item  d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${cardImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${cardTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${cardPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input  cantidadItem" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;

  shoppingCartRow.innerHTML = shoppingCartContent;

  shoppingCartItemsContainer.append(shoppingCartRow);
  //? llama a la función para eliminar los productos del resumen de compra
  shoppingCartRow
    .querySelector(".buttonDelete")
    .addEventListener("click", removeShoppingCartItem);
  //? llama la función para cambiar la cantidad de productos seleccionados
  shoppingCartRow
    .querySelector(".cantidadItem")
    .addEventListener("change", quantityChanged);
  modificarCantCart();
}
//? función para dar el total de la compra
function modificarCantCart() {
  let total = 0;
  const ordenTotal = document.querySelector(".ordenTotal");
  const shoppingCartItems = document.querySelectorAll(".shoppingCartItem");
  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      ".shoppingCartItemPrice"
    );
    //? quita el símbolo euro para poder hacer la operación
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace("€", "")
    );
    const cantidadItemElement = shoppingCartItem.querySelector(".cantidadItem");
    const cantidadItem = Number(cantidadItemElement.value);
    total = total + shoppingCartItemPrice * cantidadItem;
  });
  //? quita los decimales dejando solo 2
  ordenTotal.innerHTML = `${total.toFixed(2)}€`;
}
//? función para eliminar los productos del resumen de compra
function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest(".shoppingCartItem").remove();
  modificarCantCart();
}
//? función para cambiar la cantidad de productos
function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  modificarCantCart();
}
//? al darle click al botón de compra guarda en el LocalStorage
function comprarButtonClicked() {
  const shoppingCartItems = getItemCart();

  addLS("shoppingCart", shoppingCartItems);
  if (getItemCart().length === 0) {
    Swal.fire({
      type: "error",
      title: "Oops...",
      text: "El carrito está vacío, agrega algún producto",
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    shoppingCartItemsContainer.innerHTML = "";
    modificarCantCart();
  }
}
//? guarda los productos en el LocalStorage
function getItemCart() {
  const shoppingCartItem = document.querySelectorAll(".shoppingCartItem");
  const arrayItemsLS = [];
  shoppingCartItem.forEach((shoppingCartItem) => {
    const cantidadItemElement = shoppingCartItem.querySelector(".cantidadItem");
    const cantidadItem = Number(cantidadItemElement.value);
    const itemId = shoppingCartItem.getAttribute("data-id");
    const title = shoppingCartItem.querySelector(".shopping-cart-item-title");
    const price = Number(
      shoppingCartItem
        .querySelector(".shoppingCartItemPrice")
        .textContent.replace("€", "")
    );
    const img = shoppingCartItem.querySelector("img");
    const item = {
      id: itemId,
      cant: cantidadItem,
      title: title.textContent,
      price: price,
      img: img.src,
    };
    arrayItemsLS.push(item);
  });
  return arrayItemsLS;
}

function addLS(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

//Mostrar los productos guardados en el LS
function leerLocalStorage() {
  items = JSON.parse(localStorage.getItem(items));
}
