use std::{
    fs::{self, File, OpenOptions},
    io::{Result, Write},
};

use super::config;

/// Get temporary file content
pub fn get_temp_file_content(config: &config::Config) -> String {
    let tmp_file_path = get_temp_file_path(&config.storage);
    match fs::read_to_string(&tmp_file_path) {
        Err(err) => {
            println!("Err: {:?}", err);
            // Create tmp file
            create_temp_file(&config.storage);
            String::new()
        }
        Ok(content) => content,
    }
}

/// Get Storage File Path.
/// EX: /home/anji/qmnote
#[cfg(target_os = "windows")]
fn get_temp_file_path(storage: &String) -> String {
    let mut path = get_storage_path(&storage);
    path.push_str("\\__temp.md");
    path
}

/// get temp file path
#[cfg(any(target_os = "macos", target_os = "linux"))]
fn get_temp_file_path(storage: &String) -> String {
    let mut path = get_storage_path(&storage);
    path.push_str("/__temp.md");
    path
}

fn create_temp_file(storage_folder: &String) {
    let mut storage_folder = get_storage_path(storage_folder);
    // Create parent dir if its not existed
    match fs::create_dir_all(&storage_folder) {
        Err(err) => println!("{:?}", err),
        Ok(_) => println!("Created"),
    };
    if cfg!(any(target_os = "macos", target_os = "linux")) {
        storage_folder.push_str("/__temp.md");
    } else if cfg!(target_os = "windows") {
        storage_folder.push_str("\\__temp.md");
    }

    let mut file = match File::create(storage_folder) {
        Err(why) => panic!("couldn't create: {}", why),
        Ok(file) => file,
    };
    file.write_all("".as_bytes()).unwrap();
}

fn get_storage_path(storage: &String) -> String {
    let home_dir = home::home_dir().unwrap();
    let home_dir = home_dir.to_str().unwrap();
    let mut storage_path = String::from(home_dir).to_owned();
    if cfg!(any(target_os = "macos", target_os = "linux")) {
        storage_path.push_str("/");
    } else if cfg!(target_os = "windows") {
        storage_path.push_str("\\");
    }
    storage_path.push_str(&storage);
    storage_path
}

/// Save content to temp file
pub fn save_to_tmp_file(storage: &String, content: String) -> Result<()> {
    let temp_file_path = get_temp_file_path(storage);
    let mut file = OpenOptions::new()
        .write(true)
        .create(true)
        .truncate(true)
        .open(temp_file_path)
        .unwrap();
    file.write_all(content.as_bytes())
}
