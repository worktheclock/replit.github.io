# How to Create a Curriculum with Replit

Teams for Education is a collaborative platform where teachers can create assignments for their students. 

Teams for Education uses terms such as "assignment", "lesson", "project" and "curriculum". A "project" is the work that students need to complete and submit for review. This project work can also be defined as an "assignment". A "lesson" describes what students need to learn for a particular assignment. The term "curriculum" is used to describe the overall content and can consist of lessons on different units or different assignments that students can complete. 

In this tutorial, we're going to cover how to create a curriculum.

## Steps to follow:

We'll cover how to:

- Create a new curriculum
- Add lesson contents
- Perform input output testing
- Publish project

### Step 1 - Creating a new curriculum

To create a new curriculum with Replit, you need to make sure that you're the admin in your team. 

If you navigate to your Teams page, you should see the following below the team's name:

![create project](Create_project_button.png)

Go ahead and click on the 'Create Project' button.

You'll be prompted to select the template language you'll be working with and the name of your project. You can descibe the type of project you have created and this project can be an assignment students have to submit or a lesson with notes or both. If it's an assignment that you want the students to submit, you can specify a due date for submission. You can also specify which unit the project covers. To learn more about organizing projects into units, click [here](https://replit.com/team/ritzaTeam). 

Click the 'Create' button at the bottom.

![name project](Create-project.png)

### Step 2 - Add lesson contents

Once you've created your project you'll be taken to a new window where you can add content for your lesson. 

![add contents](add-contents.png)

In the Files tab, the `main.py` file is where students can write submissions or complete different tasks. Any other files added in this section will be visible to the students so you can also place additional notes in this section.

The section labelled 'Lesson' will consist of all files accesible by the teachers or team admins. The files `instructions.md` and `lessonplan.md` are created by default.`instructions.md` will be available to the students in a read only format while `lessonplan.md` is admin-only.

Replit will also generate an `assets` folder where you can put resources such as images to use in markdown files.

![Teacher view](teacher_view.png)

### Step 3 - Input Output Testing

Once you've created your project, you can also add Input/Output testing to allow students to test their code against the expected output. 

You'll find the "Input/Output Tests" window by clicking the tick in the left side bar as shown below:

![Create tests](tests.png)

Next, you can create a test by clicking on 'Create test' and adding the test name and expected input and output. You can define the expected output by indicating whether it should be a "match", "exact", "regex" or "compatibility" test. You can find out more [here](https://docs.replit.com/teams/input-output-testing).

In most cases, a match test is sufficient. A match test is passed if the expected output is in (or equal to) the actual output. In other words, the actual output does not have to be identical to the expected output, it must just include it. 

![Create test](create_test.png)

### Step 4 - Publish project

You can publish the project to make it available to students by clicking on the 'Publish' button on the top right section of the window. On the next popup, make sure the slider is moved to the right and turned blue to ensure it's visibility to the students and then click save. 

To preview the lesson from a student's point of view, as an admin you can add a new non-admin member to your team for testing purposes. 

![add_member](add_member.png)

You can log in as the member in a different browser to keep the ‘teacher’ (admin) and ‘student’ (non-admin) separate and logged in at the same time.

![Student view](student_view.png)

The student can run tests to check their work before submitting. They can do this by clicking on 'Run tests'.

![Running tests](run_test.png)

The student can then submit their work for review by clicking on the 'Submit' in the top right corner of the window. 