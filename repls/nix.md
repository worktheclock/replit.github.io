# Getting Started With Nix

> Warning: Nix support on Replit is still under heavy development and is subject to change.

The best way to get started with Nix on Replit is to fork one of the existing templates:

* [Zig](https://replit.com/@ConnorBrewster/zig)
* [Node.js 16](https://replit.com/@ConnorBrewster/nodejs16)
* [Clojure](https://replit.com/@turbio/nixed-clojure)
* [C# Dotnet](https://replit.com/@turbio/dotnet)

Once you have forked one of the templates, there are 2 config files that you can use to customize the environment:

* `.replit` - Configures the run command

The run command in this file should look something like this. The important part is filling out the `command` argument. In the future, the `nix-shell` portion will not be needed.

```
run = "nix-shell /opt/nixproxy.nix --argstr repldir $PWD --command '<insert run command here>'"
```

* `replit.nix` - Configures the nix environment

This file should look something like the example below. The `deps` array specifies which Nix packages you would like to be available in your environment. You can search for Nix packages here: https://search.nixos.org/packages

```
{ pkgs }: {
	deps = [
    pkgs.zig
		pkgs.cowsay
	];
}
```

Once both those files are configured and you add files for your language, you can run you repl like normal, with the run button.

## Learn More About Nix

If you'd like to learn more about Nix, here are some great resources:

* [Nix Pills](https://nixos.org/guides/nix-pills/)
* [Nixology](https://www.youtube.com/playlist?list=PLRGI9KQ3_HP_OFRG6R-p4iFgMSK1t5BHs)
* [Nix Package Manager Guide](https://nixos.org/manual/nix/stable/)
