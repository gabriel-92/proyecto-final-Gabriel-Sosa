const serverUrl = "http://127.0.0.1:5500/";
const itemsPath = "JSON/database.json";
const imagespath = "/img/";

window.onload = getData();
//? toma los datos del JSON
const items = document.querySelector(".cards");

function getData() {
  fetch(`${serverUrl}${itemsPath}`)
    .then((res) => res.json())
    .then((data) => printData(data));
}
//? imprime dinamicamente los productos del Json actuando como una base de datos

function printData(data) {
  const itemContainer = document.createElement("div");
  itemContainer.className = "row";
  data.forEach((item) => {
    itemContainer.innerHTML += createDomElement(item);
    items.append(itemContainer);
  });
}
function createDomElement(item) {
  const itemHtml = `
      <div class="col">
          <div class="card"  data-id="${item.id}" style="width: 18rem;">
              <img src="${serverUrl}${imagespath}${item.image}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus a cum iusto
                    quisquam nemo at, eveniet blanditiis consequuntur odit, praesentium.
                </p>
                  <h4 class="card-price">${item.price} €</h4>
                  <button class="btn btn-primary btnCompra pull-right">Ordena</button>
              </div>
          </div>
      </div>
    `;
  return itemHtml;
}
