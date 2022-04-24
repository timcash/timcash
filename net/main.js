import DHT from "@hyperswarm/dht";
import http from "http";

// Make a Hyperswarm DHT node that connects to the global network.
const node = new DHT();
let connections = [];

const server = node.createServer(function (encryptedSocket) {
  // Called when a new connection arrives.
  console.log(
    "New connection from",
    encryptedSocket.remotePublicKey.toString("hex")
  );

  // Add remotePublicKey to connections array
  connections.push(encryptedSocket.remotePublicKey.toString("hex"));

  // Close connection after writing hello world
  encryptedSocket.write("Hello world!");
  encryptedSocket.end();
});

// create a typed int array of 0's 32 bytes
const seedbytes = new Uint8Array(32);
// set the second byte to 42
seedbytes[1] = 42;
// log the seed bytes
console.log(seedbytes);

const keyPair = DHT.keyPair(seedbytes);
await server.listen(keyPair);

// Server is now listening.
console.log("Connect to:");
console.log(keyPair.publicKey.toString("hex"));

// set host to localhost:8080
const host = "localhost";
// set port to 8080
const port = 8080;

const requestListener = function (req, res) {
  // send 200 status code
  // set content type to text
  res.writeHead(200, { "Content-Type": "text/plain" });

  // write the keyPair hex to the response
  res.write(`public key\n${keyPair.publicKey.toString("hex")}\n`);

  // for each connection, write the connection to the response
  for (let i = 0; i < connections.length; i++) {
    res.write(connections[i] + "\n");
  }
  // close the response
  res.end();
};

const http_server = http.createServer(requestListener);
http_server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
