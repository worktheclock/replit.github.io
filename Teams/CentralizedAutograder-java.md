# Building a centralised autograder with Repl.it

In a [previous guide](https://replitgithubio-1.ritza.repl.co/teachers/first-autograded-assignment) we built a basic autograding solution that could automatically run and test your students' assignments. However, there were still some manual steps involved: you needed to navigate to each student's fork of the assignment and kick off the tests manually.

In this guide, we'll show you how to take it a step further and build a centralised grading server. Your students will be able to submit their assignments to this server, and each submission will automatically kick off the tests, assign a grade, and create a summary report of submissions and grades for you to review.

This guide shows you how to build the solution step-by-step. If you just want to get it up and running as quickly as possible, you can follow the [quickstart guide](https://replitgithubio-1.ritza.repl.co/teachers/building-centralized-autograder-quickstart) instead which shows you how to get started from our template repls.

Note that you'll need a subscription to [Teams for Education](https://repl.it/teams) to follow this guide as it is presented, but you should also be able to adapt it to run using a normal Repl.it account if you need.

We assume that your students are learning Java. We'll give an example Java assignment and an example testing suite using [JUnit 5](https://junit.org/junit5/docs/current/user-guide/). We'll use [Javalin](https://javalin.io/documentation) to create the centralised grading server.

## Overview of how the solution works

The basic workflow is similar to in the previous guide, but this time you won't need to look at each student's fork individually. Instead, students will submit them to a centralised server, and you can view their code there, or just look at the summary report it will generate.

![](https://i.ritzastatic.com/fa45c40179924e2fa23b61f19c63d980/solution-overview.png)

After a student forks the assignment, they will be able to write their code, test it on their own, and then submit it when they are satisfied with their answers. 

The grading server will not be visible to students, so they will still not be able to view each other's work or grades.

## Setting up the grading server

We'll start by creating the grading server. We don't want to share this code for students as it will also host copies of their submitted assignments, so we'll have to make sure to **not publish** this template.

** *This part I cannot replicate the same way, I could only get the app going by pulling the code form GitHub so far* **

1. Press the 'create a template' button on your team page
2. Choose Python as the language
3. Call it 'grading-server'
4. Make a note to remind yourself and other admins not to publish this
5. Press the Create button


** *Also not sure about this screenshot, how the java server is started as I see in the example it was started with a `bash` template, however I pulled the repl from GitHub* **
![](https://i.ritzastatic.com/images/ecf49cbb731d4b15aa00d588457528c3/create-server-template.png)

Our grading server will consist of a few different components, namely:

* A Javelin server that can receive files that students submit
* JUnit 5 code to test the students' submissions
* Configuration for PyTest to extract information about how many tests were passed and calculate a grade
* A report file to keep a summary of all submissions and grades

### Creating the server in `main.java`

In `main.java` add the following code 

```java
import io.javalin.Javalin;
import io.javalin.core.util.FileUtil;
import io.javalin.http.UploadedFile;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

```

This brings in the imports that we need and initialses a Javelin application.

Immediately below this, add three helper functions that we'll use in the main submission process.

** *Not sure if the java code can be done in sections like this or how the code can be chronologically explained so I  copied the whole code here, imports above and class below* ** 

```java
public class Main {

  // the class name of the of the submission
  private static final String SUBMISSION_CLASS_NAME = "Example";

  // the class name of the test case
  // this _should_ be SUBMISSION_CLASS_NAME + "Test"
  // but at an absolute minimum, it *must* end in "Test"
  private static final String TEST_CLASS_NAME = "ExampleTest";

  // ----------------------------------------------
  // you shouldn't need to edit anything below here
  // ----------------------------------------------

  private static final String SUBMISSION_FILE_NAME = SUBMISSION_CLASS_NAME + ".java";
  private static final String TEST_FILE_NAME = TEST_CLASS_NAME + ".java";
  private static final Pattern TEST_OUTPUT_PATTERN = Pattern.compile("(\\d+) tests successful.*(\\d+) tests failed", Pattern.DOTALL);
  private static final String REPORT_TEMPLATE = "### %s submitted at %s\n* **Passed:** %d\n* **Failed:** %d\n* **Score:** %d%%\n";
  private static final DateFormat DATE_FORMAT = new SimpleDateFormat("dd MMMMMMMMMM yyyy hh:mma");
  private static String OS = System.getProperty("os.name").toLowerCase();

  public static void main(String[] args) {
    Javalin app = Javalin.create().start(8080);
    app.get("/", ctx -> {
         ctx.contentType("text/html");
         ctx.result(Main.class.getResourceAsStream("index.html"));
       })
       .post("/", ctx -> {
         try {
           UploadedFile upload = ctx.uploadedFile("codefile");
           if (upload == null)
             throw new IllegalArgumentException("No file was uploaded");

           if (upload.getSize() > 10_000)
             throw new IllegalArgumentException("Uploaded file is too large");

           String filename = upload.getFilename();
           if (!SUBMISSION_FILE_NAME.equals(filename))
             throw new IllegalArgumentException("Uploaded file is not a Java source file for class " + SUBMISSION_CLASS_NAME);

           String temp = Files.createTempDirectory("autograder_").toString();
           // System.err.println(temp);

           copy(upload, temp);
           compile(temp);
           String testOutput = test(temp);
           report(testOutput, temp);

           ctx.contentType("text/plain");
           ctx.result("Your code has been submitted");

         } catch (Exception ex) {
           ex.printStackTrace(System.err);

           ctx.contentType("text/plain");
           ctx.result("Sorry, something went wrong");
         }
       });
  }

  private static InputStream resource(String name) {
    return Main.class.getResourceAsStream(name);
  }

  private static String extractStudentNumber(String codefile) {
    Pattern pattern = Pattern.compile("^//\\s*(\\S+)");
    Matcher matcher = pattern.matcher(codefile);
    if (matcher.find()) {
      return matcher.group(1);
    }

    throw new IllegalArgumentException("No student identifier found");
  }

  // copy the uploaded file and any other files necessary for compilation and testing
  private static void copy(UploadedFile upload, String directory) throws Exception {
    // System.err.println("Copying in " + directory);

    // copy the submission to the work directory
    String submission = Paths.get(directory, upload.getFilename()).toString();
    FileUtil.streamToFile(upload.getContent(), submission);

    // copy the test to the work directory
    String test = Paths.get(directory, TEST_FILE_NAME).toString();
    FileUtil.streamToFile(resource("META-INF/src/" + TEST_FILE_NAME), test);

    // copy the dependencies to the work directory
    InputStream in = resource("META-INF/lib");
    BufferedReader br = new BufferedReader(new InputStreamReader(in));
    String lib;
    while ((lib = br.readLine()) != null) {
      FileUtil.streamToFile(resource("META-INF/lib/" + lib), Paths.get(directory, lib).toString());
    }
  }

  private static String compile(String directory) throws Exception {
    // System.err.println("Compiling in " + directory);

    ProcessBuilder pb = new ProcessBuilder();
    if (OS.contains("win"))
      pb.command("javac", "-cp", ".;*", "*.java");
    else
      pb.command("javac", "-cp", ".:*", SUBMISSION_FILE_NAME, TEST_FILE_NAME);
    pb.directory(new File(directory));
    pb.redirectErrorStream(true);
    Process process = pb.start();

    String result = new String(process.getInputStream().readAllBytes(), StandardCharsets.US_ASCII);
    process.waitFor();
    return result;
  }

  private static String test(String directory) throws Exception {
    // System.err.println("Testing in " + directory);

    ProcessBuilder pb = new ProcessBuilder();
    pb.command("java",
        "-jar", "junit-platform-console-standalone-1.7.0.jar",
        "-cp", ".",
        "-c", TEST_CLASS_NAME,
        "--disable-ansi-colors", "--disable-banner",
        "--details=summary", "--details-theme=ascii"
    );
    pb.directory(new File(directory));
    pb.redirectErrorStream(true);
    Process process = pb.start();

    String result = new String(process.getInputStream().readAllBytes(), StandardCharsets.US_ASCII);
    process.waitFor();
    return result;
  }

  private static void report(String testOutput, String workspace) throws Exception {
    Matcher matcher = TEST_OUTPUT_PATTERN.matcher(testOutput);
    if (!matcher.find())
      throw new IllegalStateException("Unable to match test output");

    int passed = Integer.parseInt(matcher.group(1));
    int failed = Integer.parseInt(matcher.group(2));

    int score = (int) ((((double) passed) / ((double) (passed + failed))) * 100);
    // System.err.println("score: " + score);

    String code = Files.readString(Paths.get(workspace, SUBMISSION_FILE_NAME));
    String sn = extractStudentNumber(code);

    String date = DATE_FORMAT.format(new Date());

    String report = String.format(REPORT_TEMPLATE, sn, date, passed, failed, score);
    // System.err.println(report);

    save(sn, report, workspace);
  }

  private static void save(String sn, String report, String workspace) throws Exception {
    // slight sanity check on the directory to create...
    sn = sn.replaceAll("[^a-zA-Z0-9]", "_");

    File dir = null;
    for (int i = 0; i < 10_000; i++) {
      dir = new File(sn + ((i == 0) ? "" : ("_" + i)));
      if (!dir.exists())
        break;
    }
    if (dir.exists())
      throw new IllegalStateException("Can't create directory name to store submission");

    if (!dir.mkdir())
      throw new IllegalStateException("Can't create directory to store submission");

    Files.copy(Paths.get(workspace, SUBMISSION_FILE_NAME), Paths.get(dir.getAbsolutePath(), SUBMISSION_FILE_NAME));
    Files.writeString(Paths.get("report.md"), report, StandardCharsets.US_ASCII, StandardOpenOption.CREATE, StandardOpenOption.APPEND);

    System.err.println("Submission received from " + sn + "\n" + report);
  }
}
```

** *Explanation of what the Java code above does* **

* The file that the student submitted
* The tests that we need to run
* The configuration for these tests

If the student has previously made a submission, it will add "-1" to the end of the directory, or keep incrementing this number for each resubmission so you can keep track of each submission a student makes.

We then invoke JUnit 5. Instead of invoking JUnit 5 from the command line as we did in the previous guide, this calls Junit 5 from within our Java code so that we can programmatically extract the results and save them to the report.

Finally, add the following code, also to `main.java`, below what you already added.

```java
private static void save(String sn, String report, String workspace) throws Exception {
    // slight sanity check on the directory to create...
    sn = sn.replaceAll("[^a-zA-Z0-9]", "_");

    File dir = null;
    for (int i = 0; i < 10_000; i++) {
      dir = new File(sn + ((i == 0) ? "" : ("_" + i)));
      if (!dir.exists())
        break;
    }
    if (dir.exists())
      throw new IllegalStateException("Can't create directory name to store submission");

    if (!dir.mkdir())
      throw new IllegalStateException("Can't create directory to store submission");

    Files.copy(Paths.get(workspace, SUBMISSION_FILE_NAME), Paths.get(dir.getAbsolutePath(), SUBMISSION_FILE_NAME));
    Files.writeString(Paths.get("report.md"), report, StandardCharsets.US_ASCII, StandardOpenOption.CREATE, StandardOpenOption.APPEND);

    System.err.println("Submission received from " + sn + "\n" + report);
  }
```

This waits for a file submission and then tries to grade it. If the assignment is not in the correct format or if anything else goes wrong, it will log an error to a file called "errors.txt".

### Creating the tests

For demonstration, we're going to assume that the homework assignment requires the students to write two functions:

* `add(int a, int b)` which sums the two input integers and returns the result
* `subtract(int a, int b)` which subtracts `b` from `a` and returns the result

You can adapt this to your actual homework assignment as needed, but we recommend that you first make sure that everything is working with this simple example before you write a more advanced set of tests.

Create a new file called `ExampleTest.java` and add the following code.

```java
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ExampleTest {

  @Test
  void add_two_pos() {
    assertEquals(3, new Example().add(1, 2), "1 + 2");
  }

  @Test
  void add_one_neg_one_pos() {
    assertEquals(-2, new Example().add(-3, 1), "-3 + 1");
  }

  @Test
  void subtract_two_pos() {
    assertEquals(2, new Example().subtract(5, 3), "5 - 3");
  }

  @Test
  void subtract_two_neg() {
    assertEquals(1, new Example().subtract(-2, -3), "-2 - -3");
  }
}

```

Each student's main code file `Example.java` will be saved within a folder matching their unique name (e.g. `A1234567`).


### Creating the configuration for JUnit 5

** *Does not look like JUnit uses the same .template type config* **

Finally, we need to create a special file that PyTest will trigger automatically when we call it from our `main.py` file. Create a file called `conftest.template` and add the following code. 

```python
import datetime

def pytest_terminal_summary(terminalreporter, exitstatus, config):
    stats = terminalreporter.stats
    num_passed = len(stats.get("passed", []))
    num_failed = len(stats.get("failed", []))
    score = int(num_passed / (num_passed + num_failed) * 100)
    student_number = config.args[0]
    fdate = datetime.datetime.now().strftime("%d %B %Y %I:%M%p")

    report = f"""### {student_number} submitted at {fdate}
* **Passed:** {num_passed}
* **Failed:** {num_failed}
* **Score:** {score}%
"""
    with open("report.md", "a") as f:
        f.write(report)
```

The variables are automatically passed in by PyTest and contain information about which tests passed and which failed. This code only extracts a basic summary of how many tests passed and how many failed and we give the student a grade based on the percentage of tests that they passed.

The logic in `main.py` that you created earlier will copy a new version of this for each submission with a unique name. This is important to stop the tests conflicting with each other as PyTest keeps a local cache of tests for efficiency.

That's it for our server. Press the `Run` button and your server should start running and display two buttons: "Choose File" and "Submit" message, as shown below. (Take note of the URL, which is based on your team and project name, as we'll need to add this to the student assignment that we create in the next step.)

![](https://i.ritzastatic.com/repl/codewithrepl/java-centralized-autograder/00-02-java-running-server-and-url.png)


## Setting up the assignment 

Now that we have a server, we need to build the other half: the assignment template for students to fork and submit.

### Create a new template 

On your teams page, create a new template. This will be specific to a single assignment for your students so call it something like "Grade 10 Java homework week 1" so you can keep track of different assignments for different classes.

![](https://i.ritzastatic.com/175ab1509be64763bcb7f38662dad9af/create-template.png)

### Add the code for the assignment

Our assignment needs the following three components:

* The starter code and instructions for students to work on
* A basic testing harness so that students can test their work (unlike in the previous guide, students won't have access to the full test suite that we use for grading)
* Code to submit the assignment to the central server

In the `Example.java` file, add the following code.

```java
// A1234567
// Ensure the above line contains exactly your student number.
//
// You can test your code by pressing the `Run` button.
// Once you are happy with it, change the `ReadyForSubmission` line
// to say `YES` and press the `Run` button again to submit
// -----------------------------------------------------------------
// ReadyForSubmission=NO
public class Example {
  // Add a and b and return the sum
  public int add(int a, int b) {
    return 0;
  }

  // Subtract b from a and return the result
  public int subtract(int a, int b) {
    return 0;
  }

  private void test() {
    System.out.printf("add(1, 2) returns %s\n", add(1, 2));
    System.out.printf("subtract(5, 2) returns %s\n", subtract(5, 2));
  }

  public static void main(String[] args) {
    new Example().test();
  }
}
```

Change the comment on the very first line to match the format of your students' identification numbers. This will be used in the report that the server generates and also for the directory names that it uses to store the students' code.

The `ReadyForSubmission` line indicates whether the student is ready to submit or not. By default, the code is in testing mode and when the student presses the `Run` button, it will run their code and display the results to them. 

Once they change the `ReadyForSubmission=NO` to `ReadyForSubmission=YES`, it changes to submission mode. Now when the student hits the `Run` button, it will submit the code to our server.

The `add()` and `subtract()` functions are starter code for the student to work from. The `test()` function runs these functions with some sample inputs and shows the results to the student.

The `main()` function checks what mode we are in and either runs the code locally or submits it to the server.

### Creating the submission script

Create a new file in the template called `go.sh` and add the following code.

```bash
#!/bin/bash

if cat Example.java | grep -q "ReadyForSubmission=YES"; then
  curl -X POST \
       -H "Content-Type: multipart/form-data" \
       -F "codefile=@Example.java" \
       https://ritzaautograder.paultomlin.repl.co
else
  javac Example.java
  java Example
fi
```

Change the URL to the one that you copied in the final step of the server setup, as this is where the students' assignments will be submitted.

### Testing it all out

To make sure that everything works as expected, run the template. It's still in test mode, so it should run the two functions with the example inputs and display the output. Because we only have the starter code, we can see that the functions don't work yet.

![](https://i.ritzastatic.com/repl/codewithrepl/java-centralized-autograder/00-03-java-running-template-starter.png)

Now fill out the two functions so that they look as follows. Note that we have a deliberate error in the `subtract()` function to make sure that our grading is working as expected.

```java
  // Add a and b and return the sum
  public int add(int a, int b) {
    return a + b;
  }

  // Subtract b from a and return the result
  public int subtract(int a, int b) {
    return b - a;
  }

```

Hit `Run` again and you should see that the functions return results now.

![](https://i.ritzastatic.com/repl/codewithrepl/java-centralized-autograder/00-04-java-running-template-completed-errors.png)

Change the `ReadyForSubmission=NO` line to `ReadyForSubmission=YES` and press `Run` again. This time it should submit the solution to the grader and return a confirmation message.

![](https://i.ritzastatic.com/repl/codewithrepl/java-centralized-autograder/00-05-java-submission-confirmed.png)

Fix the subtract function by swapping `b` and `a` as follows and submit it one more time by pressing the `Run` button. This lets us test that resubmissions are working.

```java
  // Subtract b from a and return the result
  public int subtract(int a, int b) {
    return a - b;
  }
```

Finally, change all of the code back to how it was as this is the version that students will fork and we don't want them to have the solutions. Change the ReadyForSubmission=YES line to NO and change the return statements, replacing the  answers with `return = 0` instead.

```java
// ReadyForSubmission=NO
public class Example {
  // Add a and b and return the sum
  public int add(int a, int b) {
    return 0;
  }

  // Subtract b from a and return the result
  public int subtract(int a, int b) {
    return 0;
  }

```

### Viewing the submitted code and report

Navigate back to your `grading-server` project and you should see some new files and folders that have been created by the grading project.

Each of the submissions generated a new subfolder with the student number in the first line of the submission file. Because they were the same, the second one has `_1` appended to it.

In each of these folders, you can see the code that was submitted.

You can also see `report.md` has been generated, with details of the two submissions (who submitted them and when) and their calculated grades.

![](https://i.ritzastatic.com/repl/codewithrepl/java-centralized-autograder/00-06-java-example-report.png)

## Publishing the template for students to use

Once you are happy with the assignment, press the "publish template" button in the top right. Students will get a notification that their homework is ready and be able to create a fork, modify the code, and submit it to the grading server.

![](https://i.ritzastatic.com/images/07a64f590dd24ae8b6e8ec9349e01cdd/publish-template.png)

Leave the grading server running (don't press the "Stop" button) so that the students can submit when they are ready. You can visit your server URL (that you pasted into the `go.sh` file) to make sure that it stays up (it should display two buttons: "Choose file" and "Submit", if everything is running as expected. If you see an error or the page does not load, navigate back to the unpublished template file and hit the `Run` button again.)

## Where next?

Now you have a robot to take care of most of your grading for you which should save you a bunch of time! In this guide, we showed you how to set up an autograder, but you might like to extend it on your own with some additional features. For example, you could

* Create a more sophisticated directory and reporting structure so that different assignments can be submitted to the same server without all being mixed up into a single directory and single report.
* Set up a service like [UpTimerRobot](https://uptimerobot.com/) to keep an eye on your grading server and notify you if it becomes unavailable (this also stops Repl.it shutting it down from inactivity).
* Return the grades to students so that they see "You scored 75%" after submitting instead of just "Your code has been submitted".

We've focused on Java in this guide, but you should be able to adapt it to testing and grading submissions in JavaScript, Python, or other languages, with some work. In future guides, we'll give examples of how to do this.
