const core = require('@actions/core');
const github = require('@actions/github');

function extractPodspecs(config) {
    const deps = config.dependencies;
    let podSpecs = [];

    for (const dep in deps) {
        if (deps[dep].platforms && deps[dep].platforms.ios && deps[dep].platforms.ios.podspecPath) {
            podSpecs = [...podSpecs, deps[dep].platforms.ios.podspecPath];
        }
    }

    return podSpecs;
}

try {
    const config = JSON.parse(JSON.parse(core.getMultilineInput("config")));
    const podspecFiles = extractPodspecs(config);
    core.setOutput("extractedPodspecs", podspecFiles);
} catch (error) {
    core.setFailed(error.message);
}
