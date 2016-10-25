"use strict";
window.onload = main;

function main() {
  const checker = new Checker();
  const dataView = document.getElementById("data-view");
  const alertView = document.getElementById("alert-view");
  const resultView = document.getElementById("result-view");
  console.log(checker.ua);
  dataView.textContent = JSON.stringify(checker.ua, null, "  ");
  dataView.textContent += "\n---------\n Available APIs \n";
  dataView.textContent += JSON.stringify(checker.availableAPIs(), null, "  ");

  if (checker.warnings) {
    alertView.textContent += JSON.stringify(checker.warnings, null, "  ");
  } else {
    alertView.textContent = "no warnings";
  }

  resultView.textContent += checker.result;
}
