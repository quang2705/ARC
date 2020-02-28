# Git Procedure
The Git Procedure for effective code management for the ARC verification system project.

# Getting Started
## Setting up Git branch
- Start by cloning the github repository with `git clone https://github.com/quang2705/ARC.git`
- Switch to the developement branch to for developing purpose `git checkout develop`
- Make sure that your local develop branch is upto date with the remote develop branch `git fetch origin`

## Developing
- From the `develop` branch, switch to `user-story-<nameofthefeature>` branch to start developing by using
 `git branch user-story-<nameofthefeature>`
 `git checkout user-story-<nameofthefeature>`
- After you finish develop
  - `git add` to add to stage 
  -  `git commit -m "<commit message>"` to add stage to commit 
  -  `git push -u origin user-story-<nameofthefeature>` (option for adding your local `user-story<nameofthefeature>` branch to remote)
- Bring your branch together with the `develop` branch
  - switch to develop `git checkout develop`
  - pull from develop `git fetch origin develop`
  - merge your feature branch with the `develop` branch `git merge --no-ff user-story-<nameofthefeature>`
  - delete the branch `git branch -d user-story-<nameofthefeature>`
  - push changes to `develop` `git push origin develop` 
- Repeat procedure for other features

## What to do when conflict, mistake happens
### Go back to the previous commit 
- get the list of all previous commit `git log` 
- change your repository to that commit `git checkout <commit hash>` (`<commit hash>` is an unique commit number for each commit, can be seen in the `git log`)

