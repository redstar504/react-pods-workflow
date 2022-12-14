# React Pods Workflow

A reusable workflow that verifies Podfile.lock is up to date with React Native node dependencies.

## The problem

Sometimes developers add (or modify the version) of node_modules included in a React Native project.

Many of these node_modules contain references to Cocoapods that are also required to be included with the project.

After running `npm install` and installing a new package, it's also important to navigate to the ios directory and run `pod install` as well.

Many developers forget this step, and as a result projects end up with mismatched Pod versions, or a lack of the pods at all.  This can lead to bugs and delays in deployment processes.

Enter the React Pods workflow.

## The solution

This workflow relies on a MacOS runner to setup your React native project along with all of it's depdenencies.

It leverages the `react-native config` command to determine all of the podspecs included in each node module that has iOS dependencies.

Once it has a list of these dependencies, it translates the podspec files to JSON for easy extraction of the Pod name and version using an included action.

Once we have the Pod names and versions required by all of the node modules, it searches through the Podfile.lock to make sure each Pod is installed along with the correct version.

## Results

If a specific Pod version is not found in the Podfile.lock, the workflow throws an error and lets the team know the Podfile.lock is out of sync.

It also lets you know which exact Pod has not been updated or installed.
To correct this issue, the developer can then navigate to the `ios` directory and run `pod install` as required.
Once this is completed the developer can commit the new Podfile.lock to the project and the workflow will run again, where it will succeed.

## Usage

Create a workflow in your `.github/workflows` directory and add the following code:

```
name: Confirm Pods are Synced (using reusable workflow)
on: [push]
jobs:
  call-other-workflow:
    uses: redstar504/react-pods-workflow/.github/workflows/workflow.yml@main
```

Refer to the [GitHub Workflow Guide](https://docs.github.com/en/actions/using-workflows) for more information.
