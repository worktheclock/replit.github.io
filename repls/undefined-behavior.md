## How long will my repl keep running



## Is there a limit on how many repls i can run

## File System Persistence

Only file system changes while using the IDE will be persisted long term.

The filesystem while your repl is running in the background is only temporary. A repl which is not being actively edited in the IDE is in the background, this means web servers and repls open in inactive tabs. The filesystem will be reset any time your repl goes to sleep or is automatically migrated by our infrastructure. If you want to persist data in a background repl check out [our db thingy](idk where it is?)

## socket listening n stuff?

Only sockets not bound to a specific address will be hosted on Replit. Many libraries and frameworks default to localhost aka `127.0.0.1` which we will not automatically host for you. In order to make your server reachable from the public internet make sure you're listening on `0.0.0.0` or `INADDR_ANY`. You'll know your repl is reachable when the IDE automatically opens a web view for you.