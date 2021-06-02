# IT Administrators Toolkit

If you are new to Teams for Education, this page will help ensure Replit runs smoothly for you and your team. You may want to send this page to your technology team or IT department.

Read more about [our commitment to user safety](https://docs.google.com/document/d/1rGjlPhRIFDYVkLkP_nO0Db6o1_9EmGvSnLt9cHacE5M/edit).

## URLs

To make sure Replit works for you and your students on your school network, you need to ensure the following domains are whitelisted/unblocked:
- `*.replit.com` (primary domain)
- `*.repl.co` (where web applications built on Replit are hosted)
- `*.repl.it` (old domain, not actively used)
- `*.replitusercontent.com` (old domain, not actively used)

Clients must be able to access all subdomains of the above domains. The specific hosts that clients communicate with under the above names are subject to change without notice.

Even if you are on `replit.com` (e.g. on a Spotlight page), if you are viewing a web application built on Replit, the code will be delivered via `repl.co`.

Blocking `repl.co` will prevent web applications from running on Replit, but still allow coding (e.g. in Java, Python, and many other languages) on Replit. Blocking web applications breaks the experience for students learning HTML/CSS/Javascript and frameworks like NodeJS, Flask, etc.

Blocking the following IPs will also prevent web applications and the use of VNC on Replit, including those using custom domains that are not under `repl.co`:
- proxy.global.replit.com: 35.186.245.55
- proxy.hacker.replit.com: 34.120.194.28
- proxy.teams.replit.com: 34.120.57.62
- 35.241.26.246

## Protocols

The Replit application is delivered over the following protocols:
- HTTPS (for all web pages)
- WebSocket over HTTPS
- VNC (for running graphical applications in a browser)

## Whitelist/Network Security Vendor Guides

Please refer to these guides to get Replit working under your whitelist/network security vendor:
- [Lightspeed Systems](https://help.lightspeedsystems.com/s/article/Repl-it-Domains?language=en_US)
 (setup support available via chat on [help.lightspeedsystems.com](http://help.lightspeedsystems.com/)
- (more to come)

## Data Retention and Usage

Please refer to our [Privacy FAQs](https://docs.repl.it/Teams/privacyFAQs) and [US Student Data Protection Addendum](https://docs.repl.it/Teams/US_Student_DPA) for more details.