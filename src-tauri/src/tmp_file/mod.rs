use std::{
    fs::{self, File},
    io::Write,
};

use super::config;

/// Get temporary file content
pub fn get_temp_file_content(config: &config::Config) -> String {
    let tmp_file_path = get_storage_file_path(&config.storage);
    match fs::read_to_string(&tmp_file_path) {
        Err(err) => {
            println!("Err: {:?}", err);
            // Create tmp file
            create_temp_file(&tmp_file_path);
            String::new()
        }
        Ok(content) => content,
    }
}

/// Get Storage File Path.
/// EX: /home/anji/qmnote
#[cfg(target_os = "windows")]
fn get_storage_file_path(storage: &String) -> String {
    let home_dir = home::home_dir().unwrap();
    let home_dir = home_dir.to_str().unwrap();
    // TODO: learn about to_owned
    let mut path = String::from(home_dir).to_owned();
    path.push_str("\\");
    path.push_str(&storage.to_string());
    path
}

/// get temp file path
#[cfg(all(target_os = "macos", target_os = "linux"))]
fn get_temp_file_path(storage: &String) -> PathBuf {
    let home_dir = home::home_dir().unwrap();
    let home_dir = home_dir.to_str().unwrap();
    // TODO: learn about to_owned
    let mut path = String::from(home_dir).to_owned();
    path.push_str("/");
    path.push_str(&storage.to_string());
    path.push_str("/__temp.md");
    let temp_file_path = Path::new(&path);
    temp_file_path.to_owned()
}

fn create_temp_file(storage_path: &String) {
    let mut storage_path = storage_path.clone();
    // Create parent dir if its not existed
    storage_path.push_str("\\");
    match fs::create_dir_all(&storage_path) {
        Err(err) => println!("{:?}", err),
        Ok(_) => println!("Created"),
    };
    // Open a file in write-only mode, returns `io::Result<File>`
    storage_path.push_str("__temp.md");
    let mut file = match File::create(storage_path) {
        Err(why) => panic!("couldn't create: {}", why),
        Ok(file) => file,
    };
    file.write_all("".as_bytes()).unwrap();
}
