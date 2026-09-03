#!/usr/bin/env bash
set -euo pipefail

rm -rf dist
mkdir -p dist

# Copy site files into dist while excluding build-time/developer artifacts
rsync -a ./ dist/ \
  --exclude '.git/' \
  --exclude 'dist/' \
  --exclude 'node_modules/' \
  --exclude 'scripts/' \
  --exclude 'package.json' \
  --exclude 'package-lock.json' \
  --exclude '*.py' \
  --exclude '*.md'

echo "Static site copied to dist/"
