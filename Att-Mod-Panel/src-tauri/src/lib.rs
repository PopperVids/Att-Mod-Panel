#[tauri::command]
fn user_name(user_name: &str) -> String {
    format!("Logged in as {}", user_name)
}
#[tauri::command]
fn pass_word(pass_word: &str) -> String {
    format!("with password {}", pass_word)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![user_name, pass_word])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}