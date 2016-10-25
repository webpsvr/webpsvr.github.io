"use strict";
window.onload = main;

function main() {
  const button = document.getElementById("find-device-button");
  const psvr = new PSVR();
  const deviceListView = document.getElementById("device-list-view");
  const debugView = document.getElementById("debug-view");
  let deviceInfo = {};

  setInterval(()=>{
    deviceListView.textContent = JSON.stringify(psvr.devices, null, "  ");
    debugView.textContent = JSON.stringify(deviceInfo, null, "  ") + "\n" + JSON.stringify(psvr.data, null, "  "); 
  }, 100);

  button.onclick = function() {
    psvr.findDevice()
    .then(() => {
      deviceInfo = psvr.deviceInfo; 
    })
    .then(psvr.poll.bind(psvr))
  }
}

