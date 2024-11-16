import { invoke } from "@tauri-apps/api/core";

let userInputEl: HTMLInputElement | null;
let userMsgEl: HTMLElement | null;
let passInputEl: HTMLInputElement | null;
let passMsgEl: HTMLInputElement | null;

async function user() {
  if (userMsgEl && userInputEl) {
    // Ensure the key matches what the Rust command expects
    userMsgEl.textContent = await invoke("login_user", {
      loginUser: userInputEl.value, // Updated key
    });
  }
}

async function pass() {
  if (passMsgEl && passInputEl) {
    // Ensure the key matches what the Rust command expects
    passMsgEl.textContent = await invoke("login_pass", {
      loginPass: passInputEl.value, // Updated key
    });
  }
}

async function Data() { // saves user info for att-client
  if (userInputEl && passInputEl) {

    await invoke("save_info", {
      username: userInputEl.value,
      password: passInputEl.value,
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  userInputEl = document.querySelector("#greet-input");
  passInputEl = document.querySelector("#Password-input");
  userMsgEl = document.querySelector("#greet-msg");
  passMsgEl = document.querySelector("#pass-msg");
  document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    user();
    pass();
    Data();
  });
});