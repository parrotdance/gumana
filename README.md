# gumana - Git Userinfo Manager (WIP)

An CLI for those guys who works in different git identify. <del>Mostly for myself.</del>

# Install

```
npm i -g gumana
```

# Usage

```bash
$ gumana
Thanks for using gumana.
We use config file at: ~, but we can not find it.
Would you like to create this config file automaticly? (y/n) y
...
√ Done. Now gumana is ready to go.

Next:

  Please run 'gumana -a' to add a new git user preset.
  Then, run 'gumana' again to switch git user.
  For more infomation, run 'gumana -h'
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
