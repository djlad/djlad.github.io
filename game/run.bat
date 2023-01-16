rm -r dist/*
cp views/* dist
node build.mjs &
tsc -w