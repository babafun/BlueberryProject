#!/bin/bash

# 🚫 1. Exit if not Linux
if [[ "$(uname)" != "Linux" ]]; then
  echo "[X] This script is for Linux only. Detected: $(uname)"
  exit 1
fi

# 📂 2. Move to the directory of the script
cd "$(dirname "$0")" || exit 1

# 🐍 3. Find a working Python command
PYTHON_CMD=""
for cmd in python python3 python2; do
  if command -v "$cmd" >/dev/null 2>&1; then
    PYTHON_CMD=$cmd
    break
  fi
done

if [ -z "$PYTHON_CMD" ]; then
  echo "[X] No version of Python found (python, python3, or python2)."
  exit 1
fi

# 🔎 4. Find the first open port from 5500
PORT=5500
MAX_PORT=65535

while [ $PORT -le $MAX_PORT ]; do
  if ! ss -tuln | grep -q ":$PORT "; then
    break
  fi
  PORT=$((PORT + 1))
done

if [ $PORT -gt $MAX_PORT ]; then
  echo "[X] No available ports found."
  exit 1
fi

# 🚀 5. Start server
echo "✅ Starting $PYTHON_CMD HTTP server on port $PORT..."
$PYTHON_CMD -m http.server "$PORT" &

# 🌐 6. Open default browser
sleep 1
xdg-open "http://localhost:$PORT" >/dev/null 2>&1

exit 0
# 🛑 7. End of script