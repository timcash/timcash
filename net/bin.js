#! /usr/bin/env node
//const DHT = require("@hyperswarm/dht");
import DHT from "@hyperswarm/dht";

const node = new DHT();

const remotePublicKey = Buffer.from(
  "9dc32b14716463f3fc7d4c69bfefd6050e4be76091c674a124eda66ef459805b",
  "hex"
);
const encryptedSocket = node.connect(remotePublicKey);

encryptedSocket.on("open", function () {
  console.log("Connected to server");
});

encryptedSocket.on("data", function (data) {
  console.log("Remote said:", data.toString());
});
