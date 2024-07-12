const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);
  result.innerText = dividend / divider;

  // ### Scenario: Validation when values are missing
  // GIVEN that the submit button is pressed
  // WHEN either or both inputs are empty
  // THEN the divisions should not be done
  // AND the following should be displayed: “Division not performed. Both values are required in inputs. Try again”.
  if (!dividend || !divider) {
    result.innerText =
      "Division not performed. Both values are required in inputs. Try again.";
    return;
  }

  // Convert inputs to numbers
  const numDividend = Number(dividend);
  const numDivider = Number(divider);

  // ### Scenario: Providing anything that is not a number should crash the program
  // GIVEN that the submit button is pressed
  // WHEN ‘YOLO’ is entered into the first input
  // AND ‘+++’ is entered into the second input
  // THEN the entire screen should be replaced with “Something critical went wrong. Please reload the page”
  // AND an error should be logged in the browser console that shows the call stack
  if (isNaN(numDividend) || isNaN(numDivider)) {
    console.error("Invalid input: Non-numeric values provided");
    document.body.innerHTML =
      "<h1>Something critical went wrong. Please reload the page</h1>";
    return;
  }

  // ### Scenario: An invalid division should log an error in the console
  // GIVEN that the submit button is pressed
  // WHEN 20 is entered into the first input
  // AND 0 is entered into the second input
  // THEN the division should not be done
  // AND the following should be displayed: “Division not performed. Invalid number provided. Try again”.
  // AND an error should be logged in the browser console that shows the call stack
  // BUT the program should not crash entirely
  if (numDivider === 0) {
    result.innerText =
      "Division not performed. Invalid number provided. Try again.";
    console.error("Division by zero error");
    return;
  }

  // ### Scenario: Dividing numbers result in a decimal number
  // GIVEN that the submit button is pressed
  // WHEN 20 is entered into the first input
  // AND 3 is entered into the second input
  // THEN the number 6 with no decimal should be shown
  // Perform division and display result
  const divisionResult = Math.floor(numDividend / numDivider);
  result.innerText = divisionResult;
});
