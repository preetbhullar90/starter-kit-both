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

const ReviewPage = (venueId) => {
  const scaleAnimationRef = useRef(new Animated.Value(0)).current;
  const opacityAnimationRef = useRef(new Animated.Value(1)).current;
  const [body, setCommentBody] = useState("");
  const [star_rating, setRating] = useState("");
  const [showPostComment, setShowPostComment] = useState(false);
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
      style={styles.backgroundImage}
    >
      {/* Pulsating Ring */}

      <Animated.View
        style={[
          styles.ring,
          { opacity: opacityAnimationRef },
          { transform: [{ scale: scaleAnimationRef }] },
        ]}
      />
      <View style={styles.container}>
        <TouchableOpacity onPress={togglePostComment}>
          <Image
            source={require("../_media_/write-a-review.png")}
            style={{ width: 300, height: 80 }}
          />
        </TouchableOpacity>

        {showPostComment && (
          <View style={styles.formContainer}>
            <TextInput
              multiline={true}
              style={styles.input}
              placeholder="My Review..."
              value={body}
              onChangeText={setCommentBody}
              editable={!isPostingComment}
              numberOfLines={10}
            />

            <View style={styles.inputs}>
              <AirbnbRating
                count={5}
                reviews={["Terrible", "Bad", "OK", "Good", "Excellent"]}
                defaultRating={0}
                size={30}
                onFinishRating={handleRating}
                reviewColor="#7789ea"
                unSelectedColor="#BDC3C7"
                selectedColor="#7789ea"
              />
              <Text
                style={{
                  fontSize: 20,
                  paddingBottom: 20,
                  paddingTop: 10,
                  marginBottom: 20,
                }}
              >
                Selected Rating: {star_rating}
              </Text>
            </View>

            {/* <TextInput
              style={styles.input}
              placeholder="Rating"
              value={star_rating}
              onChangeText={setRating}
              editable={!isPostingComment}
            /> */}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() =>
                  Platform.OS === "ios"
                    ? navigation.navigate("Home")
                    : navigation.push("Home")
                }
              >
                <Image
                  source={require("../_media_/Cancel.png")}
                  style={{ width: 50, height: 50 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleNewCommentSubmit}
                disabled={isPostingComment}
              >
                <Image
                  source={require("../_media_/Post.png")}
                  style={{ width: 120, height: 50 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    paddingHorizontal: 20,
    color: "#e6e6e6",
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    backgroundColor: "#333",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "#e6e6e6",
    // Double the height: increased to 200px
    height: 200,
    // Set fixed width: adjust as needed
    width: 300,
  },
  inputs: {
    backgroundColor: "#333",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 30,
    color: "#e6e6e6",
    // Double the height: increased to 200px
    height: 100,
    // Set fixed width: adjust as needed
    width: 300,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20, // Add some spacing below buttons
  },
  commentButton: {
    // Customize style for "Write a Comment" button here
    marginBottom: 20, // Add some spacing below button
  },
  //ring
  ring: {
    position: "absolute", // Make the ring absolute positioned
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: "#a3adf2",
    borderWidth: 1,
    borderColor: "#7789ea",
    opacity: 1,
    top: 0,
  },
});

export default ReviewPage;
