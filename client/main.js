"use strict";
window.onload = main;

function main() {
  const button = document.getElementById("find-device-button");
  const psvr = new PSVR();
  const view = document.getElementById("data-view");

  setInterval(()=>{
    view.textContent = JSON.stringify(psvr.data, null, "  "); 
  }, 100);

  button.onclick = function() {
    psvr.findDevice()
    .then(psvr.poll.bind(psvr));
  }
}

