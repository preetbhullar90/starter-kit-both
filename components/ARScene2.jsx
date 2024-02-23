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

import { calculateDistance } from "../utils";

//main styles file
import styles from "../styles"

// Import Fake(OWN) venue data
import venueData from "../_fake_data/venues.json";
import commentData from "../_fake_data/comments.json";

const ARScene2 = () => {
  const navigation = useNavigation();

  const [text, setText] = useState("Initializing AR...");
  const [position, setPosition] = useState(null);
  const [radius, setRadius] = useState(14300);
  const [reviews, setReviews] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    const fetchVenueData = async () => {
      if (position) {
        const { latitude, longitude } = position;
        // Filter venue data based on proximity to current location
        const nearbyVenues = venueData.venues.filter((venue) => {
          const venueLocation = venue.venue_location;
          if (venueLocation) {
            const distance = calculateDistance(
              latitude,
              longitude,
              venueLocation.latitude,
              venueLocation.longitude
            );
            console.log(`Distance to ${venue.venue_name}: ${distance} meters`);
            return distance <= radius;
          }
          return false;
        });
        const venuesWithComments = nearbyVenues.map((venue) => {
          const commentsForVenue = commentData.comments.filter(
            (comment) => comment.venue_id === venue.venue_id
          );
          return {
            ...venue,
            comments: commentsForVenue,
          };
        });

        setReviews(venuesWithComments);
      }
    };
    fetchVenueData();
  }, [position]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log("My Location ==>>", position);
        setPosition(position.coords);
      },
      (error) => {
        console.error("Error getting current position:", error);
      }
    );
  }, []);

  function onInitialized(state, reason) {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("AR tracking is normal!");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setText(
        "Tracking is unavailable. Try moving to a different location or adjusting your device orientation."
      );
    }
  }

  // cycle through reviews
  const onReviewClick = () => {
    if (reviews.length > 0) {
      const venueId = reviews[0].comments[reviewIndex] && reviews[0].comments[reviewIndex].venue_id;
      const venueWithComments = reviews.find((venue) => venue.venue_id === venueId);
      const commentsForVenue = venueWithComments && venueWithComments.comments;
      let nextIndex = reviewIndex + 1;

    if (commentsForVenue && commentsForVenue.length > 0) {
        nextIndex = nextIndex % commentsForVenue.length;
      }
      setReviewIndex(nextIndex);
    }
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

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {reviews.map((venue, index) => (
        <ViroFlexView
          style={styles.venueInfoAndReviewsContainer}
          key={index}
          position={[0, 0, -10]}
          transformBehaviors={["billboard"]}
          onClickState={onClickState}
        >
          
          <ViroFlexView  style={styles.displayedVenueTitleBar} >
            <ViroText
                text={`${venue.venue_type}:`}
                fontSize={20}
                position={[0, 0.5, -2]}
                style={{ color: "white" }}
            />
            <ViroText
                style={styles.displayedVenueTitleBarText}
                text={`${venue.venue_name}`}
                position={[0, index * 0.5, -2]}
            />
          </ViroFlexView>
          

          <ViroFlexView style={styles.displayedVenueAvgRatingBar} >
            <ViroText
              style={styles.displayedVenueAvgRatingBarText}
              text={`Average Rating: ${venue.venue_rating}, from ${venue.comments.length} Reviews`}
              position={[0, index * 0.5, -2]}
            />
          </ViroFlexView>

          <ViroFlexView style={styles.displayedReviewBody}>
            <ViroText style={styles.displayedReviewBodyText} text={`${venue.comments[reviewIndex].comment_author}: ${venue.comments[reviewIndex].comment_body}`} />
            <ViroText style={styles.displayedReviewRating} text={`${venue.comments[reviewIndex].comment_rating} Stars`} />
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


export default ARScene2;
