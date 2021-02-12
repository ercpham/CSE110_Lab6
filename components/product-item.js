// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    var imgSrc = this.getAttribute("imgSrc");
    var title = this.getAttribute("title");
    var price = this.getAttribute("price");
    this._root = this.attachShadow({ mode: "open" });
    this._root.innerHTML = `
      <!li class="product">
        <img src="${imgSrc}" alt="${title}" width=200>
        <p class="title">${title}</p>
        <p class="price">${price}</p>
        <button>Add to Cart</button>
      </li>
      <style>
        .price {
          color: green;
          font-size: 1.8em;
          font-weight: bold;
          margin: 0;
        }

        .product {
          align-items: center;
          background-color: white;
          border-radius: 5px;
          display: grid;
          grid-template-areas: 
          'image'
          'title'
          'price'
          'add';
          grid-template-rows: 67% 11% 11% 11%;
          height: 450px;
          filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
          margin: 0 30px 30px 0;
          padding: 10px 20px;
          width: 200px;
        }

        .product > button {
          background-color: rgb(255, 208, 0);
          border: none;
          border-radius: 5px;
          color: black;
          justify-self: center;
          max-height: 35px;
          padding: 8px 20px;
          transition: 0.1s ease all;
        }

        .product > button:hover {
          background-color: rgb(255, 166, 0);
          cursor: pointer;
          transition: 0.1s ease all;
        }

        .product > img {
          align-self: center;
          justify-self: center;
          width: 100%;
        }

        .title {
          font-size: 1.1em;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .title:hover {
          font-size: 1.1em;
          margin: 0;
          white-space: wrap;
          overflow: auto;
          text-overflow: unset;
        }

      </style>
    `;
    this.shadowRoot.querySelector("button").onclick = (e) => {
      if ((e.target.textContent == "Add to Cart")) {
        e.target.textContent = "Remove from Cart";
        document.getElementById("cart-count").textContent =
          parseInt(document.getElementById("cart-count").textContent) + 1;
      } else {
        e.target.textContent = "Add to Cart";
        document.getElementById("cart-count").textContent =
          parseInt(document.getElementById("cart-count").textContent) - 1;
      }
    };
  }
}

customElements.define("product-item", ProductItem);
