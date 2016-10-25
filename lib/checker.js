"use strict";

const AvailableBrowsers = {
  "Chrome 54": { 
    os: [
      "Mac OS X 10.11.6",
      "Mac OS X 10.11.5"
     ] 
  }
};

class Checker {
  constructor() {
    let ua = navigator.userAgent;
    this.warnings = {};
    if (!ua) {
      console.error("cannot get user agent");
      this.warinings["ua"] = "cannot get user agent";
    }
    this.ua = detect.parse(ua);

    this.result = this.judge();
  }

  judge() {
    if (AvailableBrowsers.hasOwnProperty(this.ua.browser.name)) {
      const availableOSs = AvailableBrowsers[this.ua.browser.name].os;
      if (availableOSs.hasOwnProperty(this.ua.os.name)) {
        return "available";
      }
    }
    return "maybe available";
  }

  availableAPIs() {
    return {
      "navigator.usb": "usb" in navigator,
      "navigator.usb.requestDevice": "requestDevice" in navigator["usb"]
    } 
  }
}

