window.onload = main;

function main() {
  const button = document.getElementById("find-device-button");
  button.onclick = findDevice;
}

let device;

function findDevice() { 
  navigator.usb.requestDevice({filters: [
    { vendorId: 1356 }
  ]})
  .then(dev=> {
    console.log("device found ", dev); 
    device = dev;
    window["device"] = dev;
    return device.open();
  })
  .then(() => device.selectConfiguration(1)) // Select configuration #1 for the device.
  .then(() => device.claimInterface(5)) 
  .then(() => {
    const data = [0x11, 0x00, 0xaa, 0x08, 0x80, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00]; 
    const buf = new ArrayBuffer(data.length);
    const dataView = new DataView(buf);
    for (let i = 0; i < data.length; i++) { 
      dataView.setUint8(i, data[i])
    }
    device.transferOut(4, buf);
  })
  .then(() => device.claimInterface(4)) 
  .then(() => {
    loop();
  })
  .catch(error => {
    console.error(error); 
  });
}

function loop() {
  device.transferIn(3, 64)
  .then( rawData => {
    window.data = rawData.data;
    console.log(data.getInt16(21));
    return loop();
  });
}
