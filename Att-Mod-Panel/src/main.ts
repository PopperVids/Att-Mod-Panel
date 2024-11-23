import { invoke } from "@tauri-apps/api/core";

let userInputEl: HTMLInputElement | null;
let userMsgEl: HTMLElement | null;
let passInputEl: HTMLInputElement | null;
let idInputEL: HTMLInputElement | null;
let idMsgEL: HTMLInputElement | null;

async function user() {
  if (userMsgEl && userInputEl) {
    // Ensure the key matches what the Rust command expects
    userMsgEl.textContent = await invoke("login_user", {
      loginUser: userInputEl.value, // Updated key
    });
  }
}

async function Data() { // saves user info for att-client stored locally ✅
  if (userInputEl && passInputEl && idInputEL) {

    await invoke("save_info", {
      username: userInputEl.value,
      password: passInputEl.value,
      serverid: idInputEL.value,
    });
  }
}

async function id() {
  if (idInputEL && idMsgEL) {
    idMsgEL.textContent = await invoke("server_id", {
      serverId: idInputEL.value,
    });
  }
}

const Panel = document.getElementById("Panel");
const ItemList = document.getElementById("ItemList");
const Login = document.getElementById("Login");

Panel?.addEventListener('click', (event) => {
  event.preventDefault(); // Prevents the default anchor behavior
  window.location.href = "CommandRunner.html"; // Redirects to the desired page
});

ItemList?.addEventListener(`click`, (event) => {
  event.preventDefault();
  window.location.href = "ItemList.html";
})

Login?.addEventListener(`click`, (event) => {
  event.preventDefault();
  window.location.href = "index.html";
})

window.addEventListener("DOMContentLoaded", () => {
  userInputEl = document.querySelector("#greet-input");
  passInputEl = document.querySelector("#Password-input");
  idInputEL = document.querySelector("#server-id");
  userMsgEl = document.querySelector("#greet-msg");
  idMsgEL = document.querySelector("#server-msg");
  document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    user();
    Data();
    id();
  });
});