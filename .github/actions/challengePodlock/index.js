const core = require('@actions/core');
const github = require('@actions/github');
const index = require("./src/index.js");
const config = JSON.parse(JSON.parse(core.getInput("pods")));

if (!index(config)) {
    core.setFailed('Podfile is not synced.  Run `pod install` in the iOS directory and commit the new Podfile.lock')
} else {
    console.log('Pods appear to be synced.')
}
