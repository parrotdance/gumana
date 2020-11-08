# gumana - Git Userinfo Manager

An CLI for those guys who works in different git identify. <del>Mostly for myself.</del>

# Install

```
npm i -g gumana
```

# Usage

```
$ gumana
It seems like this is the first time you run 'gumana'.
Your current git user is => parrot <parrot@example.com>
Please run 'gumana -a' to add another user preset,
then run 'gumana' again to select between them.

Or run 'gumana -h' to check available options.
```

```
$ gumana -a
Please input username: parrot2
Please input email: parrot2@example.com
New user has been added => parrot2 <parrot2@example.com>
```

```
$ gumana
Stored git user presets:
1) parrot <parrot@example.com> (current)
2) parrot2 <parrot2@example.com>

Please select user by index of preset (e.g. 1): 1
...
√ Git user has been set => parrot2 <parrot2@example.com>
```

### For more infomation, run `gumana -h` for help.
