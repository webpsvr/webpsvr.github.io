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

let device;

class PSVR {

  constructor() {
    this._yaw = 0;
    this._roll = 0;
    this._pitch = 0;
    this._isWorn = 0;
  }

  findDevice() { 
    return navigator.usb.requestDevice({filters: [
      { vendorId: 1356, productId: 2479 }
    ]})
    .then(dev=> {
      console.log("device found ", dev); 
      this.device = dev;
      window["device"] = dev;
      return this.device.open();
    })
    .then(() => this.device.selectConfiguration(1)) // Select configuration #1 for the device.
    .then(() => this.device.claimInterface(5)) 
    .then(() => {
      const data = [0x11, 0x00, 0xaa, 0x08, 0x80, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00]; 
      const buf = new ArrayBuffer(data.length);
      const dataView = new DataView(buf);
      for (let i = 0; i < data.length; i++) { 
        dataView.setUint8(i, data[i])
      }
      this.device.transferOut(4, buf);
    })
    .then(() => this.device.claimInterface(4)) 
    .catch(error => {
      console.error(error); 
    });
  }

  poll() {
    this.device.transferIn(3, 64)
    .then( resp => {
      let rawData = resp.data;
      let 
      /*
        yawGyro0 = rawData.getInt16(20),
        pitchGyro0 = rawData.getInt16(22),
        rollGyro0 = rawData.getInt16(24),
        yawGyro1 = rawData.getInt16(36),
        pitchGyro1 = rawData.getInt16(38),
        rollGyro1 = rawData.getInt16(40)
        */
        yawGyro0 = rawData.getInt8(21),
        pitchGyro0 = rawData.getInt8(23),
        rollGyro0 = rawData.getInt8(25),
        yawGyro1 = rawData.getInt8(37),
        pitchGyro1 = rawData.getInt8(39),
        rollGyro1 = rawData.getInt8(41)
      ;
      this._yaw += yawGyro0 + yawGyro1 + 1 ;
      this._roll += rollGyro0 + rollGyro1;
      this._pitch += pitchGyro0 + pitchGyro1;

      this.data = {

        /*
        yawGyro0,
        pitchGyro0,
        rollGyro0,

        xAccel0: rawData.getInt16(26),
        yAccel0: rawData.getInt16(28),
        zAccel0: rawData.getInt16(30),

        yawGyro1,
        pitchGyro1,
        rollGyro1,

        xAccel1: rawData.getInt16(42),
        yAccel1: rawData.getInt16(44),
        zAccel1: rawData.getInt16(46),
      */
        yaw: this._yaw,
        roll: this._roll,
        pitch: this._pitch

      }; 

      return this.poll();
    });
  }

  addEventListener (listener) {
    this.listener = listener;
  }
}
