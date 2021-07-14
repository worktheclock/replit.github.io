# Nix: Getting started with Nix

> Warning: Nix support on Replit is still under heavy development and is subject to change.

The best way to get started with Nix on Replit is to fork one of the existing templates:

* [Zig](https://replit.com/@ConnorBrewster/zig)
* [Node.js 16](https://replit.com/@ConnorBrewster/nodejs16)
* [Clojure](https://replit.com/@turbio/nixed-clojure)
* [C# Dotnet](https://replit.com/@turbio/dotnet)

Once you have forked one of the templates, there are 2 config files that you can use to customize the environment:

* `replit.nix` - Configures the Nix environment

This file should look something like the example below. The `deps` array specifies which Nix packages you would like to be available in your environment. You can search for Nix packages here: https://search.nixos.org/packages

```
{ pkgs }: {
	deps = [
    pkgs.zig
		pkgs.cowsay
	];
}
```

* `.replit` - Configures the run command

The run command in this file should look something like this. You can use any binary made available by your `replit.nix` file in this run command.

```
run = "cowsay Welcome to nix on Replit!"
```

Once both those files are configured and you add files for your language, you can run your repl with the run button.

Both the console and shell will pick up changes made to your `replit.nix` file. However, once you open the shell tab, the environment will not update until you run `exit`. This will close out the existing `shell` process and start a new one that includes any changes that you made to your `replit.nix` file.

## Learn More About Nix

If you'd like to learn more about Nix, here are some great resources:

* [Nix Pills](https://nixos.org/guides/nix-pills/) - Guided introduction to Nix
* [Nixology](https://www.youtube.com/playlist?list=PLRGI9KQ3_HP_OFRG6R-p4iFgMSK1t5BHs) - A series of videos introducing Nix in a practical way
* [Nix Package Manager Guide](https://nixos.org/manual/nix/stable/) - A comprehensive guide of the Nix Package Manager
* [A tour of Nix](https://nixcloud.io/tour) - Learn the Nix language itself
