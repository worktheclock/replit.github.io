// ***********************************
// * Open README.md for instructions *
// ***********************************

const express = require('express');
const marked = require('marked');
const fs = require('fs').promises;
const path = require('path');

require('ejs');

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value;
  },
});

const app = express();

const getTree = async () =>
	JSON.parse((await fs.readFile('./sidebar.json', 'utf8')));

const render = async (res, category, slug) => {
  res.set('Cache-Control', 'public, max-age=600, stale-if-error=60, stale-while-revalidate=60')
	res.locals.rendered = await renderMarkdown(
		path.join(__dirname, category, slug) + '.md',
	);
	const t = await getTree();
	res.locals.sidebar = t;
	res.locals.active = category + '/' + slug;

	const cobj = t.find(c => c.slug === category);
	const dobj = cobj? cobj.contents.find(d => d.slug === slug) : {"name": slug}

  if (category === 'repls' && slug === 'intro') {
    // landing page gets a short title for search engine visibility
    res.locals.title = 'Replit Docs';
  } else {
	  res.locals.title = `Replit Docs - ${ dobj? dobj.name : slug }`;
  }
	res.render('index.ejs');
}

app.use((req, res, next) => {
	console.log(req.method, req.path)
	return next()
})

app.get('/', (req, res) => {
	render(res, 'getting-started', 'intro-replit');
});

app.use(express.static('static'))

const renderMarkdown = async (path) => {
	const raw = await fs.readFile(path, 'utf8')
	return marked(raw);
}

