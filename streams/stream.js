const { Client } = require("pg");
const client = new Client("postgres://materialize@localhost:6875/materialize");
var format = require("pg-format");

// a list of 10 random countries
const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Serbia",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
];

// a random integer between min and max
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// insert edge like this: create_edge(int a, int b, string e)
async function insert_edge(a, b, e) {
  const query_text = "INSERT INTO edge_table(a, b, e) VALUES($1, $2, $3);";
  const values = [a, b, e];
  const res = await client.query(query_text, values);
  return res;
}

// bulk insert function that creates random edges
async function bulk_insert(count) {
  const values = [];
  for (let i = 0; i < count; i++) {
    const a = randomInt(0, 9);
    const b = randomInt(0, 9);
    const e = countries[randomInt(0, 9)];
    values.push([a, b, e]);
  }
  const query_text = format(
    "INSERT INTO edge_table(a, b, e) VALUES %L",
    values
  );

  const res = await client.query(query_text);
  return res;
}

async function tail() {
  await client.query("BEGIN");
  await client.query("DECLARE c CURSOR FOR TAIL edge_view");
  // track how many rows have been read
  let row_count = 0;
  // start a interval that runs every second and reports how many rows have been read
  // const interval = setInterval(async () => {
  //   console.log(`${row_count} rows read`);
  //   row_count = 0;
  // }, 1000);

  while (true) {
    // start a timer
    const res = await client.query("FETCH ALL c");
    row_count += res.rows.length;
    console.log(row_count);
  }
}

// a function that CREATES a table with the client.query
async function create_table(client, tableName, columns) {
  // try to create the table and log the error if it exists
  try {
    res = await client.query(`CREATE TABLE ${tableName} (${columns})`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function create_view() {
  // try to create the view and log the error if it exists
  try {
    const res = await client.query(
      `CREATE VIEW edge_view AS SELECT a,b,e FROM edge_table`
    );
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

// async delete_table
async function delete_table() {
  try {
    const query_text = "DROP TABLE edge_table";
    const res = await client.query(query_text);
    return res;
  } catch (err) {
    console.log(err);
  }
}

// a sleep function(ms)
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  await client.connect();
  // if args[2] is "create"
  if (process.argv[2] === "create") {
    // an integer to track how many edges have been created
    let edge_count = 0;
    // start a interval that runs every second and reports how many edges were created then reset to 0
    const interval = setInterval(async () => {
      console.log(`${edge_count} edges created`);
      edge_count = 0;
    }, 1000);

    // const args[3] is the minimum time between edge insertions
    const min_time = parseInt(process.argv[3]);
    // Delete the table if it exists
    await delete_table();

    // Create the table
    await create_table(client, "edge_table", "a int, b int, e TEXT NOT NULL");
    // create the view
    await create_view();

    // insert a row in a while loop every 3 seconds
    while (true) {
      // get two random integers between 0 length of countries
      const a = randomInt(0, countries.length - 1);
      const b = randomInt(0, countries.length - 1);
      // get a random country
      const e = countries[randomInt(0, countries.length - 1)];
      // insert the edge
      const res = await bulk_insert(10);
      edge_count += 10;
      // sleep for n seconds
      await sleep(min_time);
    }
  } else {
    // tail
    await tail();
  }
}

main();
