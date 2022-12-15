const core = require('@actions/core');
const github = require('@actions/github');
const config = JSON.parse(JSON.parse(core.getInput("pods")));
const fs = require('fs');

function challengePodlock(podIpcJson) {
    try {
        const podLockContents = fs.readFileSync('./ios/Podfile.lock', 'utf-8');
    } catch (error) {
        core.setFailed('Podfile.lock not found - did you run `pod install` yet?')
        return false;
    }

    const deps = podIpcJson;

    for (const dep in deps) {
        const name = deps[dep].name;
        const version = deps[dep].version;
        const podLockFormat = `${name} (${version})`;
        if(!podLockContents.includes(podLockFormat)) {
            console.log(podLockFormat + ': installed as part of an npm dependency, but not found in Podfile.lock.');
            return false;
        }
    }

    return true;
}

if (!challengePodlock(config)) {
    core.setFailed('Pods are not synced.  Run `pod install` in the iOS directory and commit the new Podfile.lock')
} else {
    console.log('Pods appear to be synced.')
}
