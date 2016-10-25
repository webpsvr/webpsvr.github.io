"use strict";
window.onload = main;

function main() {
  const button = document.getElementById("find-device-button");
  const psvr = new PSVR();
  const view = document.getElementById("data-view");
  let deviceInfo = {};

  setInterval(()=>{
    view.textContent = JSON.stringify(deviceInfo, null, "  ") + "\n" + JSON.stringify(psvr.data, null, "  "); 
  }, 100);

  button.onclick = function() {
    psvr.findDevice()
    .then(() => {
      for (let key in psvr.device) {
        deviceInfo[key] = psvr.device[key];
      }
    })
    .then(psvr.poll.bind(psvr))
  }
}

