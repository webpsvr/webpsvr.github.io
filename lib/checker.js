"use strict";

const AvailableBrowsers = {
  "Chrome 54": { 
    os: [
      "Mac OS X 10.11.6",
      "Mac OS X 10.11.5"
     ] 
  }
};

const UnavailableBrowsers = {
  "Chrome": {
    "type": "under",
    "version": 53    
  },
  
  "Firefox": {
    "type": "all"
  },
  
  "Safari": {
    "type": "all"
  }
}

class Checker {
  constructor() {
    let ua = navigator.userAgent;
    this.apis = {};
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

    if (UnavailableBrowsers.hasOwnProperty(this.ua.browser.family)) {
      const cond = UnavailableBrowsers[this.ua.browser.family];
      if (cond.type === "under") {
        if (cond.version >= this.ua.browser.version) {
          return `${this.ua.browser.family} version under ${cond.version} is unavailable`;
        }
      }

      if (cond.type === "all") {
        return `${this.ua.browser.family} is unavailable`;
      }
    }
    return "maybe available";
  }

  availableAPIs() {
    this.apis["navigator.usb"] = navigator.hasOwnProperty("usb");
    this.apis["navigator.usb.requestDevice"] = this.apis["navigator.usb"] && navigator["usb"].hasOwnProperty("requestDevice");
    return this.apis;
  }
}

