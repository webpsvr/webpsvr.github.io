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
    this.allApiAvailable = true;
    if (!ua) {
      console.error("cannot get user agent");
      this.warinings["ua"] = "cannot get user agent";
    }
    this.ua = detect.parse(ua);

    this.checkAvailableAPIs();
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

    if (!this.allApiAvailable) {
      return "cannot use api, check flags or options";
    }

    return "maybe available";
  }

  checkAvailableAPIs() {
    this.apis["navigator.usb"] = "usb" in navigator;
    this.apis["navigator.usb.requestDevice"] = this.apis["navigator.usb"] && "requestDevice" in navigator.usb;

    for (let key in this.apis) {
      this.allApiAvailable = this.allApiAvailable && this.apis[key];
    }
  }
}

