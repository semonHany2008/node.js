const { usersData } = require("./Data.js");
const events = require("events");
const eventEmitter = new events.EventEmitter();

eventEmitter.on("Register", (data) => {
  if (usersData[data.userName]) {
    console.log("This user already exist");
  } else if (data.password.length < 5) {
    console.log("Password must be at least 5 characters");
  } else {
    usersData[data.userName] = data;
    console.log("User registered successfully");
  }
});

eventEmitter.on("product:created", (data) => {
  console.log(
    `🆕 Added ${data.name} (${data.sku}) qty=${data.qty}, low<=${data.threshold}`
  );
});
eventEmitter.on("error", (err) => {
  console.error(`⚠️  ${err.message}`);
});
eventEmitter.on("stock:changed", (data) => {
  console.log(`🔢 ${data.sku} stock changed → ${data.qty}`);
});
eventEmitter.on("inventory:out", (data) => {
  console.log(`⛔ ${data.sku} OUT OF STOCK — stop selling`);
});
eventEmitter.on("inventory:low", (data) => {
  console.log(
    `⚠️  ${data.sku} LOW STOCK (${data.qty}) ≤ threshold (${data.threshold}) — reorder soon`
  );
});
eventEmitter.on("restocked", (data) => {
  console.log(`✅ ${data.sku} restocked → ${data.qty}`);
});
eventEmitter.on("inventory:ok", (data) => {
  console.log(`🟢 ${data.sku} healthy stock → ${data.qty}`);
});

module.exports = eventEmitter;
