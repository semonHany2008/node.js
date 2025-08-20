// An order: { id, customer, item, qty, status }   status ∈ "new" | "paid" | "packed" | "shipped" | "canceled"
const bus = require("./eventBus");
let nextId = 1;
const orders = []; // keep simple for the exercise

function createOrder(customer, item, qty) {
  // validate inputs (non-empty customer/item, qty > 0)
  // If invalid, return { ok:false, error:"message" }
  if (!customer || !item || qty <= 0) {
    return { ok: false, error: "Invalid input data" };
  }
  // Create a new order with the following properties:
  // id: nextId++,
  // customer: customer.trim(),
  // item: item.trim(),
  // qty: Number(qty),
  // status: "new"

  const order = {
    id: nextId++,
    customer: customer.trim(),
    item: item.trim(),
    qty,
    status: "new",
  };
  // Emit an event for the new order creation (if needed)
  // For example: bus.emit("order:created", order);
  bus.emit("order:created", order);
  // Add the order to the orders array
  orders.push(order);
  // Return { ok:true, order }
  return { ok: true, order };
}

function findById(id) {
  // classic loop to find the order by id from the orders array
  // Return the order if found, otherwise return null
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].id === id) {
      return orders[i];
    }
  }
  return null;
}

function list() {
  // return a shallow copy of the orders array
  let list = orders;
  return list;
}

function setStatus(id, newStatus) {
  // find the order by id from the orders array
  // if the order is not found, return { ok: false, error: "Order not found" }
  // if the order is found, update the status of the order to the newStatus
  // return { ok: true, order }
  let foundOrder = findById(id);
  if (!foundOrder) {
    return { ok: false, error: "Order not found" };
  } else {
    foundOrder.status = newStatus;
    return { ok: true, order: foundOrder };
  }
}

// export the functions to be used in the application
module.exports = { createOrder, findById, list, setStatus };
