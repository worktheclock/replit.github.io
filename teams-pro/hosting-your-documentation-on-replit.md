# How to write and host your technical documentation using Replit

In this guide, you'll learn how to build a professional technical documentation site. You'll write your docs as simple Markdown files, and use MkDocs as a static site generator to create fast-loading HTML pages.

By using Replit as an IDE and web server, you can keep your documentation publishing process very agile, and have changes reflect in production as you make them. We'll also look at how to scale this better, by using multiple repls for staging and production versions of your docs, and tracking everything using version control with Git and GitHub.

By the end of this guide, you'll have a bare-bones documentation site set up, and you can simply start adding content.

![final website](/images/teamsPro/hosting-docs/final-website.png)

## Steps to follow

We'll cover how to:

* Create the repl
* Install the MkDocs library
* Add pages to our documentation site
* View the HTML version of our docs
* Add our docs under version control
* Pull changes made from GitHub
* Set up a custom domain
* Scale the docs site using multiple repls and Cloudflare

## Creating a repl

MkDocs is a Python library, so we'll use a Python repl. We'll be using [Teams Pro](https://replit.com/site/teams-pro), so sign up for it if you haven't already. You can follow most of the steps using the free Replit Starter plan, but some functionality will be limited.

Visit [https://repl.new/python](https://repl.new/python) to create a new repl, and choose your Team account as the owner of the repl.

![create repl](/images/teamsPro/hosting-docs/create-repl.png) 

You'll be directed to the Replit workspace where you can edit your project.

## Installing MkDocs 

Next, we'll set up up the environment for our project.

Open your shell and run the following command:

```bash
python3 -m poetry init --no-interaction
```

This will create a Poetry file to track our Python dependencies.

Install Material for MkDocs by running the following:

```bash
python3 -m poetry add mkdocs-material
```

To bootstrap the creation of a new docs site, run the following command:


```bash
mkdocs new .
```

This creates an `mkdocs.yml` file, which is our configuration file, and a `docs` folder containing an `index.md` file. This `index.md` file will have the content for our new homepage.

Open the `mkdocs.yml` file and replace the contents with the following, replacing `My Docs` with the name of your docs site:

```yaml
site_name: My Docs
theme:
  name: material
```

This sets up the name and theme of your docs site.

To preview the new documentation site, run the following command in the shell:

```bash
mkdocs serve -a 0.0.0.0:443
```

This starts the MkDocs development server, and Replit will pop open a browser preview window. It should look something like this:

![website](/images/teamsPro/hosting-docs/doc-website.png)

The public URL of your docs is displayed just above the preview.

## Adding pages

You probably want more than a single page for your docs. To add new pages to your documentation, you can add new Markdown files to the `docs` folder, and reference them in the `mkdocs.yml` file. 

As an example, create a new file in your `docs` folder named `about.md`. 

Now add the following to the `mkdocs.yml` file.

```yaml
nav:
    - Home: index.md
    - About: about.md
```
 
This will add the new page to the website's navigation bar.

<img src="/images/teamsPro/hosting-docs/new-page.gif"
alt="new page"
style="Width: 60% !important;"/>


You can repeat this process to add more pages to your website - create a new Markdown file in the `docs` folder and reference it in the `mkdocs.yml` configuration file.

## Keeping your repl alive and adding a boost

Normal repls turn off after some period of inactivity. To make it easier to run and ensure it stays live, create a file called `.replit` in the root of the project and add the following line to it:

```
run="mkdocs serve -a 0.0.0.0:443"
```

Now the docs will be served whenever you hit the big green "Run" button. 

Next, click on the name of your repl and turn on "Always On" and "Add Boost". This will mean users can always visit your site and it won't get turned off. The boost will give you some extra processing power, which will make it faster to build your site once you have a lot of Markdown files.

<img src="/images/teamsPro/hosting-docs/boost.png"
alt="boost repl"
style="Width: 60% !important;"/>


## Adding version control

You can track changes and updates to your documentation with version control. Replit integrates with GitHub, and you can set this up directly from within your repl.

Navigate to the "Version control" tab on the left-hand side of your project workspace and click on "Create a Git Repo".

<img src="/images/teamsPro/hosting-docs/create-repo.png"
alt="create a repo"
style="Width: 50% !important;"/>


This will initiate a repository with the current version of your project. Cick on "Connect to GitHub" to connect to your GitHub account. If you haven't already linked your GitHub account, you will be prompted to authorize Replit to access your GitHub account. 

<img src="/images/teamsPro/hosting-docs/connect-github.png"
alt="connect to GitHub"
style="Width: 50% !important;"/>

From the popup window, choose the name of your repository and create it.

<img src="/images/teamsPro/hosting-docs/create-git-repo.png"
alt="create git repo"
style="Width: 70% !important;"/>


This will automatically upload the contents of the entire site's documentation to your repository on GitHub. Any time you make a change from Replit, you can commit and push the changes to GitHub to ensure that nothing gets lost and you have a log of all changes made to the docs.

## Pull changes from GitHub

People may also contribute to your docs by making pull requests to your GitHub repository. If it is public or accessible to specific people, the changes they make to the repository can be pulled back into your project on Replit.

Navigate to the "Version control" tab and check if your project is up to date with your working branch. If your project is not up to date, it will mean that several commits have been made to the GitHub repository that you have not yet pulled.

To add those changes, click on the pull button which will update your project.

<img src="/images/teamsPro/hosting-docs/replit-pr.png"
alt="pull changes"
style="Width: 60% !important;"/>


Once your changes have been pulled from GitHub, your project will be up to date with the Github repository. You may have to stop and start the repl to see the changes reflect live.


## Set up a custom domain

For a more professional docs site, you'll probably want to run it on your own domain, such as `docs.example.com`. You can add a custom domain by clicking the pencil icon on the right of the domain that Replit assigned to your site, and setting up your DNS settings as prompted. You can find more detailed instructions in our guide to [Hosting web pages](https://docs.replit.com/hosting/hosting-web-pages#custom-domains)

<img src="/images/teamsPro/hosting-docs/domain.png"
alt="custom domain"
style="Width: 70% !important;"/>

## Scaling your docs platform

We've shown you how to get started with hosting your docs on Replit, but you'll likely have to tweak this to meet your needs. We're still using the development server that is built into MkDocs, but this is not suitable for production use. 

The easiest way to handle more traffic is to add Cloudflare. Cloudflare's [free version](https://www.cloudflare.com/en-gb/plans/free/) should be fine for most use cases. Cloudflare will cache a version of your website and serve most of your users directly, taking the pressure off your repl.

You could also set up two separate repls: a Python repl, as we did in this guide, for the development version of your docs, and an optimized, static version. Use the command `mkdocs build` to build your static docs site, and transfer the `site` folder generated by this command to an [HTML repl](https://docs.replit.com/hosting/hosting-web-pages), which you can use as the production version of your docs site.

## Where next?

[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/reference/) has many customizations, such as tags, add-ons, integration with analytics, and much more.

The [Replit docs](https://docs.replit.com) are built and hosted completely on Replit itself, so if you want help with anything or have any feedback, just email us at pro@replit.com.

<iframe height="400px" width="100%" src="https://replit.com/@ritza/docs-site?embed=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>



