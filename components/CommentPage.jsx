import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "./CurrentUser";
import {
  Image,
  ImageBackground,
  View,
  TextInput,
  Button,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchVenues, postReviews } from "../utils";

const CommentPage = (venueId) => {
  const [body, setCommentBody] = useState("");
  const [star_rating, setRating] = useState("");
  const [showPostComment, setShowPostComment] = useState(true);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const navigation = useNavigation();



const { currentUser } = useContext(CurrentUserContext);
const { user_id, author, name } = currentUser;

  //  const reviewObj = {
  //    venue_id: 1,
  //    place_name: "Sunflower Fields",
  //  };
  
  // const user_id = currentUser.user_id
 
  
//   const venue_id = reviewObj.venue_id;
//   const place_name = reviewObj.place_name;
// console.log(typeof reviewObj.author,'2')

  const both = venueId.route.params;
  const { venue_id, place_name } = both;
  console.log('VenueId:', venue_id);
  console.log('Place Name:',place_name);
  
  
  useEffect(() => {
    fetchVenues()
      .then((response) => {
        //console.log(response.venues, "response");
        setData(response.venues);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response);
        setLoading(false);
      });
  }, []);
  
  


  const togglePostComment = () => {
    setShowPostComment(!showPostComment);
  };

  const handleNewCommentSubmit = () => {
    // Handle submitting the comment
    setIsPostingComment(true);
    // Logic here to submit the comment

     setLoading(true);
     setError(null);
     postReviews(venue_id, user_id, author, place_name, body, star_rating)
       .then(() => {
         setCommentBody("");
         setRating("");
         setLoading(false);
         navigation.navigate("Home");
       })
       .catch((error) => {
         setError(error);
         setLoading(false);
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
              placeholder="My Comment..."
              value={body}
              onChangeText={setCommentBody}
              editable={!isPostingComment}
              numberOfLines={10}
            />

            <TextInput
              style={styles.input}
              placeholder="Rating"
              value={star_rating}
              onChangeText={setRating}
              editable={!isPostingComment}
            />

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
                onPress={() =>
                  Platform.OS === "ios"
                    ? handleNewCommentSubmit && navigation.navigate("Home")
                    : handleNewCommentSubmit && navigation.push("Home")
                }
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
