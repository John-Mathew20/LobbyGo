const mongoose = require("mongoose");
const initData = require("./data");
const listing = require("../models/listing");
const url = "mongodb://localhost:27017/Wanderlust";

main()
  .then(() => {
    console.log(`Connected on ${url}`);
  })
  .catch((err) => {
    throw err;
  });

async function main() {
  await mongoose.connect(url);
}

const initDb = async () => {
  await listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "69f4fefb90bd2e6d184028f9",
  }));
  await listing.insertMany(initData.data);
  console.log("data was initilasized");
};

initDb();
