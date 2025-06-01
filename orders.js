const orderList = document.getElementById("order-list");

// Simulate some orders (replace with real orders if back-end added)
const simulatedOrders = [
  { id: "BW100001", customer: "Thato M.", status: "Shipped", total: "P750" },
  { id: "BW100002", customer: "Naledi P.", status: "Processing", total: "P350" }
];

simulatedOrders.forEach(order => {
  const li = document.createElement("li");
  li.textContent = `${order.id} - ${order.customer} - ${order.status} - ${order.total}`;
  orderList.appendChild(li);
});
