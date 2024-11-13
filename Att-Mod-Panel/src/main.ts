import { invoke } from "@tauri-apps/api/core";

let userInputEl: HTMLInputElement | null;
let userMsgEl: HTMLElement | null;

async function user() {
  if (userMsgEl && userInputEl) {
    // Ensure the key matches what the Rust command expects
    userMsgEl.textContent = await invoke("user_name", {
      userName: userInputEl.value, // Updated key
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  userInputEl = document.querySelector("#greet-input");
  userMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    user();
  });
});