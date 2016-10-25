"use strict";
window.onload = main;

let acc ={
  yaw : null,
  pitch : null,
  roll : null
}

function main() {
  const button = document.getElementById("find-device-button");
  const psvr = new PSVR();
  const deviceListView = document.getElementById("device-list-view");
  const debugView = document.getElementById("debug-view");
  let deviceInfo = {};

  setInterval(()=>{
    deviceListView.textContent = JSON.stringify(psvr.devices, null, "  ");
    debugView.textContent = JSON.stringify(deviceInfo, null, "  ") + "\n" + JSON.stringify(psvr.data, null, "  "); 
    if (psvr !== null ) {
      acc.yaw = psvr.data.yaw * 0.00025;
      acc.pitch = psvr.data.xAccel0 * 0.025;
      acc.roll = psvr.data.yAccel0;
      //console.log(acc);
    }
  }, 100);

  button.onclick = function() {
    psvr.findDevice()
    .then(() => {
      deviceInfo = psvr.deviceInfo; 
    })
    .then(psvr.poll.bind(psvr))
  }
}

