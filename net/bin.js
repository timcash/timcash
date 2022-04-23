#! /usr/bin/env node
//const DHT = require("@hyperswarm/dht");
import DHT from "@hyperswarm/dht";

const node = new DHT();

const remotePublicKey = Buffer.from(
  "fda108cfb14d19b407eaf93c129cb927cbb5c8a8cd9f2d7944d8554560b4de96",
  "hex"
);
const encryptedSocket = node.connect(remotePublicKey);

encryptedSocket.on("open", function () {
  console.log("Connected to server");
});

encryptedSocket.on("data", function (data) {
  console.log("Remote said:", data.toString());
});
