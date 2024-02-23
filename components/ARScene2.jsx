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

import {
  calculateDistance,
  fetchReviews,
  fetchUsers,
  fetchVenues,
} from "../utils";

//main styles component
import styles from "../styles";

const ARScene2 = () => {
  const navigation = useNavigation();
  const [text, setText] = useState("Initializing AR...");
  const [position, setPosition] = useState(null);
  const [radius, setRadius] = useState(300);
  const [venues, setVenues] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [data, setData] = useState([]);
  const [venue_id, setVenueId] = useState(null);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [nearbyVenues, setNearbyVenues] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState(null);

  //console.log(reviews)

  useEffect(() => {
    fetchVenues()
      .then((response) => {
        //console.log(response.venues, "response");
        setVenues(response.venues);
        // setLoading(false);
      })
      .catch((error) => {
//     setError(error.response);
        // setLoading(false);
      });

    // fetchVenueById(venue_id)
    //   .then((response) => {
    //     console.log(response, "id");
    //     setData1(response.venue);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     setError(error);
    //     setLoading(false);
    //   });

    fetchUsers()
      .then((response) => {
        //console.log(response, "response");
        setUsers(response);
      })
      .catch((error) => {
        //setError(error);
        // setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchVenues()
      .then((response) => {
        setReviews(response.venues);
        //  setLoading(false);
      })
      .catch((error) => {
        //setError(error.response);
        //  setLoading(false);
      });

    fetchReviews(selectedVenueId)
      .then((response) => {
        setNewReviews(response.reviews);
        //  setLoading(false);
      })
      .catch((error) => {
        //setError(error.response);
        //  setLoading(false);
      });
  }, [selectedVenueId]);

  useEffect(() => {
    const fetchVenueData = async () => {
      if (position) {
        const { latitude, longitude } = position;
        // Filter venue data based on proximity to current location
        const nearbyVenues = venues.filter((venue) => {
          console.log("Nearby Venue ==> ", venue);
          if (venue.latitude && venue.longitude) {
            const distance = calculateDistance(
              latitude,
              longitude,
              venue.latitude,
              venue.longitude
            );
            // console.log(`Distance to ${venue.place_name}: ${distance} meters`);
            return distance <= radius;
          }
          return false;
        });
        console.log("Nearby>>>", nearbyVenues);
        setNearbyVenues(nearbyVenues);
      }
    };
    fetchVenueData();
  }, [position]);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      (position) => {
        console.log("My Location ==>>", position);
        setPosition(position.coords);
      },
      (error) => {
        console.error("Error getting current position:", error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 2, // Update location when the device moves at least 2 meters
        timeout: 5000, // Cancel if location retrieval takes too long
      }
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
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
      const venueId =
        reviews[0].comments[reviewIndex] &&
        reviews[0].comments[reviewIndex].venue_id;
      const venueWithComments = reviews.find(
        (venue) => venue.venue_id === venueId
      );
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
  const onAddReviewClick = (venue_id, place_name) => {
    //console.log(venue_id)
    setSelectedVenueId(venue_id, place_name);
    navigation.navigate("CommentPage", { venue_id, place_name });
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {nearbyVenues &&
        nearbyVenues.length > 0 &&
        nearbyVenues.map((venue, index) => (
          <ViroFlexView
            style={styles.venueInfoAndReviewsContainer}
            key={index}
            position={[index * -10, 0, -10]}
            transformBehaviors={["billboard"]}
            onClickState={onClickState}
          >
            <ViroFlexView style={styles.displayedVenueTitleBar}>
              <ViroText
                text={`${venue.venue_id}:`}
                fontSize={20}
                position={[0, 0.5, -2]}
                style={{ color: "white" }}
              />
              <ViroText
                style={styles.displayedVenueTitleBarText}
                text={`${venue.place_name}`}
                position={[0, index * 0.5, -2]}
              />
            </ViroFlexView>

            <ViroFlexView style={styles.displayedVenueAvgRatingBar}>
              {/* <ViroText
              style={styles.displayedVenueAvgRatingBarText}
              text={`Average Rating: ${venue.average_star_rating}, from ${venue.comments.length} Reviews`}
              position={[0, index * 0.5, -2]}
            />
          </ViroFlexView>

          <ViroFlexView style={styles.displayedReviewBody}>
            <ViroText
              style={styles.displayedReviewBodyText}
              text={`${venue.comments[reviewIndex].comment_author}: ${venue.comments[reviewIndex].comment_body}`}
            />
            <ViroText
              style={styles.displayedReviewRating}
              text={`${venue.comments[reviewIndex].comment_rating} Stars`}
            /> */}
            </ViroFlexView>
            <ViroFlexView
              style={styles.mostRecentReviewButton}
              position={[-2, -4, -3]}
              onClickState={onResetReviewsClick}
            >
              <ViroText
                style={styles.mostRecentReviewButtonText}
                text={"Back to Top"}
              />
            </ViroFlexView>

            <ViroFlexView
              style={styles.addReviewButton}
              position={[2, -4, -3]}
              onClickState={() =>
                onAddReviewClick(venue.venue_id, venue.place_name)
              }
            >
              <ViroText
                style={styles.addReviewButtonText}
                text={"Add a Review"}
              />
            </ViroFlexView>
          </ViroFlexView>
        ))}
    </ViroARScene>
  );
};

export default ARScene2;
