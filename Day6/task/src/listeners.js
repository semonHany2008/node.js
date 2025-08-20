// require the eventBus and store from the respective files
const bus = require("./eventBus");
const store = require("./store");

// make order:created event listener to log the order created
// console.log the following message: [EVT] order:created #<id of the order> for <customer name who created the order> (<order item> x<qty of the item ordered>)
bus.on("order:created", (order) => {
  console.log(
    `[EVT] order:created #${order.id} for ${order.customer} (${order.item} x${order.qty})`
  );
});
// make order:paid event listener to log the order paid
// if the order is not found, emit 'error' event with the message "Order not found"
// this event listener should transition the order to "paid" using store.setStatus function
// if the order is already shipped or canceled, emit 'error' event with the message "Invalid transition to paid"
// console.log the following message: [EVT] order:paid #<id of the order>
// emit "order:statusChanged" with the id and status=paid
bus.on("order:paid", (id) => {
  const order = store.findById(id);
  if (!order) {
    bus.emit("error", new Error("Order not found"));
    return;
  }
  if (order.status === "shipped" || order.status === "canceled") {
    bus.emit("error", new Error("Invalid transition to paid"));
    return;
  }
  const res = store.setStatus(id, "paid");
  if (!res.ok) {
    bus.emit("error", new Error(res.error));
    return;
  }
  console.log(`[EVT] order:paid #${id}`);
  bus.emit("order:statusChanged", { id, status: "paid" });
});
// make order:packed event listener to log the order packed
// if the order is not found, emit 'error' event with the message "Order not found"
// if the order is not paid, emit 'error' event with the message "Pack requires status=paid"
// this event listener should transition the order to "packed" using store.setStatus function
// console.log the following message: [EVT] order:packed #<id of the order>
// emit "order:statusChanged" with the id and status=packed
bus.on("order:packed", (id) => {
  let order = store.findById(id);
  if (!order) {
    bus.emit("error", new Error("order not found!"));
    return;
  }
  if (order.status !== "paid") {
    bus.emit("error", new Error("Pack requires status=paid"));
  }
  store.setStatus(id, "packed");
  console.log("[EVT] order:packed #<order.id>");
  bus.emit("order:statusChanged", { id, status: "packed" });
});
// make order:shipped event listener to log the order shipped
// if the order is not found, emit 'error' event with the message "Order not found"
// if the order is not packed, emit 'error' event with the message "Ship requires status=packed"
// this event listener should transition the order to "shipped" using store.setStatus function
// console.log the following message: [EVT] order:shipped #<id of the order>
// emit "order:statusChanged" with the id and status=shipped
bus.on("order:shipped", (id) => {
  let order = store.findById(id);
  if (!order) {
    bus.emit("error", new Error("order not found!"));
    return;
  }
  if (order.status !== "packed") {
    bus.emit("error", new Error("Ship requires status=packed"));
  }
  store.setStatus(id, "shipped");
  console.log("[EVT] order:shipped #<order.id>");
  bus.emit("order:statusChanged", { id, status: "shipped" });
});

// make order:canceled event listener to log the order canceled
// if the order is not found, emit 'error' event with the message "Order not found"
// if the order is already shipped, emit 'error' event with the message "Cannot cancel shipped order"
// this event listener should transition the order to "canceled" using store.setStatus function
// console.log the following message: [EVT] order:canceled #<id of the order> ❌
// emit "order:statusChanged" with the id and status=canceled
bus.on("order:canceled", (id) => {
  let order = store.findById(id);
  if (!order) {
    bus.emit("error", new Error("order not found!"));
    return;
  }
  if (order.status === "shipped") {
    bus.emit("error", new Error("Cannot cancel shipped order"));
  }
  store.setStatus(id, "canceled");
  console.log("[EVT] order:canceled #<order.id>");
  bus.emit("order:statusChanged", { id, status: "canceled" });
});
// make order:statusChanged event listener to log the order status changed
// console.log the following message: [EVT] statusChanged  #<id of the order> → <status of the order>
bus.on("order:statusChanged", (obj) => {
  console.log(`[EVT] statusChanged  #<${obj.id}> → <${obj.status}>`);
});
// make error event listener to log the error
// console.log the following message: [ERR] <error message>
bus.on("error", (error) => {
  console.log(`[ERR] <${error}>`);
});
// Export nothing; requiring this file attaches listeners

module.exports = {};
