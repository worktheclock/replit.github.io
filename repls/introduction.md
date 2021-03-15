# Introduction to Replit

Replit is a coding platform that lets you write code and host apps. It also has many education features built-in, making it great for teachers and learners too.

You can use Replit in different ways. It can replace some or all of your

* code editor (e.g. VS Code, Sublime Text, IntelliJ)
* development environment (e.g. your operating system, and build tools like npm or pip)
* cloud provider (e.g. AWS, Netlify)
* team collaboration tools (e.g. Google Docs, GitHub)
* teaching tools (e.g. Canva, Moodle, Blackboard)
* learning tools (e.g. Codecademy, Coursera, Udemy, Udacity)

Every repl you create is a fully functional development and production environment. "[Hosting from your editor](https://amasad.me/hosting)" makes it easy to iterate quickly on your work, collaborate with others, and get feedback.

We know that's a lot to take in, so we've broken done some of the key features below for [developers](#developers), [startups](#hosting), [teachers](#teachers) and [learners](#learners). Choose your own path, or go through all of them to become an expert in all things Replit.

<a name="developers"></a>
## Writing code: Replit for software developers

For software developers, Replit can be your cloud-based IDE. Having a cloud IDE brings several advantages. There's no set up - you can access your environment from any device, including your phone or tablet and everything will Just Work. You can manage things like dependencies, build scripts, and environment variables in a single place and always be in sync. It's also easy to get help from others - every repl is multiplayer by default, so you can work with other developers in a Google Docs like environemnt in real time from anywhere on the globe.

Each Replit is its own Docker container running in a VM, so you can run shell commands and do nearly anything else that is possible from a standard Linux box.

If you already know how to code and are interested in seeing how you can use Replit, go through the following pages.

#### [Introduction to the IDE](./tutorials/01-introduction-to-the-repl-it-ide)
A guide to how the IDE works. If you've used VS Code before, everything should feel familiar as
our editor alos uses [Monaco](https://microsoft.github.io/monaco-editor/).

#### [Working with Files](./tutorials/02-managing-files-using-repl-it)
Each repl has a built-in file system, so you can upload existing files or create new ones, manually or programatically.

#### [Storing Secrets](./repls/secret-keys)
You can easily add environment variables to keep others from viewing sensitive data such as API credentials.

#### [Configuring the run button](./repls/dot-replit)
In many cases, Replit will figure out how to run your project for you, but you can also customize exactly what you want to happen when you press the run button.

#### [Integrating with GitHub](./tutorials/06-github-and-run-button)
You can also link Replit to your GitHub to push changes up or bring in new changes that were made externally.

#### [Using history](./repls/history)
We also have time-travel features built-in so you can view previous versions of your code.

#### [Pair Programming](./tutorials/05-pair-programming-using-multiplayer-with-repl-it)
You can invite your friends or colleagues to help you with problems or hack on stuff together.

<a name="hosting"></a>
## Hosting code: Replit for startups and indiehackers
You can host anything from your basic personal website to a full web application for your startup on Replit. Any project you create can be deployed instantly to a temporary domain so you can share with friends or colleagues and get feedback, or permanently to an 'Always On' repl with a custom domain for a production environment.

We also offer a full KV-store database, built-in authentication, and templates for many common web frameworks like Django or Ruby on Rails so you can ship your MVP in days instead of months.

If you want to host your project on Replit, take a look at the following articles.

#### [Web hosting](./repls/web-hosting)
See how to host a front-end website for your homepage, landing page or portfolio

#### [Deploying HTTP servers](./repls/http-servers)
Deploy a full-blown web application written in nearly any backend language or framework.

#### [Always On Repls](./repls/always-on)
Keep your Replit alive 24/7

#### [The Replit database](./misc/database)
Store data persistently between Replit runs in a simple Key-Value store that feels like using a local dictionary or hashset.

<a name="teachers"></a>
## Teaching code: Replit for teachers
If you're a teacher or professor who spends significant time teaching coding in a class-room or one-on-one based environment, we have features to help you give feedback to students, set up and automatically grade homework assignments, and comply with your local privacy laws.

Take a look at the following

#### [Annotations and Feedback](./Teams/Annotations)
Leave comments on your students' code, or let them peer review each other, using in line discussion threads.

#### [Automatic testing and grading](./Teams/Testing)
Imagine if you had a robot to grade your students' homework? You can set up simple or advanced automated tests for your students' assignments and homework.

#### [Comply with local privacy regulations](./Teams/privacyFAQs)
We will help you keep your students and their work safe online, while complying with privacy laws such as GDPR, CCPA, and many others.

<a name="learners"></a>
## Learning code: Replit for students

If you're learning to code, whether as a self-taught programmer or as part of another course, you'll find our learning resources useful.

You can work through our [project-based tutorials](./tutorials/00-overview) to learn how to code, or download them all as [an ebook](https://codewithrepl.it).

If you're learning a specific language, we probably cover it in one our teacher-contributed [open curricula](./curriculum/Intro)

We also have a beginner-friendly [Discord server](https://replit.com/discord) where you can get (and give) help on nearly anything.
