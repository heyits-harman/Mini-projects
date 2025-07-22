//Day 1
//Building a digital clock

let is24Hour = true; // Start with 24-hour format since checkbox is unchecked

function updateClock(){
  const now = new Date();
  const hour = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();

  let displayHour = hour;
  let period = "";

  if(!is24Hour){
    // 12-hour format logic
    period = hour >= 12 ? "PM" : "AM";
    displayHour = hour % 12;
    displayHour = displayHour === 0 ? 12 : displayHour;
  } else {
    // 24-hour format - still show AM/PM period
    period = hour >= 12 ? "PM" : "AM";
  }

  const time = `${displayHour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  
  document.querySelector("#time").innerText = time;
  document.querySelector("#period").innerText = period;
}

setInterval(() => {
  updateClock();
}, 1000);

const toggle = document.querySelector("#toggleFormat");
const label = document.querySelector(".label-text");

toggle.addEventListener("change", () => {
  is24Hour = !toggle.checked; // Unchecked = 24-hour, Checked = 12-hour
  label.innerText = toggle.checked ? "12-Hour" : "24-Hour";
  updateClock();
});

// Initialize the clock on page load
updateClock();