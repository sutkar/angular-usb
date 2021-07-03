import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {

  ngOnInit() { }

  selectDevice() {
    if (navigator.usb) {
      this.handleUSB();
    } else {
      console.error("WebUSB not enabled (chrome://flags/#new-usb-backend)");
    }
  }

  async handleUSB() {
    const usb = navigator.usb;

    const device = await usb.requestDevice({ filters: [{
        // vendorId: 0x045E, // Microsoft
        // productId: 0x028E // XBox 360 Controller
    }]});

    // const devices = await usb.getDevices(); Only show devices that the page is allowed to use [requestDevice(...)]

    console.log(device);
    await device.open();
    await device.selectConfiguration(1);

    await device.claimInterface(1);
    
    // const result = await device.transferIn(1, 20);

    // console.log(result)

    // const intData = new Int8Array(result.data.buffer);

    // console.log(intData)

    await device.releaseInterface(1);
    await device.close();
  }
}
