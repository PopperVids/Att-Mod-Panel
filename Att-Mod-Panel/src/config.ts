import { message } from "@tauri-apps/plugin-dialog";
import mitt from 'mitt';
import { Client } from 'att-client';

interface UserConfig {
  username: string;
  password: string;
  logVerbosity: number;
}

const myUserConfig: UserConfig = {
  username: '',
  password: '',
  logVerbosity: 3, // Increase to see debugger logs
};

const bot = new Client(myUserConfig);
const connections: Array<any> = [];
const CommandButton = document.getElementById("ConnectButton");
let server_id = 1000000000;

// Create an event emitter instance
const emitter = mitt();

CommandButton?.addEventListener('click', async (event) => {
  event.preventDefault();
  await message('Connecting to server...', { title: 'Att mod panel', kind: 'info' });

  async function main() {
    await bot.start(); // Starts the bot

    const connection = await bot.openServerConnection(server_id); // Opens a connection to the server with the id of server_id

    // Emit the 'connect' event
    emitter.emit('connect', connection);

    // Use mitt for event handling
    emitter.on('connect', async (connection: any) => {
      await message(`connected to ${server_id}`, { title: 'Att mod panel', kind: 'info' });
      connections.push(connection); // Pushes the connection to the connections array to access outside of the event stream

      runcommands(); // Runs the commands function
    });

    async function runcommands() { // Command example
      const connection = connections.find(connection => connection.server.id === server_id); // Finds the connection to the server with the id of server_id

      if (!connection) {
        return await message('Error connecting to server', { title: 'Att mod panel', kind: 'error' });
      } else {
        // If no connection is found log an error
        // Send a command to send a message to att
        // All commands admins can send bots can too!!

        // Examples of getting data from the server
      }
    }
  }

  main();
});