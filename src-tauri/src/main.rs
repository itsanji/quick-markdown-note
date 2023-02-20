#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod cmd;
mod config;
mod tmp_file;
use config::Config;
use tauri::{GlobalShortcutManager, Manager};
use tauri_plugin_positioner::{Position, WindowExt};
#[derive(Clone, serde::Serialize)]
struct Payload {
    content: String,
}

#[derive(Default, Clone)]
pub struct AppState {
    app_conf: Config,
    temp_content: String,
}

fn main() {
    let app_conf = config::get_config();
    let temp_file_content = tmp_file::get_temp_file_content(&app_conf);
    let app_state = AppState {
        temp_content: temp_file_content,
        app_conf: app_conf.clone(),
    };

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
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![
            cmd::greet,
            cmd::close_window,
            cmd::get_temp_content,
            cmd::temp_saving,
        ])
        .setup(|app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
                // window.close_devtools();
            }
            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while building tauri application")
        .run(move |app_handle, event| match event {
            tauri::RunEvent::Ready => {
                let app_handle = app_handle.clone();
                let app_conf = &app_conf.clone();
                // register shortcuts
                app_handle
                    .global_shortcut_manager()
                    .register(app_conf.shortcut.as_str(), move || {
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
