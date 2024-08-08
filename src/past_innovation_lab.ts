/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { EmbeddedWebsite } from "@workadventure/iframe-api-typings";

//console.log('Script started successfully');

// Waiting for the API to be ready
WA.onInit().then( async() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)
    let droneRightBig: EmbeddedWebsite = await WA.room.website.get("drone-right-big");
    let droneLeftBig: EmbeddedWebsite = await WA.room.website.get("drone-left-big");
    let droneRightSmall: EmbeddedWebsite = await WA.room.website.get("drone-right-small");
    let droneLeftSmall: EmbeddedWebsite = await WA.room.website.get("drone-left-small");
    console.log("Julia test")

    const mapUrl = WA.room.mapURL
    const root = mapUrl.substring(0, mapUrl.lastIndexOf("/"))
  
    // Julia custom

    // dron animation
    WA.room.onEnterLayer("drone_zone").subscribe(() => {
      droneLeftBig.visible = true;
      droneLeftSmall.visible = true;
      droneRightBig.visible = true;
      droneRightSmall.visible = true;
      WA.room.hideLayer("drone-off");
    });
    
  WA.room.onLeaveLayer("drone_zone").subscribe(() => {
    droneLeftBig.visible = false;
    droneLeftSmall.visible = false;
    droneRightBig.visible = false;
    droneRightSmall.visible = false;
    WA.room.showLayer("drone-off");
    });
   
  WA.room.onEnterLayer("floor").subscribe(() => {
    console.log("Entered to floor")
    WA.room.hideLayer("roof");
    WA.room.hideLayer("walls-bg-front");
    WA.room.hideLayer("sign");
  });
      
  WA.room.onLeaveLayer("floor").subscribe(() => {
      WA.room.showLayer("roof");
      WA.room.showLayer("walls-bg-front");
      WA.room.showLayer("facade-furniture-bg");
      WA.room.showLayer("sign");
    });
      WA.room.onEnterLayer("floor1").subscribe(() => {
        WA.room.hideLayer("roof1");
        WA.room.hideLayer("walls-bg-front1");
        WA.room.hideLayer("sign1");
      });
      
    WA.room.onLeaveLayer("floor1").subscribe(() => {
        WA.room.showLayer("roof1");
        WA.room.showLayer("walls-bg-front1");
        WA.room.showLayer("facade-furniture-bg1");
        WA.room.showLayer("sign1");
      });
      WA.room.onEnterLayer("floor2").subscribe(() => {
        WA.room.hideLayer("roof2");
        WA.room.hideLayer("walls-bg-front2");
        WA.room.hideLayer("sign2");
      });
      
    WA.room.onLeaveLayer("floor2").subscribe(() => {
        WA.room.showLayer("roof2");
        WA.room.showLayer("walls-bg-front2");
        WA.room.showLayer("facade-furniture-bg2");
        WA.room.showLayer("sign2");
      });

      WA.room.onEnterLayer("rooms_floor").subscribe(() => {
        WA.room.hideLayer("facade-furniture-fg");
        WA.room.hideLayer("facade");
        WA.room.hideLayer("facade-furniture-bg");
      });
      
    WA.room.onLeaveLayer("rooms_floor").subscribe(() => {
        WA.room.showLayer("facade-furniture-fg");
        WA.room.showLayer("facade");
        WA.room.showLayer("facade-furniture-bg");
      });
    
WA.ui.actionBar.addButton({
  id: 'privacy-btn',
  type: 'action',
  imageSrc: root + '/lock.svg',
  toolTip: "Privacy Policy",
  callback: () => {
      WA.ui.modal.openModal({
          title: "Privacy policy",
          src: "https://www.pastfoundation.org/privacy-policy",
          allowApi: false,
          allow: "microphone; camera",
          position: "center",
      }, () => WA.ui.modal.closeModal())
  }
});

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
      console.log('Scripting API Extra ready');
      // Update current map name
    
  }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
