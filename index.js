window.addEventListener("DOMContentLoaded", init);

async function init() {
  //load data
  const link =
    "https://www.unisport.dk/api/products/batch/?list=200776,207862,213591,217710,213590,197250,189052,200811,200780,207857,173432,212703,198079,205990,209125,197237,217706,190711,217769,202481,209588,213577,198095,206026,213558,205989,213587,193652,201338,205946,202483,200802,200783,203860,193539,200777,213576,212647,206057,213626";
  const respons = await fetch(link);
  const data = await respons.json();

  // sort by discount (most discounted product first)
  const products = data.products;
  products.sort((a, b) => {
    return b.prices.discount_percentage - a.prices.discount_percentage;
  });

  // set up product grid
  addProductsToGrid(products);
}

function addProductsToGrid(products) {
  //template for each product
  const template = document.querySelector("template");
  //container of products
  const container = document.querySelector("#product-grid");
  //make sure container is empty
  container.innerHTML = "";

  //add each product via template and appendChild
  products.forEach((product) => {
    const clone = template.cloneNode(true).content;

    // Add read more link
    clone.querySelector("a").href =
      "https://www.unisport.dk" + product.relative_url;

    // Add name
    clone.querySelector("h2").textContent = product.name;

    //Add price and discount if any
    clone.querySelector("p").innerHTML =
      "Pris: " +
      product.prices.min_price +
      " " +
      product.prices.currency +
      (product.prices.discount_percentage !== 0
        ? "<br><span>Spar " +
          product.prices.discount_percentage +
          "% - før: " +
          product.prices.recommended_retail_price +
          " " +
          product.prices.currency +
          "</span>"
        : "");

    //Add gender attributes
    product.attributes.gender.forEach((gender) => {
      let att = document.createElement("p");
      att.appendChild(document.createTextNode(gender));
      clone.querySelector(".gender").appendChild(att);
    });

    // Add image source
    clone.querySelector("img").src = product.product_main_image;

    // Append this product to container
    container.appendChild(clone);
  });
}
