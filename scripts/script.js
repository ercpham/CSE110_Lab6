// Script.js
const url = 'https://fakestoreapi.com/products';

window.addEventListener('DOMContentLoaded', () => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('storeData', JSON.stringify(data));
    })
    .catch((error) => {
      console.log(error);
    });
  try {
    let storeItems = JSON.parse(localStorage.getItem('storeData'));
    for (i in storeItems) {
      let item = storeItems[i];
      let productList = document.getElementById("product-list");
      let product = document.createElement("product-item");
      product.setAttribute("imgSrc", item.image);
      product.setAttribute("title", item.title);
      product.setAttribute("price", item.price);
      productList.appendChild(product);
    }
  } catch (ex) {
    console.log(ex);
  }
});

function buttonClick(button) {
}
