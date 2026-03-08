const submitButton = document.querySelector(".subbut");
const firstNameInput = document.querySelector(".name1");
const secondNameInput = document.querySelector(".name2");
const resultElement = document.getElementById("result");
const formElement = document.getElementById("form");

const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/;
const digitRegex = /\d/;
const flamesMap = {
  f: "Friends",
  l: "Love",
  a: "Affection",
  m: "Marriage",
  e: "Enemy",
  s: "Sister",
};

submitButton.onclick = () => {
  calculateResult();
};

firstNameInput.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    secondNameInput.focus();
    return;
  }

  if (event.key !== "Enter") return;
  event.preventDefault();
  secondNameInput.focus();
});

secondNameInput.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    firstNameInput.focus();
    return;
  }

  if (event.key !== "Enter") return;
  event.preventDefault();
  calculateResult();
});

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  calculateResult();
});

function calculateResult() {
  const a = firstNameInput.value;
  const b = secondNameInput.value;
  const combined = a + b;

  const errorMessage = validateNames(a, b, combined);
  if (errorMessage) {
    showResult(errorMessage);
    return;
  }

  const total = getDifferenceTotal(a.toLowerCase(), b.toLowerCase());
  const key = getFlamesKey(total);
  showResult(flamesMap[key]);
}

function validateNames(a, b, combined) {
  if (a === "" && b === "") return "ENTER NAMES";
  if (a === "") return "ENTER FIRST NAME";
  if (b === "") return "ENTER SECOND NAME";
  if (combined.includes(" ")) return "SPACE IS NOT ALLOWED";
  if (digitRegex.test(combined)) return "DIGIT IS NOT ALLOWED";
  if (specialCharRegex.test(combined)) return "SYMBOL IS NOT ALLOWED";
  return "";
}

function getDifferenceTotal(a, b) {
  const counts = new Array(26).fill(0);

  for (let i = 0; i < a.length; i++) {
    counts[a.charCodeAt(i) - 97]++;
  }

  for (let i = 0; i < b.length; i++) {
    counts[b.charCodeAt(i) - 97]--;
  }

  let total = 0;
  for (let i = 0; i < 26; i++) {
    total += Math.abs(counts[i]);
  }

  return total;
}

function getFlamesKey(total) {
  const letters = ["f", "l", "a", "m", "e", "s"];
  let index = 0;

  while (letters.length > 1) {
    index = (index + total - 1) % letters.length;
    letters.splice(index, 1);
  }

  return letters[0];
}

function showResult(text) {
  resultElement.textContent = text;
  resultElement.classList.remove("fade");
  void resultElement.offsetWidth;
  resultElement.classList.add("fade");
}
