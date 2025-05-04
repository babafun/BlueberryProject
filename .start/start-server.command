#!/bin/bash

# Check if running on macOS
if [[ "$(uname)" != "Darwin" ]]; then
  echo "[X] This script is for macOS only."
  exit 1
fi

# Your usual script logic below...
cd "$(dirname "$0")/.." || exit 1

# Python detection
PYTHON=""
for cmd in python python3 python2; do
  if command -v $cmd >/dev/null 2>&1; then
    PYTHON=$cmd
    break
  fi
done

if [ -z "$PYTHON" ]; then
  echo "[X] No version of Python (python, python3, or python2) is installed or in PATH."
  exit 1
fi

# Port scanning
PORT=5500
MAX_PORT=65535
while [ $PORT -le $MAX_PORT ]; do
  if ! lsof -i :$PORT >/dev/null 2>&1; then
    break
  fi
  PORT=$((PORT + 1))
done

if [ $PORT -gt $MAX_PORT ]; then
  echo "[X] No available ports between 5500 and $MAX_PORT. All ports are in use."
  exit 1
fi

echo "Starting HTTP server on port $PORT using $PYTHON..."
$PYTHON -m http.server $PORT &

sleep 1
open "http://localhost:$PORT"
