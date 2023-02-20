use tauri::{command, State};

use crate::AppState;

#[command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[command]
pub fn close_window(window_lable: &str, _app: tauri::AppHandle, window: tauri::Window) {
    println!(
        "Requested to close the window: window_lable: {}, window: {}",
        window_lable,
        window.label()
    );
    window.hide().unwrap();
}

#[command]
pub fn get_temp_content(app_state: State<'_, AppState>) -> String {
    app_state.temp_content.clone()
}
