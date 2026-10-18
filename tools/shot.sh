#!/usr/bin/env bash
# Chụp toàn trang bằng Chrome headless: shot.sh <đường dẫn> <rộng> <cao> <tên file trong design/shots>
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --user-data-dir="C:/Users/quang/AppData/Local/Temp/goi-chrome-$2" \
  --window-size="$2,$3" --virtual-time-budget=6000 --screenshot="C:/Users/quang/WebGoi/design/shots/$4" "http://localhost:4173$1?static&bp=$5" >/dev/null 2>&1
