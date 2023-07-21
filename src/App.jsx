import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import githubImage from "./images/github.png";
import instagramImage from "./images/instagram.png";
import twitterImage from "./images/twitter.png";

function App() {
  function OnSubmitClicked() {
    let dateInput = document.getElementById("date-input");
    const selectedDate = dateInput.value;
    console.log(formatDateToSimpleString(selectedDate));
    const status = checkPalindrome(formatDateToSimpleString(selectedDate));
    if (!status) {
      findNearestPalindrome(selectedDate);
    } else {
      showResult("Wow!! You have a palindrome birthday. 🥳🍾");
    }
  }

  function findNearestPalindrome(date) {
    let nextDate = new Date(date);
    let previousDate = new Date(date);
    const currentDate = new Date(date);

    while (true) {
      nextDate.setDate(nextDate.getDate() + 1);
      previousDate.setDate(previousDate.getDate() - 1);

      if (checkPalindrome(formatDateToSimpleString(nextDate))) {
        showResultNearestPalindromeDate(currentDate, nextDate);
        break;
      } else if (checkPalindrome(formatDateToSimpleString(previousDate))) {
        showResultNearestPalindromeDate(currentDate, previousDate);
        break;
      }
    }

    // takes the date input and keeps stepping by +1 and -1 until it finds the palindrome date
    // on finding sends it to print
  }

  function showResultNearestPalindromeDate(currentDate, targetDate) {
    const timeDifference = Math.abs(
      currentDate.getTime() - targetDate.getTime()
    );
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    const result = `You missed the nearest palindrome date ${formatDateToDateString(
      targetDate
    )} by ${daysDifference} days.`;
    showResult(result);
  }

  function showResult(result) {
    document.getElementById("result").innerHTML = result;
  }

  function checkPalindrome(date) {
    const reverseDate = date.split("").reverse().join("");
    return reverseDate === date;
  }

  // Converts the date to a string with DD/MM/YYYY
  function formatDateToSimpleString(date) {
    const inputDate = new Date(date);
    let formattedDate =
      inputDate.getDate().toString() +
      " " +
      (inputDate.getMonth() + 1).toString().padStart(2, "0") +
      " " +
      inputDate.getFullYear().toString().padStart(2, "0");

    formattedDate = formattedDate.replaceAll(" ", "");

    return formattedDate;
  }

  function formatDateToDateString(date) {
    const inputDate = new Date(date);
    let formattedDate =
      inputDate.getDate().toString() +
      "-" +
      (inputDate.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      inputDate.getFullYear().toString().padStart(2, "0");

    formattedDate = formattedDate.replaceAll(" ", "");

    return formattedDate;
  }

  return (
    <>
      <div>
        <h1>Palindrome Birthday!!</h1>
        <p>Enter your birth date.</p>

        <input type="date" id="date-input" />

        <br />
        <button style={{ marginTop: "30px" }} onClick={OnSubmitClicked}>
          Show
        </button>

        <p id="result"></p>

        <footer>
          <p>soumya ripan: </p>

          <ul>
            <li>
              <a href="https://github.com/Soumya323">
                <img src={githubImage} alt="github" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/Ripann_?t=8IMb-TON6SKeOCqh7DyWzg&s=09">
                <img src={twitterImage} alt="twitter"></img>
              </a>
            </li>
            <li>
              <a href="/">
                <img src={instagramImage} alt="instagram"></img>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}

export default App;

// Check if current date is palindrome or not
// remove special-chars from date -> reverse -> check palindrome

// If current date is not palindrome then check what's the nearest plaindrome date ahead or before and how many days
