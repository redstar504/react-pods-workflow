module.exports = function extractPodspecs(config) {
    const deps = config.dependencies;
    let podSpecs = [];

    for (const dep in deps) {
        if (deps[dep].platforms && deps[dep].platforms.ios && deps[dep].platforms.ios.podspecPath) {
            podSpecs = [...podSpecs, deps[dep].platforms.ios.podspecPath];
        }
    }

    return podSpecs;
}
