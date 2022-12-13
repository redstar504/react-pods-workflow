const core = require('@actions/core');
const github = require('@actions/github');
const extractPodspecs = require("./src/extractPodspecs.js");

try {
    const config = JSON.parse(JSON.parse(core.getMultilineInput("config")));
    const podspecFiles = extractPodspecs(config);
    core.setOutput("extractedPodspecs", podspecFiles);
} catch (error) {
    core.setFailed(error.message);
}
