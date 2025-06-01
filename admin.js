let adminProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];

function renderAdminProducts() {
  const list = document.getElementById("admin-product-list");
  list.innerHTML = "";
  adminProducts.forEach((p, index) => {
    list.innerHTML += `
      <li>
        <strong>${p.name}</strong> - P${p.price} (${p.category})
        <button onclick="removeProduct(${index})">Delete</button>
      </li>
    `;
  });
}

function removeProduct(index) {
  adminProducts.splice(index, 1);
  localStorage.setItem("adminProducts", JSON.stringify(adminProducts));
  renderAdminProducts();
}

document.getElementById("add-product-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("product-name").value;
  const price = parseFloat(document.getElementById("product-price").value);
  const category = document.getElementById("product-category").value;
  const image = document.getElementById("product-image").value;

  adminProducts.push({ name, price, category, image });
  localStorage.setItem("adminProducts", JSON.stringify(adminProducts));
  renderAdminProducts();

  this.reset();
});

window.onload = renderAdminProducts;
