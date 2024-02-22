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
const ARScene = () => {
  const navigation = useNavigation();

  const [text, setText] = useState("Initializing AR...");
  const [position, setPosition] = useState(null);
  const [radius, setRadius] = useState(200);
  const [reviews, setReviews] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0);
  console.log(reviews);

  const exampleReviews = [
    {
      place_name: "TBC",
      author: "johnny 1",
      body: "Regular size comment",
      star_rating: 3,
      created_at: "2021-05-17",
    },
    {
      place_name: "TBC",
      author: "johnny 2",
      body: "Bigger size with some unnecessary gibberish comment",
      star_rating: 4,
      created_at: "2021-05-16",
    },
    {
      place_name: "TBC",
      author: "johnny 3",
      body: "Large size ridiculus amount of nonsense comment. Nothing useful here at all. I mean seriously what is the point of all this. I don't really want to know about the hair came out of your burger, or do I?",
      star_rating: 5,
      created_at: "2021-05-15",
    },
  ];

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
    navigation.navigate("CommentPage");
  };

  // Render reviews as ViroText components
  return (
    
    <ViroARScene onTrackingUpdated={onInitialized}>
      {reviews.map((review, index) => (
        <ViroFlexView
          key={index}
          height={4}
          width={6}
          position={[0, 0, -10]}
          transformBehaviors={["billboard"]}
          backgroundColor={"black"}
          onClickState={onClickState}
          style={{ opacity: 0.7 }}
        >
          <ViroFlexView
            backgroundColor={"white"}
            style={{ flex: 0.2, flexDirection: "row" }}
          >
            <ViroFlexView
              backgroundColor={"navy"}
              style={{ flex: 1, flexDirection: "row" }}
            >
              <ViroText
                text={`${review.name}`}
                fontSize={30}
                position={[0, index * 0.5, -2]}
                style={{
                  color: "black",
                  flex: 1,
                  textAlignVertical: "center",
                  textAlign: "center",
                }}
              />
            </ViroFlexView>
          </ViroFlexView>

          <ViroFlexView
            backgroundColor={"yellow"}
            style={{ flex: 0.25, flexDirection: "row" }}
          >
            <ViroText
              style={{
                color: "black",
                flex: 1,
                textAlignVertical: "center",
                textAlign: "center",
              }}
              text={`Rating: ${review.rating}     Reviews: (${exampleReviews.length})`}
              position={[0, index * 0.5, -2]}
              fontSize={30}
            />
          </ViroFlexView>

          <ViroFlexView
            backgroundColor={"black"}
            style={{ flex: 1, flexDirection: "row" }}
          >
            <ViroText
              style={{
                flex: 0.8,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              text={`Comment: ${exampleReviews[reviewIndex].body}`}
              fontSize={30}
            />
            <ViroText
              style={{
                flex: 0.2,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                fontFamily:""
              }}
              text={`Rating:${exampleReviews[reviewIndex].star_rating}`}
              fontSize={30}
            />
          </ViroFlexView>
        </ViroFlexView>
      ))}

      <ViroFlexView
      style={{opacity: 0.7}}
        height={1.5}
        width={2.5}
        position={[-2, -3.5, -12]}
        backgroundColor={"black"}
        onClickState={onResetReviewsClick}
      >
        <ViroText
          style={{
            color: "white",
            flex: 1,
            textAlignVertical: "center",
            textAlign: "center",
          }}
          text={"⏪ Back to Top"}
          fontSize={30}
        />
      </ViroFlexView>

      <ViroFlexView
        style={{opacity: 0.7}}
        height={1.5}
        width={2.5}
        position={[2, -3.5, -12]}
        backgroundColor={"green"}
        onClickState={onAddReviewClick}
      >
        <ViroText
          style={{
            color: "black",
            flex: 1,
            textAlignVertical: "center",
            textAlign: "center",
          }}
          text={"Add a Review 🗯"}
          fontSize={30}
        />
      </ViroFlexView>
    </ViroARScene>
  );
};

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontStyle: "bold",
    fontSize: 20,
    color: "#000",
    textAlign: "center",
  },
});

export default ARScene;
