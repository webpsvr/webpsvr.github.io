window.onload = main;

function main() {
  const button = document.getElementById("find-device-button");
  button.onclick = findDevice;
}

function findDevice() { 
  navigator.usb.requestDevice({filters: [
    { vendorId: 0x2a03}
  ]})
  .then(device => {
    console.log("device found ", device); 
  })
  .catch(error => {
    console.error(error); 
  });
}
