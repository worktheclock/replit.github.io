# Embedding repls

In this guide we will go through how to embed a repl using an iframe, and the set of query parameters that can be used to render different previews of the same repl. You will also learn what happens if you want to edit an embedded repl.
Embedding a repl is useful if you want to integrate Replit into your app. Repls support the [OEmbed](https://oembed.com/) standard, such that in an app that supports this standard one can simply copy and paste any repl URL formatted as `https://replit.com/@username/repl-name` and a preview will be rendered.

![Oembed demo](/images/repls/embed/oembed-demo.gif)

## Embedding a Repl via `iframe`

To embed a repl via an iframe you can use the code snippet below:

```html
<iframe frameborder="0" width="100%" height="500px" src="REPL_URL?QUERY_PARAMETERS"></iframe>
```

Replace `REPL_URL` with the url of the repl you want to embed. `QUERY_PARAMETERS` specify how the repl will be rendered in the iframe.
Replit supports two query parameters on custom iframe tags which we will discuss below.

### Query parameter `?embed=true`

The query parameter `?embed=true` produces a preview of a repl which is more optimised for embeds with minimal number of control buttons displayed so as not to clutter the embed.

```html
<iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@ritza/demo-embed?embed=true"></iframe>
```

![Spotlight view](/images/repls/embed/embed-true.png)


### Query parameter `?lite=true`

The query parameter `?lite=true` produces a full preview of a repl in an embed with all the control buttons and panes displayed.

```html
<iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@ritza/demo-embed?lite=true"></iframe>
```

![Editor view](/images/repls/embed/lite-true.png)


## Embedding on WordPress

WordPress supports OEmbed but can only embed content from an approved whitelist of websites. Check out the [WordPress documentation](https://wordpress.org/support/article/embeds/#adding-support-for-an-oembed-enabled-site) for instructions to add Replit to the whitelist. Once Replit is added, a repl URL formatted as `https://replit.com/@username/repltitle` will automatically embed an interactive copy of the repl into your WordPress site.

## Embedding on Medium

To embed your repl on Medium, simply paste the repl link
`https://replit.com/@username/repl-name` into your Medium post and hit "Enter".

![Embedding on medium](/images/repls/embed/medium-embed.gif)

## Embedding on Ghost

To embed your repl on Ghost, simply paste the repl link `https://replit.com/@username/repl-name` into your Ghost post. The link should automatically be converted to an interactive IDE, where you can edit and run code.

![Ghost demo](/images/repls/embed/oembed-demo.gif)

## Editing an Embedded Repl

If anyone edits an embedded repl, a fork will be created so that they edit their own copy. If the user is logged into Replit in their browser, the forked repl will show up on their "My repls" dashboard. If the owner edits an embedded repl, those changes will be saved to the repl and become visible to others who view the embedded repl.
