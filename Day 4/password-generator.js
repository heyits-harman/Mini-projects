window.addEventListener("DOMContentLoaded", () => {

  const displayLength = document.querySelector("#length-value"); 
  const length = document.querySelector("#length");
  const upperCaseCheck = document.querySelector("#uppercase");
  const lowerCaseCheck = document.querySelector("#lowercase");
  const numbersCheck = document.querySelector("#numbers");
  const symbolsCheck = document.querySelector("#symbols");
  const output = document.querySelector("#password");
  const generateBtn = document.querySelector("#generate");

  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+=-{}[]|:;<>,.?/~';

   length.addEventListener('change', () => {
    displayLength.innerText = length.value;
  })

  function createPool(){
    let pool = "";

    if(upperCaseCheck.checked){
    pool += uppercase;
    }
    if(lowerCaseCheck.checked){
      pool += lowercase;
    }
    if(numbersCheck.checked){
      pool += numbers;
    }
    if(symbolsCheck.checked){
      pool += symbols;
    }

    if(pool === ''){
      alert("Please select at least one character type!");
    }

    return pool;
  }

  function checkStrength(password){
    const strengthIndicator = document.querySelector("#strength-indicator");
    let strength = 0;

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const lengthScore = password.length >= 10 ? 2 : password.length >= 7 ? 1 : 0;

    strength = hasLowercase + hasUppercase + hasNumbers + hasSymbols + lengthScore;

    let label = '';
    let color = '';

    if (strength <= 2) {
      label = 'Weak';
      color = 'red';
    } else if (strength <= 4) {
      label = 'Medium';
      color = 'orange';
    } else {
      label = 'Strong';
      color = 'lime';
    }

    strengthIndicator.innerHTML = `Strength: ${label}`;
    strengthIndicator.style.color = color;
  }

  generateBtn.addEventListener('click', () => {
    
    const characterPool = createPool();
    const poolLength = characterPool.length;
    console.log(poolLength);
    let password = '';

    for (let i = 0; i <= length.value; i++){
      const randomIndex = Math.floor(Math.random() * poolLength);
      const randomChar = characterPool[randomIndex];

      password += randomChar;
    }

    output.value = password;

    checkStrength(password);

  })

  const copyBtn = document.getElementById('copy');

  copyBtn.addEventListener('click', () => {
    const password = output.value;

    if (!password) {
      alert('No password to copy!');
      return;
    }

    navigator.clipboard.writeText(password)
      .then(() => {
        alert('Password copied to clipboard!');
      })
      .catch(err => {
        alert('Failed to copy password.');
        console.error(err);
      });
  });

})