# **Replit Database**

##### **Where can I find my database?**

 When you create a new repl if you look to the left you will see a floppy disk icon in the menu bar. That’s Repl.it’s new key-value database, built into your repl!
 
##### **How can I access my databse?**

To access the database, you can execute very, very simple curl commands or use a library.

Some replers have already made libraries to interact with the database such as:
- [replitdb](https://pypi.org/project/replitdb/) for Python
- [replitdb-client](https://www.npmjs.com/package/replitdb-client) for Node.js

Repl.it provides an [official client for Go](https://github.com/replit/database-go).

##### **How do I set up my database?**

When you click on the floppy disk it should provide you with the some instructions. They will be summarized here as well:

1. You can set a key value pair by using the below curl command:

```
curl $REPLIT_DB_URL -d '<key>=<value>'
```

2. You can find a key's value:
```
curl $REPLIT_DB_URL/<key>
```

3. You can delete a key:
```
curl -XDELETE $REPLIT_DB_URL/<key>
```

4. You can list the keys:
```
curl $REPLIT_DB_URL --get -d 'prefix=<key> or curl "$REPLIT_DB_URL?prefix=<key>"
```

##### **What is REPLIT_DB_URL?**

This is the environment variable we have created with your repl. It is the key that will allow you to access your database.

The clients listed above take care of using `REPLIT_DB_URL` for you. But if you want to write your own client or use Database from a language that doesn't yet have a client, here are two examples:

Python:

```
import os
print(os.getenv("REPLIT_DB_URL"))
```

JS:
```
console.log(process.env.REPLIT_DB_URL)
```

`REPLIT_DB_URL` provides full access to your database. Therefore, you should take care not to expose it to the world or share it with people you don't trust.

The value of `REPLIT_DB_URL` changes from time to time, so we recommend that you not copy it elsewhere. Subsequent reads by the same process will see the same value. We will restart your repl if we need to change it after it has been read.

##### **What limits does Database have?**

The limits are currently:
- 50 MB per database (sum of keys and values)
- 5,000 keys per database
- 100 bytes per key
- 5 MB per value

There are rate limits that apply to all operations. You will receive an HTTP 429 if you exceed them. We recommend implementing an exponential backoff and retry to handle this case.