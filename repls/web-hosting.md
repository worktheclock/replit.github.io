# Hosting sites and apps

You can use Repl.it to host your websites and web apps. These can be temporary (e.g. to get feedback from your team on a prototype) or "always-on" (e.g. served to your end users). You can host plain (front-end only) websites or full-blown web applications, written in Django, Rails, Express, or nearly any other backend language.

You can add your own domain (e.g. `https://yourname.com`) or use one of ours (e.g. `https://my-site.yourname.repl.co`). Hosting on Repl.it allows you to quickly deploy changes right after making them, and track history to roll back to previous versions if necessary.

We also provide our own custom database, a simple key-value store, so you can save data persistently even between app redeploys.

## Accessing your hosted repl from anywhere in the world

After you run certain types of projects or templates (e.g. HTML for a website or Django for a web application), you'll see a new window pop up in the editor along with a URL, from which you can access the hosted version of your repl anywhere in the world.

![](/images/repls/web-hosting/01-web-hosting-URL-location.png)

You won't see changes in the hosted 'live' version of your repl until you re-run the project (by first hitting stop and the green "Run" button), so you can make changes without breaking things for your users.

### Hosting web sites (front-end only)

Here's an example of a hosted webpage using p5.js. The live, full-screen version can be found [here](https://p5-demo--timmy_i_chen.repl.co).

<iframe height="800px" width="100%" src="https://repl.it/@timmy_i_chen/p5-demo?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Hosting web applications (back-end + front-end)

For deploying HTTP servers, we provide templates for Ruby on Rails, Django, Node (Express), React and many more but any framework can be used so long as the package can be imported or the port can be opened.

To deploy an HTTP server on Repl.it, simply write the code that imports the required libraries or frameworks and begin listening on a port.  As your server starts up, as soon as the repl begins listening on a port, a new pane should appear in your editor with the URL to your web app, along with a preview of the app.

### Understanding the repl lifecycle

Once deployed, your server will continue to run in the background, even after you close the browser tab. The server will stay awake and active until an hour after its last request, after which it will enter a sleeping stage. 
A sleeping repl will be woken up as soon as it receives another request; there is no need to re-run the repl. However, if you make changes to your server, you will need to restart the repl in order to see those changes reflected in the live version.

### Always on

If you don't want to wait for your repl to start after sending a request, you can enable Always-on to automatically start your repl when it goes to sleep. See our documentation for activating [Always-on repls](/repls/always-on).

### Dependencies

Our [package manager](https://github.com/replit/upm) will handle dependency files automatically in your repls.  See our documentation on [packages](/repls/packages) for more information on how to install and manage dependencies.

### Private keys

Private keys to external services or APIs can be kept in an `.env` file. See our documentation on [secret keys](/repls/secret-keys).

### Django and bash commands

If you are using Django and you need access to specific bash commands to configure the server, please see [this Django template](https://repl.it/@masfrost/Django-Boilerplate).

### Example HTTP Server

Below is an example of a simple HTTP server running Flask in python3, displaying HTML from `templates/index.html`. Feel free to fork and play with the code as you'd like. 

<iframe height="400px" width="100%" src="https://repl.it/@kodumbeats/flasktemplate?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## URL Format

The repl will be hosted with the following URLs:

* `https://REPL-NAME--USERNAME.repl.co`
* `http://REPL-NAME.USERNAME.repl.co`

Where `REPL-NAME` is the name of the repl and `USERNAME` is the owner's username.

If you create a repl with a title that matches your username (i.e. repl.it/@username/username) it will be hosted at: 

* `https://USERNAME.repl.co`

If an anonymous repl is created, the username used in the URL will be `five-nine`.

Note that if your username contains underscores (`_`), they will be converted to dashes (`-`) in the URL.

## Custom Domains

Any hosted repl can be linked to a domain that you own. This includes both [static sites](#hosting-a-website) and [HTTP servers](#http-servers). 

To get started, you'll need a domain to link with your repl. If you don't already have a domain, [Dotcomboom](https://repl.it/@dotcomboom) has created a great tutorial on getting a free domain from Freenom: [How to use a custom domain](https://repl.it/talk/learn/How-to-use-a-custom-domain/8834).

To start, click on the pencil icon next to the URL for your repl:

![screenshot of edit button](/images/repls/edit-custom-domain-icon.png)

Enter the full domain where you'd like the repl to be accessible from. This includes subdomains.

![screenshot of cname instructions](/images/repls/custom-domain-cname.png)

You will be prompted to add a `CNAME` record to your domain pointing at your repl's special `repl.co` domain. Go to your domain registrar and find the section that allows you to add DNS records.

Add a new entry with the following information:

- The type should be `CNAME`.

- `name` or `hostname` will be the subdomain you want, or you can enter `@` if you'd like to use the full domain. Some services do not allow `CNAME`s to be at the top level. We recommend instead using www and making sure you enter www.yourdomain.com in your repl.

- `data` or `target` should be the special repl.co link you got when you started linking your repl. It should contain a long string of random numbers and letters at the beginning.

For example:

- If I want to serve a repl from `example.com`, I'd enter `example.com` in the repl linking box then in my registrar the target should be `@`.

- If I want to serve a repl from `coolproject.example.com`, I'd enter `coolproject.example.com` in the repl linking box and `coolproject` in the target field on my registrar.

The exact steps will vary between services. Here's an example of how it might look, using Google Domains:

![screenshot of cname instructions](/images/repls/google-setup-custom-domain.png)

It may take some time for the DNS record to be updated. Once connected, click the big green button to finish and your domain should be linked!

You can unlink your domain at any time by clicking on the pencil icon and clicking "Unlink".

## Persistence and Takedown Requests

Note that a repl's public link will persist, even after the repl has been deleted. You can clear a repl of its server code before deleting it in order to prevent it from loading. If you require your web app to be taken down, please contact us at [contact@repl.it](mailto:contact@repl.it).
