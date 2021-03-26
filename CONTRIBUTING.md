# Contributing to Fullbazel

**Table Of Contents**

[Contributing Code](#contributing-code)

[Reporting an Issue](#reporting-an-issue)

[Requesting a Feature](#requesting-a-feature)

[Asking a Question](#asking-a-question)

# Contributing Code

## Requirements

Your developer environment should be **Ubuntu 20.04.1 LTS** (Focal Fossa). And we highly recommend to use **Visual Studio Code** as your editor.

Other operating systems or Linux distributions are not tested and might not work!

## Workflow

To integrate new code we use the "Git Rebase Workflow" in order to maintain a linear Git history and prevent branch-merging hell.

Just follow the 5 steps below:

### 1. Setup

Make sure your Git is configured properly

```
git config --global core.editor "code --wait"
git config --global user.name "username"
git config --global user.email "email@example.com"
```

Preferably follow [this](https://docs.github.com/en/github/authenticating-to-github/about-commit-signature-verification#gpg-commit-signature-verification) signature verification guide and then run:

```
git config --global user.signingKey <YOUR_KEY>
git config --global commit.gpgSign true
```

Fork and clone the repository

- Head to https://github.com/drakery3d/fullbazel and click "Fork" on the top right
- Then clone the **forked** repository by running:
  ```
  git clone https://github.com/<your-username>/fullbazel
  cd fullbazel
  git remote add upstream https://github.com/drakery3d/fullbazel
  ```

### 2. Start a new feature

```
git pull origin upstream/master
git checkout -b my-feature
```

### 3. Make commits

```
git commit -m "feat: implemented xyz"
git commit -m "refactor: improved abc"
```

### 3. Integrate Code

```
git fetch upstream
git checkout my-feature
git rebase --interactive upstream/master
```

You might need to solve some conflicts when rebasing:

```
# solve conflicting files
git add .
git rebase --continue
```

### 4. Create a Pull Request

```
git push -u origin my-feature
```

In the GitHub user interface, create a pull request to merge `my-feature` into `drakery3d/fullbazel/master`

### 5. Make Changes

Often, you want to do some changes to the open pull request. Here is how you can dot that:

```
git checkout my-feature
git commit -m "fix: xyz solved"
```

### 6. Admin will do this

```
git fetch origin pull/<pr-id>/head:my-feature
git checkout my-feature
# check if everything works fine
git checkout master
git rebase my-feature
git push
git push origin -d my-feature
```

# Reporting an Issue

https://github.com/drakery3d/fullbazel/issues

# Requesting a Feature

https://github.com/drakery3d/fullbazel/issues

# Asking a Question

https://github.com/drakery3d/fullbazel/discussions
