// Script.js

// Variables
const url = "https://fakestoreapi.com/products";

// Load api on page load
window.addEventListener("DOMContentLoaded", () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Put the api data in local storage
      localStorage.setItem("storeData", JSON.stringify(data));
    })
    .catch((error) => {
      console.log(error);
    });
  try {
    // Get api data from local storage
    let storeItems = JSON.parse(localStorage.getItem("storeData"));

    // For each item, add a 'product-item' element
    for (i in storeItems) {
      // Define variables
      let item = storeItems[i];
      let productList = document.getElementById("product-list");
      let product = document.createElement("product-item");

      // Set attributes
      product.setAttribute("imgSrc", item.image);
      product.setAttribute("title", item.title);
      product.setAttribute("price", item.price);
      product.setAttribute("id", item.id);

      // Check if the item has already been added
      if (localStorage.getItem(`item${item.id}`) == "added") {
        product.setAttribute("added", "true");
      } else {
        product.setAttribute("added", "false");
      }

      // Add to the DOM
      productList.appendChild(product);
    }
  } catch (ex) {
    console.log("Cannot get store data!");
  }
});
