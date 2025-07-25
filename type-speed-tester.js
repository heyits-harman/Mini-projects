import { sentences } from "./sentences.js";

window.addEventListener("DOMContentLoaded", () => {
 
  const sentence = document.querySelector("#sentenceBox");
  const input = document.querySelector("#inputBox");
  const restartBtn = document.querySelector("#restartBtn"); 

  const time = document.querySelector("#time");
  const wpm = document.querySelector("#wpm");
  const errors = document.querySelector("#errors");

  let currentSentence = "";
  let isStarted = false;
  let startTime = 0;
  let errorCount = 0;

  function loadSentence(){
    const randomIndex = Math.floor(Math.random() * sentences.length);
    currentSentence = sentences[randomIndex];
    sentence.textContent = currentSentence;
    input.value = "";
    time.textContent = "0s";
    wpm.textContent = "0";
    errors.textContent = "0";

    isStarted = false;
    startTime = 0;
    errorCount = 0;
  }

  // Load initial sentence
  loadSentence();
  
  // Restart button event listener
  restartBtn.addEventListener('click', loadSentence);

  input.addEventListener('input', () => {
    console.log("input event listener called");

    if(!isStarted){
      startTime = Date.now();
      isStarted = true;
    }

    const originalText = sentence.textContent;
    const typedText = input.value;

    // Reset and recalculate errors
    errorCount = 0;
    for (let i = 0; i < typedText.length; i++){
      if (originalText[i] !== typedText[i]){
        errorCount++;
      }
    }
    errors.textContent = errorCount;

    // Calculate real-time stats
    const elapsedTimeInSeconds = (Date.now() - startTime) / 1000;
    time.textContent = `${elapsedTimeInSeconds.toFixed(1)}s`;

    if (typedText.length > 0) {
      const inMinutes = elapsedTimeInSeconds / 60;
      const numberOfWords = typedText.length / 5; // Count typed characters
      const calculatedWPM = Math.round(numberOfWords / inMinutes);
      wpm.textContent = calculatedWPM;
    }

    // Check if completed
    if (originalText === typedText){
      const elapsedTimeInSeconds = (Date.now() - startTime) / 1000;
      const inMinutes = elapsedTimeInSeconds / 60;

      const numberOfWords = originalText.length / 5;
      const calculatedWPM = Math.round(numberOfWords / inMinutes);

      time.textContent = `${elapsedTimeInSeconds.toFixed(2)}s`;
      wpm.textContent = `${calculatedWPM} WPM - Complete!`;
    }
  });

});