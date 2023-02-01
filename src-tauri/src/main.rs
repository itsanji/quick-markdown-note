#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod cmd;
use tauri::{GlobalShortcutManager, Manager};
use tauri_plugin_positioner::{Position, WindowExt};

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_positioner::init())
        .on_window_event(|event| match event.event() {
            // Run in background
            tauri::WindowEvent::CloseRequested { api, .. } => {
                api.prevent_close();
                event.window().hide().unwrap();
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![cmd::greet, cmd::close_window])
        .build(tauri::generate_context!())
        .expect("error while building tauri application")
        .run(|app_handle, event| match event {
            tauri::RunEvent::Ready => {
                let app_handle = app_handle.clone();
                // register shortcuts
                app_handle
                    .global_shortcut_manager()
                    .register("CommandOrControl+Shift+U", move || {
                        for (title, window) in app_handle.windows() {
                            println!("{}", title);
                            window.show().unwrap();
                            window.center().unwrap();
                            window.set_focus().unwrap();
                            let _ = window.move_window(Position::TopRight);
                        }
                    })
                    .unwrap();
            }
            _ => {}
        })
}
