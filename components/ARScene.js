import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import {
  ViroARScene,
  ViroFlexView,
  ViroText,
  ViroTrackingStateConstants,
} from "@viro-community/react-viro";
import Geolocation from "@react-native-community/geolocation";
import { useNavigation } from "@react-navigation/native";

// Main AR Scene component
const ARSceneWithLocation = () => {
 const navigation = useNavigation()

  const [text, setText] = useState("Initializing AR...");
  const [position, setPosition] = useState(null);
  const [radius, setRadius] = useState(300);
  const [reviews, setReviews] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0);
  console.log(reviews)


  const exampleReviews = [
    {
      place_name: "TBC",
      author: "johnny 1",
      body: "good",
      star_rating: 3,
      created_at : "2021-05-17"
    },
    {
    place_name: "TBC",
    author: "johnny 2",
    body: "good good",
    star_rating: 4,
    created_at : "2021-05-16"
    },
    {
    place_name: "TBC",
    author: "johnny 3",
    body: "good good goood",
    star_rating: 5,
    created_at : "2021-05-15"    
    } ]


  // Fetch reviews from Google Places API
  const fetchReviews = async (latitude, longitude) => {
    const apiKey = "AIzaSyAAx2D0bE34UFYJUsX2ymxmtJmFX86Vqjk";
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }
  };

  // Fetch review data on component mount
  useEffect(() => {
    const fetchReviewData = async () => {
      if (position) {
        const { latitude, longitude } = position;
        const reviews = await fetchReviews(latitude, longitude);
        setReviews(reviews);
      }
    };
    fetchReviewData();
  }, [position]);

  // Get device's current position
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setPosition(position.coords);
      },
      (error) => {
        console.error("Error getting current position:", error);
      }
    );
  }, []);

  // Initialize AR scene
  function onInitialized(state, reason) {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("This is Bananas!");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setText(
        "Tracking is unavailable. Try moving to a different location or adjusting your device orientation."
      );
    }
  }

  // cycle through reviews
  const onReviewClick = () => {
    setReviewIndex((prevIndex) => (prevIndex + 1) % exampleReviews.length);
  };
  const onClickState = (stateValue, position, source) => {
    if (stateValue === 3) {
      onReviewClick();
    }
  };

  //go back to the lastest review ()
  const onResetReviewsClick = () => {
    setReviewIndex(0);
    
  };

  //add review
  const onAddReviewClick = () => {
   navigation.navigate("CommentPage")
  };


  // Render reviews as ViroText components
  return (
    
    <ViroARScene onTrackingUpdated={onInitialized}>
      {reviews.map((review, index) => (

        <ViroFlexView
          key={index}
          height={2.5}
          width={5}
          position={[0, 0, -10]}
          transformBehaviors={["billboard"]}
          backgroundColor={"white"}
          onClickState={onClickState}
        >
          <ViroFlexView
            backgroundColor={"white"}
            style={{ flex: 0.2, flexDirection: "row" }}
          >
            <ViroFlexView backgroundColor={"white"} style={{ flex: 0.1 }}>
              {/* <ViroImage
                style={{ flex: 1 }}
                source={require("./ReviewStar.png")}
              /> */}
            </ViroFlexView>

            <ViroFlexView
              backgroundColor={"yellow"}
              style={{ flex: 0.9, flexDirection: "row", opacity: 0.7 }}
            >
              <ViroText
                text={`Rating: ${review.rating}     Reviews: (${exampleReviews.length})`}
                position={[0, index * 0.5, -2]}

                style={styles.helloWorldTextStyle}
              />
            </ViroFlexView>
          </ViroFlexView>

          <ViroFlexView
            backgroundColor={"green"}
            style={{ flex: 0.25, flexDirection: "row", opacity: 0.7 }}
          >
            <ViroText
              style={{ color: "black", flex: 1 }}
              text={`${review.name}`}
              fontSize={30}
            />
          </ViroFlexView>

          <ViroFlexView
            backgroundColor={"white"}
            style={{ flex: 0.8, flexDirection: "row", opacity: 0.5 }}
          >
            <ViroText
              style={{ color: "black", flex: 1 }}
              text={`user rated: ${exampleReviews[reviewIndex].star_rating}`}
              fontSize={30}
            />
            
            <ViroText
              style={{ color: "black", flex: 1.5 }}
              text={`${exampleReviews[reviewIndex].body}`}
              fontSize={30}
            />

          </ViroFlexView>
          
        </ViroFlexView>

        
      ))}

      <ViroFlexView
        height={0.5}
        width={2}
        position={[-1.5, -2, -10]}
        backgroundColor={"blue"}
        onClickState={onResetReviewsClick}
        
      >
        <ViroText
          style={{ color: "white", flex: 1, textAlignVertical: "center", textAlign: "center" }}
          text={"Back to latest review"}
          fontSize={20}
        />
        </ViroFlexView>
        <ViroFlexView
        height={0.5}
        width={2}
        position={[1.5, -2, -10]}
        backgroundColor={"blue"}
        onClickState={onAddReviewClick}
      >
        <ViroText
          style={{ color: "white", flex: 1, textAlignVertical: "center", textAlign: "center" }}
          text={"Add a review"}
          fontSize={20}
        />
        </ViroFlexView>
    </ViroARScene>
  );
};

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontStyle: "bold",
   fontSize:20,
    color: "#000",
    textAlign: "center",

  },
});

export default ARSceneWithLocation;
