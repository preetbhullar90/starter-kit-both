import React, { useContext, useEffect, useRef, useState } from "react";
import { CurrentUserContext } from "./CurrentUser";
import {
  Image,
  ImageBackground,
  View,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
import { postReviews } from "../utils";

//main styles file
import styles from "../styles";

const ReviewPage = (venueId) => {
  const scaleAnimationRef = useRef(new Animated.Value(0)).current;
  const opacityAnimationRef = useRef(new Animated.Value(1)).current;
  const [body, setCommentBody] = useState("");
  const [star_rating, setRating] = useState("");
  const [showPostComment, setShowPostComment] = useState(true);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const navigation = useNavigation();
  const { currentUser } = useContext(CurrentUserContext);
  const { user_id, username, name } = currentUser;
  const author = username;
  const venue_id = venueId.route.params.venue_id;
  const place_name = venueId.route.params.place_name;
  console.log("Id:", venue_id);
  console.log("Place:", place_name);
  const togglePostComment = () => {
    setShowPostComment(!showPostComment);
  };
  const handleRating = (rating) => {
    setRating(rating);
  };
  const handleNewCommentSubmit = () => {
    // Handle submitting the comment
    setIsPostingComment(true);
    // Logic here to submit the comment
    if (Platform.OS === "ios") {
      navigation.navigate("Home");
    } else {
      navigation.push("Home");
    }
    postReviews(venue_id, user_id, author, place_name, body, star_rating)
      .then(() => {
        setCommentBody("");
        setRating("");
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //scanning ring animation
  useEffect(() => {
    const scaleAnimation = Animated.loop(
      Animated.timing(scaleAnimationRef, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    );
    const opacityAnimation = Animated.loop(
      Animated.timing(opacityAnimationRef, {
        toValue: 0,
        duration: 3500,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    );
    scaleAnimation.start();
    opacityAnimation.start();
    return () => {
      scaleAnimation.stop();
      opacityAnimation.stop();
    };
  }, [scaleAnimationRef, opacityAnimationRef]);

  return (
    <ImageBackground
      source={require("../_media_/layered-steps-haikei.png")}
      style={styles.reviewPageBackgroundImage}
    >
      {/* Pulsating Ring */}
      <Animated.View
        style={[
          styles.reviewPageRing,
          { opacity: opacityAnimationRef },
          { transform: [{ scale: scaleAnimationRef }] },
        ]}
      />
      <View style={styles.reviewPageContainer}>
        <TouchableOpacity onPress={togglePostComment}>
          <Image
            source={require("../_media_/review-ar-05-icon.png")}
            style={{ width: 120, height: 90, alignSelf: "center" }}
          />
        </TouchableOpacity>
        {showPostComment && (
          <View style={styles.reviewPageFormContainer}>
            <TextInput
              multiline={true}
              style={styles.reviewPageBodyInput}
              placeholder="What did you think?"
              placeholderTextColor="#7789EA"
              value={body}
              onChangeText={setCommentBody}
              editable={!isPostingComment}
              numberOfLines={10}
            />
            <View style={styles.reviewPageRatingInput}>
              <AirbnbRating
                count={5}
                reviews={["Terrible", "Bad", "OK", "Good", "Excellent"]}
                defaultRating={3}
                size={30}
                onFinishRating={handleRating}
                reviewColor="#7789EA"
                unSelectedColor="#BDC3C7"
                selectedColor="#7789EA"
              />
            </View>
            <View style={styles.reviewPageButtonContainer}>
              <TouchableOpacity
                onPress={() =>
                  Platform.OS === "ios"
                    ? navigation.navigate("Home")
                    : navigation.push("Home")
                }
              >
                <Image
                  source={require("../_media_/icons8-cancel-100.png")}
                  style={{ width: 75, height: 75 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleNewCommentSubmit}
                disabled={isPostingComment}
              >
                <Image
                  source={require("../_media_/icons8-submit-100.png")}
                  style={{ width: 100, height: 100 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default ReviewPage;
