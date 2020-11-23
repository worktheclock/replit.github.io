# Automatically grading coding assignments with repl.it and replgrader.com

If you teach coding, you're probably tired of manually checking each student's work and assigning a grade. In this tutorial, we'll show you a simple way of creating an *autograded* coding assignment. You'll write the instructions, some unit tests, and provide some starter code for your students. They'll complete the assignment and submit it to you and replgrader.com. Replgrader.com will automatically run your tests against your students' code, and you can easily pull the results of these tests and use them to assign grades.

We'll assume that you're using Repl.it's [Teams for Education product](https://repl.it/teams), but you should be able to easily adapt the instructions if not.

Note that replgrader.com is in early beta. It is a grading service that focuses **simplicity** and **privacy** and is currently best suited for beginner coding projects. Your coding assigment should:

* be written in Python with tests written using PyTest
* consist of only two files - a `main.py` file where students will write code and a `test_main.py` file which contains your tests
* not rely on third-party dependencies

Each assignment you create will consist of two parts:

* a private "Grader" repl where you, the teacher, will be able to create the template and view the submissions and grades
* a shared template repl that students will use as a starting point

Replgrader.com provides starting templates for each part, so that you can easily adapt them to fit your own assignments.

## Creating the Teacher's "Grader" repl

First we'll set up the grader repl for teachers. This will have access to the test results for all submissions, so we'll use an **unpublished** project template for it. You could also use a private repl, or run it locally on your own machine.

Create a new Python project. Name it something relevant to the assignment you are creating and add "GRADER" or "PRIVATE" at the end to help ensure that you don't publish this version by mistake.

For this tutorial, we'll call our project "Week 3 - Functions GRADER"

Add a file called exactly `.replit` and add the following content to this file.

```bash
language="bash"
run="wget https://i.ritzastatic.com/images/8c3032b00d5e41439599e4284dd5916a/replgrader-teacher-template.zip && unzip -o replgrader-teacher-template.zip && rm .replit" 
```

Hit the green "Run" button.
This will pull and extract the starter template. The files you need to modify are all in a subdirectory named `assignment`. Specifically, you'll want to make changes to:

* `assignment/main.py` - to add any starter code that students should have
* `assignment/test_main.py` - to build a suite of tests that check your students' work (this file will not be shared with students)
* `assignment/README.md` - instructions to the student on how to complete the assignment

The example starter code that comes with the template is a very basic project where the students just need to write one `add()` function. We'll use that as an example in this tutorial without making further changes, but for a real assignment you would need to edit these files. Specifically, you'll want to

* Edit `README.md` to provide instructions to your student on what work needs to be done
* Edit the code in `main.py`. In the "Student's section", add any function skeletons or other starter code that your students need. In the "Teacher's section", write some code to call these functions so that the students can see if they are working as expected or not.
* Edit the `test_main.py` file to call the functions and see if they behave as expected.

Once you're happy with your assignment, hit the green run button which will start a Flask server and show you your teacher's interface. From here you can test the assignment, submit the assignment to replgrader.com, and view the test results from assignments that your students have submitted.

Hit the "test" button to see if everything is as expected. You should see the test fail as our `add()` function is incomplete (intentionally, as this is left for the student to do), but you can make sure that the tests fail in the expected way, or write up a model solution and check that the tests all pass.

Now hit the "submit" button. This will submit the assignment and tests to replgrader.com so that it can handle submissions from students and automatically test them. The console will prompt you to type in your repl team or user name, so type or paste this in to complete the submission process. If you are using Teams for Education, use your team name. If you are using a private repl, use your username.

The submission process also modifies the `manifest.json` file in the project root. Specifically it adds two keys: `student_key` and `teacher_key`. Keep the `teacher_key` private as this is used to retrieve grades, but copy the `student_key` as you'll need it to initialise the student's template in the next step.

## Creating the students' template repl

Now we'll create a copy of the assignment for students to start from and some wrapper code to help them submit it to replgrader.com. Create another project, choose Python again, and create a file called `.replit`. Add the following content to this file.

```bash
language="bash"
run="wget https://i.ritzastatic.com/images/b70936a9f88446dd9216432498010869/replgrader-student-template.zip && unzip -o replgrader-student-template.zip"
```

Hit the run button. This will pull in the generic starter code for a student repl, but it still needs to be initialised with the student key that you got in the previous step.

The contents of the `.replit` file will now look as follows:

```bash
lang="bash"
run="python initialise.py <student_key> && rm .replit"
```

Replace `<student_key>` with the student key that you got in the previous step, which should look something like `1bc29b36f623ba82aaf6724fd3b16718`.

Hit the run button. This will now pull in the `README.md` and `main.py` file that you created in and submitted from the teacher repl. 

You can now share this repl with your students by hitting the "Publish project" button in the top right corner.

## Submitting the project as a student

You don't need to do this step, but it might be useful if you want to see what things are like from your students' perspective or in case they get stuck and need help.

Hit the green "Run" button and look at the output. Our add function doesn't work yet. You can fix this by modifying the `add()` function to look as follows. Hit "Run" again, and the output should make more sense.

```
def add(a, b):
    return a + b
```

Now uncomment the `SUBMIT=True` line, and hit the run button again. The console will prompt you for your team or user name. Type or paste this in, and you'll see a confirmation message that your assignment has been submitted.

## Getting grades for submitted projects

At your convenience (no need to keep the teacher server running, as assignments are submitted directly to replgrader.com), start up your Grader repl again and hit the "Get Grades" button. It will display a summary of submissions, including how many tests each one passed. You can use these to assign grades or you can click on the links to view each student's code.


















