use std::fs::File;
use std::io::Write;
use std::process::Command;
use tauri::Result;

#[tauri::command]
fn login_user(login_user: &str) -> String {
    format!("Logged in as {}", login_user)
}

#[tauri::command]
fn server_id(server_id: &str) -> String {
    format!("server id {}", server_id)
}

#[tauri::command]
fn save_info(username: &str, password: &str, serverid: &str) -> Result<String> {
    let output = format!("{} {} {}", username, password, serverid);

    // Attempt to create and write to the file
    let mut file = File::create("info.txt")?;
    file.write_all(output.as_bytes())?;

    // Open the file explorer and highlight the file using a system command
    #[cfg(target_os = "windows")]
    Command::new("explorer")
        .args(&["/select,", "info.txt"])
        .spawn()?;

    #[cfg(target_os = "macos")]
    Command::new("open").args(&["-R", "info.txt"]).spawn()?;

    #[cfg(target_os = "linux")]
    Command::new("xdg-open").arg("info.txt").spawn()?;

    Ok(output)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![login_user, server_id, save_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
