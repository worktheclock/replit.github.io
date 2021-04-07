# Unit Testing

Repl unit testing allows a repl author to create code-driven tests that compare actual function output with expected output. 

## Supported Languages and Testing Frameworks

- Java – [JUnit](https://junit.org/junit5/docs/current/user-guide/)
- Python – [unittest](https://docs.python.org/3/library/unittest.html)
- Node.js – [Jest](https://jestjs.io/docs/en/getting-started)

## Why Use Unit Testing?

Unit testing is great for more complicated testing scenarios. For example, when you need to test that functions return specific values based on their (dynamic) inputs.

Each test is itself a function that follows a pattern:

- Invoke one function from your application with parameters.
- Compare the return value to an expected value (your function should always have predictable outputs)
- If the actual value does not match the expected value, throw an exception.

Here's an example using Java: 
```
// invoke with 3.0, 4.0 as input
double area = calculateRectArea(3.0, 4.0);
// compare expected to actual
assertEqual(12.0, actual);
```

Unit testing is not ideal for testing that involves using Standard In (`System.in`) and Standard Out (`System.out`). Input/Outupt testing is ideal for testing that relies on precise usage of `println()`. 

## Using the Testing Pane

The testing pane can be found in your left-hand sidebar in your repl. It is your hub for creating tests. Read on to find out more about how to use this helpful feature. 

### Defining a test function

Open the testing pane within a project.

![unit testing pane](/images/unit-testing/unit-testing-pane.png)

If prompted, select "Unit tests".

<img src="/images/unit-testing/testing-method.png" style="width: 200px;">

Write a function within the main file that's easy to test: something which accepts parameters and returns a single result. Our example includes an `add` function which simply returns the result of adding two numbers.

![unit testing main py](/images/unit-testing/unit-testing-add-py.png)

Click "+ Add test".

![unit testing add test](/images/unit-testing/unit-testing-add-test.png)

Providing a test will construct a unit test function for you. Only the body of the function is editable. Configure the test to invoke the `add` function and compare the result to the expected value. **If the actual value does not match the expected value, the assert method with throw an exception and cause the test to fail.** Include a helpful failure message to explain the intent of the test. 

Note: Python exposes its assert methods on the `self` object. This behavior will be different depending on the language you use. See the "Assertion documentation" below to read about the invocation patterns for each unit testing framework.

![unit testing add modal](/images/unit-testing/unit-testing-add-modal.png)

Click "Run tests" to begin executing your test suite. Open the Console tab to monitor execution progress. 

![unit testing running](/images/unit-testing/unit-testing-running.png)

Test results will appear in the Console.

![unit testing results](/images/unit-testing/unit-testing-results.png)


### Importing libraries

Imports can be configured in the "Setup" for the test suite, which is helpful if:
* Your repl has library dependencies.
* You would like to include any other library just for testing purposes. 

For example, you can import [NumPy](https://numpy.org/) for all tests. Keep in mind that this will affect all test functions within your test suite (you will not need to import more than once):

![unit test setup](/images/unit-testing/unit-testing-import.png)

Here is an example function using NumPy:

![unit test numpy](/images/unit-testing/unit-testing-np-example.png)

Every other test you write can also use NumPy:

![unit test numpy](/images/unit-testing/unit-testing-np-test.png)

### Importing modules

If you would like to test multiple modules or files within your repl, you must manually import them in the "Setup".

![unit test import module](/images/unit-testing/unit-testing-import-module.png)

## Advanced Setup and Teardown

Sometimes tests require specific setup and teardown steps to configure and destroy global state. 

Consider a repl that relies on Repl Database and loads specific data by key.

![unit testing database](/images/unit-testing/unit-testing-database.png)

### Import

Use import to include Repl Database.

![unit testing db import](/images/unit-testing/unit-testing-db-import.png)

### Setup

Use the setup to add a database key with test data:

![unit testing setup](/images/unit-testing/unit-testing-setup.png)

### Teardown
Use the teardown to delete the test data:

![unit testing teardown](/images/unit-testing/unit-testing-teardown.png)

## Assertion Documentation

Read about the supported assert function for each unit testing library:

- Java – [JUnit](https://junit.org/junit4/javadoc/latest/org/junit/Assert.html)
- Python – [unittest assert methods](https://docs.python.org/3/library/unittest.html#assert-methods)
- Node.js – [Jest expect functions](https://jestjs.io/docs/en/expect)


## Tips for Writing Good Tests

1. Only test one expected output at a time.
1. Avoid relying on external libraries when possible.
1. Avoid testing functions that rely on the entire app running (e.g. databases, network connections, rendering user-interfaces).
1. Avoid testing functions that are not crucial portions of the program.
1. Avoid testing functions that are part of external libraries. 

## Tips for Writing "Testable" Functions

1. Decompose your program into discrete functions.
1. Keep functions concise and descriptive. 
1. Design predictable inputs (parameters) and outputs (return).

## Teams for Education

Unit testing is supported in [Teams for Education](https://teamsforeducationresources.obaidaa.repl.co/). If you don't have a team yet, create one [here](https://repl.it/teams).

### Creating a project

If you are new to projects, you can find more info on creating a project [here](./Projects). 

<!-- 
TBD
### Example Team projects

Use project share links below to import a example unit test projects into your team:

  - Java `JUnit`: link
  - Python `unittest`: link
  - Node.js `Jest`: link -->