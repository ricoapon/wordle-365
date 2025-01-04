#!/usr/bin/env bash

# Determine the version that we implement. We always want the tag as the version. If for some reason we don't have a
# tag, the --always will make sure that we output the commit hash. This way, we always have an output that is trackable.
gitVersion=`git describe --tags --always`

# Write the version to the Angular file.
echo "export const VERSION = '${gitVersion}';" > src/version.ts

ng build --configuration production

# GitHub Pages needs extra files to make it work correctly:
# * 404.html, so that all URLs actually route to the application.
# * .nojekyll, so that GitHub Pages doesn't use the auto configured Jekyll.
cp dist/wordle-365/index.html dist/wordle-365/404.html
touch dist/wordle-365/.nojekyll
