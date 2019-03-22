# Build the package
1. Install peer dependencies with `npx npm-install-peers`
1. Run `npm run build:main` to rebuild -> files in the dist folder should be replaced

# Instructions for publishing the latest NPM package
Since this work is released on NPM, this is how you should work once a new release is ready: 

1. make sure you are logged into npm, if not, use `npm adduser`
1. update the version number in the package.json - node `version`
1. run `npm publish`

Note that this will only work if you have a valid npm-account mapped to this project.  