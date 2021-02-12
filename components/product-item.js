// product-item.js

/**
 * Displays the product in the store
 * Displays the picture, name, and price, which are passed in as attributes
 */
class ProductItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Store attributes id variables
    let id = this.getAttribute("id");
    let added = this.getAttribute("added");
    let imgSrc = this.getAttribute("imgSrc");
    let title = this.getAttribute("title");
    let price = this.getAttribute("price");

    // Attach shadow and define html
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

    /**
     * Changes button text and count of numbers in cart to add an
     * item to the cart
     */
    const addThisToCart = () => {
      let button = this.shadowRoot.querySelector("button");
      button.textContent = "Remove from Cart";
      document.getElementById("cart-count").textContent =
        parseInt(document.getElementById("cart-count").textContent) + 1;
      added = "true";
    };

    /**
     * Changes button text and count of numbers in cart to remove an
     * item from the cart
     */
    const removeThisFromCart = () => {
      let button = this.shadowRoot.querySelector("button");
      button.textContent = "Add to Cart";
      document.getElementById("cart-count").textContent =
        parseInt(document.getElementById("cart-count").textContent) - 1;
      added = "false";
    };

    // Check the 'added' attribute
    if (added == "true") {
      addThisToCart();
    }

    // Set on click behavior for this component's button
    this.shadowRoot.querySelector("button").onclick = () => {
      if (added == "false") {
        addThisToCart();
        localStorage.setItem(`item${id}`, "added");
      } else {
        removeThisFromCart();
        localStorage.setItem(`item${id}`, "not added");
      }
    };
  }
}

customElements.define("product-item", ProductItem);
