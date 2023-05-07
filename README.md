# Install
- Binary File: [Release Page](https://github.com/anjiboss/quick-markdown-note/releases)
- Build From Source: https://tauri.app/v1/guides/building/

# Demo
![Demo](./storage/demo.gif)

# Configs
- Location: ~/.config/qmnote/config.toml
- Default Config Can Found in: [config.toml](./storage/config.toml)


# Features
- [x] fully supported markdown ( include code syntax highlight and table ).
- [x] configable Global Shortcut for reopen the app. (default is commandOrControl+Shift+O).
- [x] save template file 
  - configable ( `storage` )
  - default is $HOME/qmnote
  - file name is: __temp.md ( unchangable )
- [x] change edit/preview mode with ESC button.
- [x] change font size with:
  - + 1px: commandOrCtrl + [
  -  - 1px: commandOrCtrl + ] 
- [x] Lock the edit/preview mode with:
  - commandOrCtrl + L

# Check ideas for the project
[Idea](./.idea/roadmap.md)


# Stack
 - [Tauri](https://tauri.app/)
 - [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)


# Workflow:
- [Save file](./.idea/saving-file.excalidraw)

# Roadmap
- [x] trigger open with shortcut (current shortcut: ctrl+shift+u)
- [x] markdown input
- [x] toggle markdown preview button
- [x] Config file ([default](./../storage/qmnote.toml))
- [x] Save to tmp file 
- [x] Lock mode ( lock to edit or preview so clicking won't toggle mode )
- [ ] Save to file
- [ ] fix style
- [x] add toolbar
- [ ] sync with server
- [ ] add mobile support
- [ ] Logs
- [ ] VIM movement key