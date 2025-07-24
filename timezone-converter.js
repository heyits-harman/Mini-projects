import { timeZones } from "./timezones.js";

const dropdowns = document.querySelectorAll(".dropdown-select");
for (let select of dropdowns){
  for(let zone of timeZones){
    let newOption = document.createElement("option");
    newOption.innerText = zone;
    newOption.value = zone;
    if (select.name === "fromZone" && zone === "Asia/Kolkata"){ 
      newOption.selected = "selected";
    } 
    else if (select.name === "toZone" && zone === "America/New_York"){
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
}

const btn = document.querySelector("#convertBtn");
btn.addEventListener('click', () => {
  const time = document.querySelector("#time").value;
  const splittedTime = time.split(":");
  
  const date = new Date();
  date.setHours(splittedTime[0]);
  date.setMinutes(splittedTime[1]);

  const fromZone = document.querySelector('select[name="fromZone"]').value;
  const toZone = document.querySelector('select[name="toZone"]').value;

  const { DateTime } = luxon;

  const hour = parseInt(splittedTime[0]);
  const minute = parseInt(splittedTime[1]);

  const fromTime = DateTime.fromObject(
   { hour: hour, minute: minute },
   { zone: fromZone });

  const toTime = fromTime.setZone(toZone);

  const finalTime = toTime.toFormat("hh:mm a");
  console.log(finalTime);

  document.querySelector("#output").innerText = finalTime;

})