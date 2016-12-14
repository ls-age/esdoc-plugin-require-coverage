#!/usr/bin/env bash

if [ $# -eq 0 ]
  then
    echo "No version supplied"
    exit 1
fi

echo "Running babel..."
npm run compile

echo "Creating docs..."
npm run docs

echo "Adding generated files..."
git add -f out
git add -f docs/api

echo "Switching branch..."
git checkout head

echo "Committing generated files..."
git commit -m "Version $1 for distribution"

echo "Creating tag..."
git tag -a "v$1" -m "\"Add tag v$1\""

echo "Switching to master branch..."
git checkout master

echo "Pushing tag..."
git push origin --tags
