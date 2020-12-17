## Input/Output Testing

The Input/Output Tests pane is embeded within all [Teams for Education projects](./Projects).

<img src="https://cms.repl.it/assets/input-output-tests.png" style="width: 400px">

This pane contains tools designed to simplify testing code. Instead of manually entering typing input and checking output for every submission, the autograder allows you to define and automate testing. 

Click on the <img src="https://cms.repl.it/assets/flask-icon.png" style="width: 38px; margin: 0; display: inline-block; vertical-align: middle;"> icon within the workspace sidebar nav to reveal the Input/Output tests pane.

Click on the <img src="https://cms.repl.it/assets/input-output-tests-create-test.png" style="width: 100px; margin: 0; display: inline-block; vertical-align: middle;"> button to reveal a form with the following fields:

<img src="https://cms.repl.it/assets/input-output-tests-create.png" style="width:400px">

+ `Test name` - This is the name of the test, which is for you and your students to identify it. 
+ `Input` (optional) - This is where you put in the input for your test. 
+ `Expected output` - This is the output which the program is expected to have.
+ `Type` (default: `match`) - This is how we represent how we compare the actual output of the script with the expected output.
    + `match` - The test passes if the expected output is in (or equal to) the actual output.  The JavaScript equivalent is `actualOutput.includes(expectedOutput)`. 
    + `exact` - The test passes if the expected output is equal to the actual output. (though, we allow a trailing newline). The equivalent to this in JavaScript is `expectedOutput === actualOutput || expectedOutput + '\n' === actualOutput`.
    + `regex` - The test passes if the test matches the expectedOutput compiled as a regex. This is equivalent to `actualOutput.match(expectedOutput)`. 

If you don't want to be lenient of an extra newline and have a truly exact match with the expectedOutput and actualOutput, you can use the `regex` with a `^` at the start and `$` at the end. Keep in mind though, that you'll have to escape other regex characters.

Tests cases can be added, edited, and deleted at any time - even after the project has been published. This added flexibility allows you to get started with testing right away. 

If a test fails, you can view the results by clicking <img src="https://cms.repl.it/assets/input-output-tests-results-btn.png" style="width: 70px; margin: 0; display: inline-block; vertical-align: middle;"> that appear on each test case:

<img src="https://cms.repl.it/assets/input-output-tests-failed.png" style="width:400px">