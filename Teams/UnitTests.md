# Unit Testing

Repl unit testing allows a teacher to create code driven tests that compare actual function output with expected output. 

There is also a video explanation available [here]().

## Supported testing frameworks

- Java - JUnit
- Python - unittest
- JavaScript - Jest

## Teams For Education

Unit testing is a feature of [Teams for Education](https://teamsforeducationresources.obaidaa.repl.co/), if you don't have a team yet you can create one [here](https://repl.it/teams).

## Creating a Project

If you are new to projects, you can find more info on creating a project [here](./Projects). 

## Why use Unit Testing?

Unit testing is ideal for complex testing scenarios oriented around specific function return values given parameters. 

Each test is itself a function that follows a pattern:

- Invoke one function from your application with parameters.
- Compare the return value to an expected value (your function should always have )
- If the actual value does not match the expected value, throw an exception.

Here's an example using Java: 
```
// invoke with 3.0, 4.0 as input
double area = calculateRectArea(3.0, 4.0);
// compare expected to actual
assertEqual(12.0, actual);
```

Unit testing is not ideal for testing that involves using Standard In (`System.in`) and Standard Out (`System.out`). Input/Outupt testing is ideal for testing the relies on precise usage of `println()`. 

## Accessing the testing pane

### Defining a test function

1. Open the testing pane within a project.

<img src="/images/teamsForEducation/unit-testing/testing-pane.png" style="width: 100px important!">

1. Select Unit testing.

![testing methods](/images/teamsForEducation/unit-testing/testing-method.png)

1. 

### Importing libraries

### Advanced setup and teardown



## Java `JUnit`

## Python `unittest`

## JavaScript `Jest`

## Tips for writing good tests

1. Only test one expected output at a time.
1. Avoid relying on external libraries when possible.
1. Avoid testing functions that rely on the entire app running (e.g. databases, network connections, rendering user-interfaces).
1. Avoid testing functions that are not crucial portions of the program.
1. Avoid testing functions that are part of external libraries. 

## Tips for writing "testable" functions

1. Decompose your program into discrete functions.
1. Keep functions concise and descriptive. 
1. Design predictable inputs (params) and outputs (return).
