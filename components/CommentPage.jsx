import React, { useContext, useState } from "react";
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
  Button,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
import { postReviews } from "../utils";


const CommentPage = (venueId) => {
  const [body, setCommentBody] = useState("");
  const [star_rating, setRating] = useState('');
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
        setRating('');
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error)
        
      });
  };

  return (
    <ImageBackground
      source={require("../_media_/background-03.jpg")}
      style={styles.backgroundImage}
    >
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
              />
              <Text style={{ fontSize: 20, paddingBottom: 20, paddingTop: 10,marginBottom:20 }}>
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
});



export default CommentPage;
