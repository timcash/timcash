#! /usr/bin/env node
//const DHT = require("@hyperswarm/dht");
import DHT from "@hyperswarm/dht";

const node = new DHT();

// public_key = args[2] from command line
const public_key = process.argv[2];

const remotePublicKey = Buffer.from(public_key, "hex");
const encryptedSocket = node.connect(remotePublicKey);

encryptedSocket.on("open", function () {
  console.log("Connected to server");
});

encryptedSocket.on("data", function (data) {
  console.log("Remote said:", data.toString());
});
