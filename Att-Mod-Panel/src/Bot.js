const { Client } = require('att-client');
// Creates a new ATT client instance

const { myUserConfig } = require('./config');

const bot = new Client(myUserConfig) 
const connections=[];

