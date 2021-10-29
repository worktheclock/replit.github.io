# Nix: Getting started with Nix

Replit supports all programming languages through our integration with Nix. Our tutorial [Building with Nix on Replit](https://docs.replit.com/tutorials/30-build-with-nix) will give you a good understanding of Nix, the different configuration files and options available for your Nix repl, and some ideas for what can be built on Replit by leveraging the power of Nix.

To get started with Nix on Replit, you can fork one of the existing templates:

* [Zig](https://replit.com/@ConnorBrewster/zig)
* [Node.js 16](https://replit.com/@ConnorBrewster/nodejs16)
* [Clojure](https://replit.com/@turbio/nixed-clojure)
* [C# Dotnet](https://replit.com/@turbio/dotnet)

Once you have forked the template, there are 2 config files that you can use to customize the environment: 

* `replit.nix` - Configures the Nix environment
* `.replit` - Configures the run command

To edit these files and customize the environment, ensure that the repl's config files are showing: 

<img src="/images/tutorials/30-build-with-nix/show-config.png"
    alt="Show configuration"
    style="width: 350px !important;"/>

The first file we'll look at is `replit.nix`. This is the base Nix file that configures the Nix environment and tells our repl what packages to install.
It should look something like this:

```nix
{ pkgs }: {
	deps = [
        pkgs.zig
		pkgs.cowsay
	];
}
```

The `deps` array specifies which Nix packages you would like to be available in your environment. You can search for Nix packages here: https://search.nixos.org/packages

Replit supports replacing the `replit.nix` file with `shell.nix` or `default.nix`, with the order of priority being: `replit.nix` -> `shell.nix` -> `default.nix`.

The `shell.nix` file allows for greater customization of the shell environment than the `replit.nix` file.

The `default.nix` file will use `nix-env` to construct an environment where the derivation in `default.nix` is built and added to the shell.

Now let's take a look at the `.replit` file. This file defines what command will get executed when we click the "Run" button, and what custom environment variables will be available to our repl. The run command in this file should look something like the example below. You can use any binary made available by your `replit.nix` file in this run command.

```bash
run = "cowsay Welcome to nix on Replit!"
```

Once both these files are configured and you add files for your language, you can run your repl with the "Run" button.

Both the console and the shell will pick up changes made to your `replit.nix` file. However, once you open the shell tab, the environment will not update until you run `exit`. This will close out the existing `shell` process and start a new one that includes any changes that you made to your `replit.nix` file.

Replit supports configuring `nixpkgs` through files under `~/$REPL_SLUG/.config/nixpkgs`. The most common use of this is for `config.nix` files to enable `ALLOW_UNFREE` in order to use unfree packages, but any file created there that Nix can read will be processed.

## Learn more about Nix

If you'd like to learn more about Nix, here are some great resources:

* [Nix Pills](https://nixos.org/guides/nix-pills/) - A guided introduction to Nix
* [Nixology](https://www.youtube.com/playlist?list=PLRGI9KQ3_HP_OFRG6R-p4iFgMSK1t5BHs) - A series of videos introducing Nix in a practical way
* [Nix Package Manager Guide](https://nixos.org/manual/nix/stable/) - A comprehensive guide of the Nix Package Manager
* [A tour of Nix](https://nixcloud.io/tour) - Learn the Nix language itself