app.get('/misc/General-FAQ', async (req, res) => {
    res.redirect(301, '/getting-started/faq');
});
app.get('/repls/intro', async (req, res) => {
    res.redirect(301, '/getting-started/intro-replit');
});
app.get('/repls/dashboard', async (req, res) => {
    res.redirect(301, '/getting-started/managing-repls');
});
app.get('/repls/files', async (req, res) => {
    res.redirect(301, '/getting-started/creating-files');
});
app.get('/misc/free-features', async (req, res) => {
    res.redirect(301, '/getting-started/using-replit-free');
});
app.get('/repls/repl-auth', async (req, res) => {
    res.redirect(301, '/hosting/authenticating-users-repl-auth');
});
app.get('/repls/vnc', async (req, res) => {
    res.redirect(301, '/hosting/streaming-native-graphics-vnc');
});
app.get('/repls/apps-and-publishing', async (req, res) => {
    res.redirect(301, '/hosting/browsing-publishing-repls');
});
app.get('/repls/strike-system-apps', async (req, res) => {
    res.redirect(301, '/hosting/strike-system-faq');
});
app.get('/misc/database', async (req, res) => {
    res.redirect(301, '/hosting/database-faq');
});
app.get('/repls/web-hosting', async (req, res) => {
    res.redirect(301, '/hosting/hosting-web-pages');
});
app.get('/repls/http-servers', async (req, res) => {
    res.redirect(301, '/hosting/deploying-http-servers');
});
app.get('/repls/embed', async (req, res) => {
    res.redirect(301, '/hosting/embedding-repls');
});
app.get('/repls/always-on', async (req, res) => {
    res.redirect(301, '/hosting/enabling-always-on');
});
app.get('/misc/security', async (req, res) => {
    res.redirect(301, '/legal-and-security-info/security');
});
app.get('/misc/licensing', async (req, res) => {
    res.redirect(301, '/legal-and-security-info/licensing-info');
});
app.get('/misc/copyright', async (req, res) => {
    res.redirect(301, '/legal-and-security-info/copyright-claims-takedown-requests');
});
app.get('/repls/audio', async (req, res) => {
    res.redirect(301, '/misc/playing-audio-replit');
});
app.get('/misc/basic', async (req, res) => {
    res.redirect(301, '/misc/classic-basic-replit');
});
app.get('/misc/clui', async (req, res) => {
    res.redirect(301, '/misc/clui-graphical-cli');
});
app.get('/repls/nix', async (req, res) => {
    res.redirect(301, '/programming-ide/getting-started-nix');
});
app.get('/repls/history', async (req, res) => {
    res.redirect(301, '/programming-ide/using-repl-history');
});
app.get('/repls/packages', async (req, res) => {
    res.redirect(301, '/programming-ide/installing-packages');
});
app.get('/repls/secrets-environment-variables', async (req, res) => {
    res.redirect(301, '/programming-ide/storing-sensitive-information-environment-variables');
});
app.get('/repls/editor', async (req, res) => {
    res.redirect(301, '/programming-ide/working-shortcuts');
});
app.get('/repls/repl-from-repo', async (req, res) => {
    res.redirect(301, '/programming-ide/running-github-repositories-replit');
});
app.get('/misc/repl-environment-variables', async (req, res) => {
    res.redirect(301, '/programming-ide/getting-repl-metadata');
});
app.get('/repls/dot-replit', async (req, res) => {
    res.redirect(301, '/programming-ide/configuring-run-button');
});
app.get('/misc/change-username', async (req, res) => {
    res.redirect(301, '/settings/changing-username');
});
app.get('/misc/favorite-languages', async (req, res) => {
    res.redirect(301, '/settings/selecting-favorite-languages');
});
app.get('/curriculum/Intro', async (req, res) => {
    res.redirect(301, '/teaching-curriculum/intro-teaching-curriculum');
});
app.get('/curriculum/introJava', async (req, res) => {
    res.redirect(301, '/teaching-curriculum/intro-java');
});
app.get('/curriculum/introPython', async (req, res) => {
    res.redirect(301, '/teaching-curriculum/intro-python');
});
app.get('/curriculum/intermediatePython', async (req, res) => {
    res.redirect(301, '/teaching-curriculum/intermediate-python');
});
app.get('/curriculum/introHTMLCSS', async (req, res) => {
    res.redirect(301, '/teaching-curriculum/intro-html-css');
});
app.get('/curriculum/introSQL', async (req, res) => {
    res.redirect(301, '/teaching-curriculum/intro-sql');
});
app.get('/curriculum/abstractData', async (req, res) => {
    res.redirect(301, '/teaching-curriculum/abstract-data-types');
});
app.get('/curriculum/introCpp', async (req, res) => {
    res.redirect(301, '/teaching-curriculum/intro-cpp');
});
app.get('/repls/UnitTesting', async (req, res) => {
    res.redirect(301, '/teams-edu/unit-testing');
});
app.get('/repls/multiplayer-anon', async (req, res) => {
    res.redirect(301, '/teams-edu/using-multiplayer-anonymous-users');
});
app.get('/Teams/Invitations', async (req, res) => {
    res.redirect(301, '/teams-edu/inviting-teachers-students');
});
app.get('/Teams/Nicknames', async (req, res) => {
    res.redirect(301, '/teams-edu/assigning-nicknames');
});
app.get('/Teams/Roles', async (req, res) => {
    res.redirect(301, '/teams-edu/assigning-user-roles');
});
app.get('/Teams/Projects', async (req, res) => {
    res.redirect(301, '/teams-edu/creating-projects-assignments');
});
app.get('/Teams/projectCopying', async (req, res) => {
    res.redirect(301, '/teams-edu/copying-projects-other-teams');
});
app.get('/Teams/Notes', async (req, res) => {
    res.redirect(301, '/teams-edu/keeping-notes-repls');
});
app.get('/Teams/HomeworkAssignments', async (req, res) => {
    res.redirect(301, '/teams-edu/example-homework-assignments');
});
app.get('/Teams/Annotations', async (req, res) => {
    res.redirect(301, '/teams-edu/reviewing-submissions');
});
app.get('/Teams/Testing', async (req, res) => {
    res.redirect(301, '/teams-edu/testing-assessments-autograding');
});
app.get('/Teams/InputOutput', async (req, res) => {
    res.redirect(301, '/teams-edu/input-output-testing');
});
app.get('/Teams/EmbedProjects', async (req, res) => {
    res.redirect(301, '/teams-edu/embedding-projects');
});
app.get('/Teams/privacyFAQs', async (req, res) => {
    res.redirect(301, '/teams-edu/privacy-faq');
});
app.get('/Teams/IT_Toolkit', async (req, res) => {
    res.redirect(301, '/teams-edu/it-administrators-toolkit');
});
app.get('/Teams/US_Student_DPA', async (req, res) => {
    res.redirect(301, '/teams-edu/us-student-dpa');
});
app.get('/pro/intro', async (req, res) => {
    res.redirect(301, '/teams-pro/intro-teams-pro');
});
app.get('/pro/teamManagement', async (req, res) => {
    res.redirect(301, '/teams-pro/managing-teams');
});
app.get('/pro/replManagement', async (req, res) => {
    res.redirect(301, '/teams-pro/managing-public-private-repls');
});
app.get('/teams-pro/interviewing-candidates-guest-mode', async (req, res) => {
    res.redirect(301, '/teams-pro/interviewing-candidates');
});
app.get('/pro/guests', async (req, res) => {
    res.redirect(301, '/teams-pro/interviewing-candidates');
});
app.get('/repls/python-plots', async (req, res) => {
    res.redirect(301, '/tutorials/creating-interactive-python-plots-matplotlib');
});
app.get('/tutorials/PinboardProjectPart1', async (req, res) => {
    res.redirect(301, '/tutorials/pinboard-project-part-1');
});
app.get('/tutorials/PinboardProjectPart2', async (req, res) => {
    res.redirect(301, '/tutorials/pinboard-project-part-2');
});
app.get('/tutorials/spotify-tutorials', async (req, res) => {
    res.redirect(301, '/tutorials/spotify-api-tutorials');
});
app.get('/tutorials/kaboom', async (req, res) => {
    res.redirect(301, '/tutorials/kaboom-editor');
});
app.get('/repls/secret-keys', async (req, res) => {
    res.redirect(301, '/archive/secret-keys');
});
app.get('/classrooms/exports', async (req, res) => {
    res.redirect(301, '/archive/exports');
});
app.get('/repls/quick-start', async (req, res) => {
    res.redirect(301, '/archive/quick-start');
});
app.get('/misc/quick-start', async (req, res) => {
    res.redirect(301, '/archive/quick-start');
});
app.get('/programming-ide/configuring-run-button', async (req, res) => {
    res.redirect(301, '/programming-ide/configuring-repl');
});

app.get('/teams/it-administrators-toolkit', async (req, res) => {
	res.redirect(301, '/teams-edu/it-administrators-toolkit');
});

app.get('/:category/:slug', async (req, res) => {
	const { category, slug } = req.params;
	render(res, category, slug)
		.catch(err => {
			res.send(404, `
              <h1>Something went wrong!</h1 >
              <p>maybe you can <a href="https://replit.com/@util/replit-docs">help fix it</a></p>
            `);
		});
});



app.listen(3000, () => {
	console.log('docs are running');
});
