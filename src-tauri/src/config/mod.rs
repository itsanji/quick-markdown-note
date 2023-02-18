use std::path::PathBuf;
use std::{fs, path::Path};

use home;
use serde::Deserialize;

#[derive(Deserialize, Clone, Debug)]
pub struct Config {
    pub storage: String,
    pub shortcut: String,
}

pub fn get_config() -> Config {
    let home_dir = home::home_dir().unwrap();
    let home_dir = home_dir.to_str().unwrap();
    let config_path = get_config_path(home_dir);
    // TODO: learn about to_owned
    let contents = match fs::read_to_string(config_path) {
        Result::Ok(content) => content,
        Result::Err(err) => {
            println!("{:?}", err);
            return default_conf();
        }
    };
    let configs = toml::from_str(&contents);
    match configs {
        Result::Ok(conf) => conf,
        Result::Err(_) => {
            println!("Parsing Error");
            default_conf()
        }
    }
}

fn default_conf() -> Config {
    println!("Geting default config");
    Config {
        storage: String::from("qmnote/"),
        shortcut: String::from("CommandOrControl+Shift+O"),
    }
}

#[cfg(target_os = "windows")]
fn get_config_path(home_path: &str) -> PathBuf {
    let mut path = String::from(home_path).to_owned();
    path.push_str("\\.config\\qmnote\\config.toml");
    let config_file_path = Path::new(&path);
    config_file_path.to_owned()
}

#[cfg(all(target_os = "macos", target_os = "linux"))]
fn get_config_path(home_path: &str) -> PathBuf {
    let mut path = String::from(home_dir).to_owned();
    path.push_str("/.config/qmnote/config.toml");
    let config_file_path = Path::new(&path);
}
