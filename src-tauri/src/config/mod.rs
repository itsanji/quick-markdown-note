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
    // TODO: learn about to_owned
    let mut path = String::from(home_dir).to_owned();
    path.push_str("/.config/qmnote/config.toml");
    println!("{}", path);
    let config_file_path = Path::new(&path);
    let contents = match fs::read_to_string(config_file_path) {
        Result::Ok(content) => content,
        Result::Err(_) => return default_conf(),
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
    Config {
        storage: String::from("qmnote/storage"),
        shortcut: String::from("CommandOrControl+Shift+O"),
    }
}
