import { message } from "@tauri-apps/plugin-dialog";
const CommandButton = document.getElementById("ConnectButton")

CommandButton?.addEventListener(`click`, async (event) => {
  event.preventDefault();
  await message('Connecting to server', { title: 'Att mod panel', kind: 'info',  });
})

export const myUserConfig = {
  // Enter if using user credentials
  username: '',
  password: '',
  logVerbosity: 3 // Increase to see debugger logs
};