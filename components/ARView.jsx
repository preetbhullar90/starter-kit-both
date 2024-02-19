import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  ViroARScene,
  ViroText,
  ViroTrackingStateConstants,
  ViroFlexView,
  ViroImage,
} from "@viro-community/react-viro";

const ARView = () => {
  const [text, setText] = useState("Initializing AR...");

  function onInitialized(state, reason) {
    console.log("guncelleme", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("This is Bananas!");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  const onButtonClick = () => {
    // Add your button click logic here
    console.log("Button Clicked!");
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroFlexView
	         height={2.5}
	         width={5}
	         position={[0,0,-10]}
	         transformBehaviors={["billboard"]}
	         backgroundColor={'white'}>

        	<ViroFlexView backgroundColor={'white'} style={{flex:0.2,flexDirection: 'row'}} >
          	
            	<ViroFlexView backgroundColor={'white'} style={{flex:0.1}} >
                
          			<ViroImage style={{flex:1}} source={require('./ReviewStar.png')} />
          		</ViroFlexView>

          		<ViroFlexView backgroundColor={'yellow'} style={{flex:0.9,flexDirection: 'row', opacity: 0.7}} >
              <ViroText
              style={{color: 'black', flex:1}}
        			text= { ' Place name'}
        			fontSize={30} />
          		</ViroFlexView>
        	</ViroFlexView>


          <ViroFlexView backgroundColor={'green'} style={{flex:0.25,flexDirection: 'row', opacity: 0.7}} >
              <ViroText
              style={{color: 'black', flex:1}}
        			text= { ' User name'}
        			fontSize={30} />
          		</ViroFlexView>


        	<ViroFlexView backgroundColor={'white'} style={{flex:0.8,flexDirection: 'row', opacity:0.5}} >
        		<ViroText
              style={{color: 'black', flex:1}}
        			text={'Body... ...'}
        			fontSize={30} />
        	</ViroFlexView>

        </ViroFlexView>

    </ViroARScene>
  );
};

export default ARView;

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});