import { message } from "@tauri-apps/plugin-dialog";
const CommandButton = document.getElementById("ConnectButton");


CommandButton?.addEventListener('click', async (event) => {
  event.preventDefault();
  await message('Connecting to server...', { title: 'Att mod panel', kind: 'info' });
});