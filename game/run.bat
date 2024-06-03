rm -r dist/*
cp views/* dist
tsc -w &
node build.mjs