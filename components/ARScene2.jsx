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

// Import Fake(OWN) venue data
import venueData from "../_fake_data/venues.json";
import commentData from "../_fake_data/comments.json";


const ARScene2 = () => {
  const navigation = useNavigation();

  const [text, setText] = useState("Initializing AR...");
  const [position, setPosition] = useState(null);
  const [radius, setRadius] = useState(30);
  const [reviews, setReviews] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0);


  useEffect(() => {
    const fetchReviewData = async () => {
      if (position) {
        const { latitude, longitude } = position;
        // Filter venue data based on proximity to current location
        const nearbyVenues = venueData.venues.filter((venue) => {
            console.log(venue);
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
        setReviews(nearbyVenues);
      }
    };
    fetchReviewData();
  }, [position]);


  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('My Location ==>>', position);
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


  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {reviews.map((venue, index) => (
        <ViroFlexView
          key={index}
          height={4}
          width={6}
          position={[0, 0, -10]}
          transformBehaviors={["billboard"]}
          backgroundColor={"black"}
        >
          {/* Render venue details here */}
          <ViroText
            text={venue.venue_name}
            fontSize={30}
            position={[0, 0.8, -2]}
            style={{ color: "white" }}
          />
          <ViroText
            text={`Type: ${venue.venue_type}`}
            fontSize={20}
            position={[0, 0.5, -2]}
            style={{ color: "white" }}
          />
          <ViroText
            text={`Address: ${venue.venue_address}`}
            fontSize={20}
            position={[0, 0.2, -2]}
            style={{ color: "white" }}
          />
        </ViroFlexView>
      ))}
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

export default ARScene2;
