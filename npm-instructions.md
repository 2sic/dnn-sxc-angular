# Instructions for publishing the latest NPM package

Since this work is released on NPM, this is how you should work once a new release is ready: 

1. make sure you are logged into npm, if not, use `npm adduser`
1. update the version number in the package.json - node `version`
1. run `npm publish`

Note that this will only work if you have a valid npm-account mapped to this project. 