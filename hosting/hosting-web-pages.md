# Hosting web pages

Web pages written in HTML, CSS, and JavaScript can be hosted on Replit. HTML/CSS/JS repls are given a unique URL that can be shared with your friends, family, peers, and clients.

After running a repl, your repl will be hosted at the URL provided in the `result` tab.

## URL Format

The repl will be hosted with the following URLs:
* `https://REPL-NAME--USERNAME.repl.co`
* `http://REPL-NAME.USERNAME.repl.co`

Where `REPL-NAME` is the name of the repl and `USERNAME` is the owner's username.

If you create a repl with a title that matches your username (i.e. repl.it/@username/username), it will be hosted at:
* `https://USERNAME.repl.co`


If an anonymous repl is created, the username used in the URL will be `five-nine`.

Note that if your username contains underscores `_`, they will be converted to dashes in the URL.

## Updating Websites

Changes made to your repl will not be reflected in the live version until the web project is re-run. Running a web repl will update its live version.

Note that a repl's public link will persist, even after the repl has been deleted. You can clear a repl of its server code before deleting it in order to prevent it from loading.

## Custom Domains

Part 1: Find your domain

Any hosted repl can be linked to a domain that you own. This includes both [static sites](#hosting-a-web-site) and [HTTP servers](/repls/http-servers). To get started, you'll need a domain to link with your repl. If you don't already have a domain, [Dotcomboom](https://replit.com/@dotcomboom) has created a [great tutorial on getting a free domain from Freenom](https://replit.com/talk/learn/How-to-use-a-custom-domain/8834). [CoolcoderSJ](https://replit.com/@CoolCoderSJ) also has a helpful [step-by-step tutuorial.](https://replit.com/talk/learn/Link-Domains-with-Replit/124838) on acuqiring your domain for free.

Part 2: Setting it up with Cloudflare

1. Next to your domain, click `Manage Domain`.

2. On the menu bar, click Management tools > Nameservers and select `Use default Nameservers.` Click `use custom nameservers` and pause.

3. In another tab, open Cloudflare. Either login or signup from the navigation bar. Once you're logged in, check the navbar top right for a link to add a domain. Click that link.

4. Enter your domain and click `Add site.` NOTE: It may take multiple tries and a lot of time before it works.

5. Once it actually loads, scroll down and select the free plan, unless you want to pay for cloudflare Pro.

6. Click `continue.` Wait for it to scan existing DNS records, it should find none.


Part 3: 
Option 1: Root and WWW

1. Click `Add record` (We will be doing these steps twice). From the dropdown, select `CNAME.`

2. Set the name of the record as `@.` This is the root domain, so for example, Google has these two CNAME records:`google.com`, and `www.google.com.` If you do not add a root record, you would have to add `www` in front of it every time. NOW PAUSE.

Go to the repl you are linking:

3. Click on the pencil icon next to the URL for your repl:

![screenshot of edit button](/images/repls/edit-custom-domain-icon.png)

4. Enter the full domain where you'd like the repl to be accessible from without the `www.` (Example - `replitiscool.tk`)


5. Click the `COPY` button. Now head back to cloudflare and enter the copied url into the target box. Click `Save,` then add another record. Select `CNAME` from the dropwdown, name the record as `www,` and paste the text into the target.

Part 3
Option 2: Subdomains

1. Go to the repl you are linking. Click the pencil icon next to the domain.

2. Enter the domain you are linking, including subdomain. (Example - `project.replitiscool.tk`). Click the `COPY` button.

3. Now head back to cloudflare and enter the copied url into the target box.
Click `Save.`

4. Click continue. It might give you some NAMESERVERS and tell you to update nameservers. IF that is the case, go back to [freenom,](https://my.freenom.com/clientarea.php?action=domains): manage domain > Management tools > nameservers.

5. Click `use custom nameservers,` then enter the nameservers cloudflare gave you. Click `save,` and click `continue` on cloudflare.

6.  On the top bar, click `SSL/TLS'. Choose `full.` It should be the second to last option.

7. Go back to Replit and click `next.` After some time, a LINK DOMAIN button should appear. Click it and you have successfully linked your domain.


*Edit: On your first try, you may get a `525 SSL Handshake` error. If you do, be patient, wait a bit, and reload. It takes a bit to update.*


*Note: Make sure the CNAME record is not proxied and is set to "DNS only" (the cloud icon should **not** be orange)*

It may take some time for the DNS record to be updated. Once connected, click the big green button to finish and your domain should be linked!


## Example

Here's an example of a hosted webpage using p5.js. The live, full-screen version can be found [here](https://p5-demo--timmy_i_chen.repl.co).

<iframe height="800px" width="100%" src="https://replit.com/@timmy_i_chen/p5-demo?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Takedown Requests

You can unlink your domain at any time by clicking on the pencil icon and clicking `unlink.`
