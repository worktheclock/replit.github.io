# Configuring the run button

A file named `.replit` can be added to any repl in order to customize the behavior of the run button. Written in [toml](https://github.com/toml-lang/toml), a `.replit` file looks something like:

```toml
run = "<run command here>"
language = "<repl language>" # optional
```

`run` is a string which will be executed in the shell whenever you hit run. The `language` helps the IDE understand how to provide features like [packaging](https://blog.repl.it/upm) and [code intelligence](https://blog.repl.it/intel), this is normally configured for you when you clone from a git repository.

Here is an example of a repl using `.replit` to print "hello world" instead of running the code:

<iframe width="100%" src="https://repl.it/@turbio/dotreplit-example?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Configuring a cloned repl

When you clone a repository without a `.replit` file, we automatically show the visual `.replit` editor:

![visual config editor](https://docs.repl.it/images/config_plugin.png)

This will automatically create the `.replit` file and make it possible to customize how the repl will run. You can use the shell to run any command and then set the run button once you've decided what it should do. Clicking done will finalize the repl's configuration closing the visual editor. It's always possible to make changes later by visiting the `.replit` file from the file tree. Adding `.replit` to a repository makes cloning fast with no configuration necessary. 

# Other configuration
the `.replit` file can also provide other configuration hints. The full specification is provided below:
- `run`: This command the is executed when the run button is clicked
- `language`: What language is loaded in the prompt when your repl starts up. You'll have to restart you repl to see this change.
- `onBoot`: This command is executed once when the repl first boots up.
- `packager`:
- `afterInstall`
- `ignoredPaths`
- `ignoredPackages`

## Example .replit file

```toml
run="python main.py"
language="python3"
onBoot="echo Booting up!"

[packager]
afterInstall="date >> package_install_log"
ignoredPaths=[".git"]
ignoredPackages=["twitter", "
```