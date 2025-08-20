/*eventEmitter overview*/
// const events = require("events");
// const emitter = new events.EventEmitter(); //create new object from eventEmitter class
// emitter.on("test", (data) => {
//   console.log("test event is running...", data);
// });

// let x = 10;
// if (x === 10) {
//   emitter.emit("test", {
//     name: "semon",
//     age: 20,
//   }); //the first parameter is the event_name, the second is the data to be passed to the event handler(callback function)
// }

/*registeration using eventEmitter*/
let eventEmitter = require("./Events.js");
const readLine = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
let rl = readLine.createInterface({ input, output });

rl.question("Enter your name: ", (userName) => {
  rl.question("Enter your email: ", (email) => {
    rl.question("Enter your password: ", (password) => {
      eventEmitter.emit("Register", { userName, email, password });
      rl.close();
    });
  });
});

/*stock handling using events */
// let eventEmitter = require("./Events.js");
// // --- Tiny in-memory "inventoryProds"
// const { inventoryProds } = require("./Data.js"); // { [sku]: { name, qty, threshold } }

// // --- Core API (students finish the TODO emits)
// function createProduct(sku, name, qty = 0, threshold = 2) {
//   inventoryProds[sku] = { name, qty, threshold };
//   // TODO: emit 'product:created' with { sku, name, qty, threshold }
//   eventEmitter.emit("product:created", { sku, name, qty, threshold });
// }

// function sell(sku, amount = 1) {
//   const item = inventoryProds[sku];
//   // if no item, emit 'error' with { message: `No product ${sku}` }
//   if (!item) {
//     eventEmitter.emit("error", { message: `No product ${sku}` });
//   }
//   // if amount <= 0, emit 'error' with { message: 'Amount must be > 0' }
//   else if (amount <= 0) {
//     eventEmitter.emit("error", { message: "Amount must be > 0" });
//   }
//   // if item.qty < amount, emit 'error' with { message: 'Insufficient stock' }
//   else if (item.qty < amount) {
//     eventEmitter.emit("error", { message: "Insufficient stock" });
//   }

//   item.qty -= amount;

//   // TODO: always emit 'stock:changed' with { sku, qty: item.qty }
//   eventEmitter.emit("stock:changed", { sku, qty: item.qty });

//   // TODO: if qty === 0 -> emit 'inventory:out' with { sku }
//   if (item.qty === 0) {
//     eventEmitter.emit("inventory:out", { sku });
//   }
//   // else if qty <= threshold -> emit 'inventory:low' with { sku, qty, threshold: item.threshold }
//   else if (item.qty <= item.threshold) {
//     eventEmitter.emit("inventory:low", {
//       sku,
//       qty: item.qty,
//       threshold: item.threshold,
//     });
//   }
// }

// function restock(sku, amount = 1) {
//   const item = inventoryProds[sku];
//   // if no item, emit 'error' with { message: `No product ${sku}` }
//   if (!item) {
//     eventEmitter.emit("error", { message: `No product ${sku}` });
//     return;
//   }
//   // if amount <= 0, emit 'error' with { message: 'Amount must be > 0' }
//   if (amount <= 0) {
//     eventEmitter.emit("error", { message: "Amount must be > 0" });
//     return;
//   }

//   item.qty += amount;

//   // TODO: emit 'restocked' with { sku, qty: item.qty }
//   eventEmitter.emit("restocked", { sku, qty: item.qty });
//   // If qty > threshold -> emit 'inventory:ok' with { sku, qty }
//   if (item.qty > item.threshold) {
//     eventEmitter.emit("inventory:ok", { sku, qty: item.qty });
//   }
// }

// // --- Demo flow (expected output below after you implement emits)
// createProduct("USB-C", "USB-C Cable", 3, 2);
// sell("USB-C", 1); // qty 2 -> LOW
// sell("USB-C", 2); // qty 0 -> OUT
// restock("USB-C", 5); // qty 5 -> RESTOCK + OK

/*
Expected (order may vary slightly):
🆕 Added USB-C Cable (USB-C) qty=3, low<=2
🔢 USB-C stock changed → 2
⚠️  USB-C LOW STOCK (2) ≤ threshold (2) — reorder soon
🔢 USB-C stock changed → 0
⛔ USB-C OUT OF STOCK — stop selling
✅ USB-C restocked → 5
🟢 USB-C healthy stock → 5
*/
