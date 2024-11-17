use std::fs::File;
use std::io::Write;
use tauri::Result;

#[tauri::command]
fn login_user(login_user: &str) -> String {
    format!("Logged in as {}", login_user)
}

#[tauri::command]
fn login_pass(login_pass: &str) -> String {
    format!("with password {}", login_pass)
}

#[tauri::command]
fn save_info(username: &str, password: &str) -> Result<String> {
    let output = format!("{} {}", password, username);

    // Attempt to create and write to the file
    let mut file = File::create("info.txt")?;
    file.write_all(output.as_bytes())?;
    
    Ok(output)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![login_user, login_pass, save_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}