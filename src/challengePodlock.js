const fs = require('fs');

module.exports = function challengePodlock(podIpcJson) {
    const podLockContents = fs.readFileSync('./ios/Podfile.lock', 'utf-8');
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
