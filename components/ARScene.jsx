import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import {
  ViroARScene,
  ViroFlexView,
  ViroText,
  ViroTrackingStateConstants
} from "@viro-community/react-viro";
import Geolocation from "@react-native-community/geolocation";
import { useNavigation } from "@react-navigation/native";

//main styles file
import styles from "../styles"

// Main AR Scene component
const ARScene = () => {
  const navigation = useNavigation();

  const [text, setText] = useState("Initializing AR...");
  const [position, setPosition] = useState(null);
  const [radius, setRadius] = useState(100);
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

  // cycle through reviews ()
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

  //add review ()
  const onAddReviewClick = () => {
    navigation.navigate("CommentPage");
  };

  // Render reviews as ViroText components
  return (
    
    <ViroARScene onTrackingUpdated={onInitialized}>
      {reviews.map((review, index) => (
        
        <ViroFlexView
          style={styles.venueInfoAndReviewsContainer}
          key={index}
          position={[0, 0, -10]}
          transformBehaviors={["billboard"]}
          onClickState={onClickState}
        >

            <ViroFlexView  style={styles.displayedVenueTitleBar} >
              <ViroText
                style={styles.displayedVenueTitleBarText}
                text={`${review.name}`}
                position={[0, index * 0.5, -2]}
              />
            </ViroFlexView>
      
          <ViroFlexView style={styles.displayedVenueAvgRatingBar} >
            <ViroText
              style={styles.displayedVenueAvgRatingBarText}
              text={`Average Rating: ${review.rating}, from ${exampleReviews.length} Reviews`}
              position={[0, index * 0.5, -2]}
            />
          </ViroFlexView>

          <ViroFlexView style={styles.displayedReviewBody}>
            <ViroText style={styles.displayedReviewBodyText} text={`${exampleReviews[reviewIndex].body}`} />
            <ViroText style={styles.displayedReviewRating} text={`${exampleReviews[reviewIndex].star_rating} Stars`} />
          </ViroFlexView>

        </ViroFlexView>
      ))}
      
      <ViroFlexView
        style={styles.mostRecentReviewButton}
        position={[-2, -3.5, -12]}
        onClickState={onResetReviewsClick}
      >
        <ViroText style={styles.mostRecentReviewButtonText} text={"⏪ Back to Top"} />
      </ViroFlexView>

      <ViroFlexView
        style={styles.addReviewButton}
        position={[2, -3.5, -12]}
        onClickState={onAddReviewClick}
      >
        <ViroText style={styles.addReviewButtonText} text={"Add a Review 🗯"} />
      </ViroFlexView>

    </ViroARScene>
  );
};


export default ARScene;
