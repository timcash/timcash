const { Client } = require("pg");
const client = new Client("postgres://materialize@localhost:6875/materialize");

async function insert() {
  const query_text = "INSERT INTO edge_table(a, b) VALUES($1, $2);";
  const values = [4, "GHANA"];
  const res = await client.query(query_text, values);
  console.log(res);
}

// async sleep function(ms)
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  await client.connect();
  // white true loop insert and sleep for 3 seconds
  while (true) {
    await insert();
    await sleep(3000);
  }
}

main();
