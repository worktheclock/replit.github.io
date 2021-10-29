# Embedding repls

In this guide, we'll show you how to embed a repl on another platform using an `<iframe>`. We'll provide you with a set of query parameters you can use to render different previews of the same repl, and give you information on editing an embedded repl.

Repls support the [oEmbed](https://oembed.com/) standard, so you can embed a repl on any platform that supports this standard by pasting your repl URL formatted as `https://replit.com/@username/repl-name`, and a preview will be rendered.

![Oembed demo](/images/repls/embed/oembed-demo.gif)

## Embedding a repl using `<iframe>`

You can embed a repl using `<iframe>` with this code snippet:

```html
<iframe frameborder="0" width="100%" height="500px" src="REPL_URL?QUERY_PARAMETERS"></iframe>
```

Replace `REPL_URL` with the URL of the repl you want to embed. You can use `QUERY_PARAMETERS` to specify how the repl will be rendered.

Replit supports two query parameters on custom `<iframe>` tags: `?embed=true` and `?lite=true`.

### Query parameter `?embed=true`

The query parameter `?embed=true` produces a preview of the repl that is optimised for embeds with a minimal number of control buttons displayed for a less cluttered view:

```html
<iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@ritza/demo-embed?embed=true"></iframe>
```

![Spotlight view](/images/repls/embed/embed-true.png)


### Query parameter `?lite=true`

The query parameter `?lite=true` produces a full preview of a repl in an embed, with all the control buttons and panes displayed:

```html
<iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@ritza/demo-embed?lite=true"></iframe>
```

![Editor view](/images/repls/embed/lite-true.png)


## Embedding on WordPress

WordPress supports oEmbed, but will only embed content from an approved whitelist of websites. Check out the [WordPress documentation](https://wordpress.org/support/article/embeds/#adding-support-for-an-oembed-enabled-site) for instructions on adding Replit to the whitelist. Once Replit is added, a repl URL formatted as `https://replit.com/@username/repl-name` will automatically embed an interactive copy of the repl in your WordPress site.

## Embedding on Medium

To embed your repl on Medium, paste the repl link `https://replit.com/@username/repl-name` into your Medium post and hit "Enter".

![Embedding on medium](/images/repls/embed/medium-embed.gif)

## Embedding on Ghost

To embed your repl on Ghost, paste the repl link `https://replit.com/@username/repl-name` into your Ghost post. The link will automatically be converted to an interactive IDE, where you can edit and run code.

![Ghost demo](/images/repls/embed/oembed-demo.gif)

## Editing an embedded repl

If anyone edits an embedded repl, a fork will be created so that they edit their own copy. If the user is logged in to Replit in their browser, the forked repl will show up on their "My repls" dashboard.

If the owner of an embedded repl edits it, those changes will be saved to the repl and become visible to others who view the embedded repl.
