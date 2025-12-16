#!/bin/sh
set -e

# Replace placeholder in config.js with runtime BACKEND_URL
if [ -n "${BACKEND_URL}" ]; then
  echo "window.__BACKEND_URL__ = '${BACKEND_URL}';" > /usr/share/nginx/html/config.js
else
  echo "window.__BACKEND_URL__ = 'http://backend:8000';" > /usr/share/nginx/html/config.js
fi

exec "$@"
