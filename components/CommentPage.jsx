import React, { useState } from "react";
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

const CommentPage = () => {
  const [commentBody, setCommentBody] = useState("");
  const [showPostComment, setShowPostComment] = useState(true);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const navigation = useNavigation();

  const togglePostComment = () => {
    setShowPostComment(!showPostComment);
  };

  const handleNewCommentSubmit = () => {
    // Handle submitting the comment
    setIsPostingComment(true);
    // Logic here to submit the comment
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
              placeholder="This place is too square..."
              value={commentBody}
              onChangeText={setCommentBody}
              editable={!isPostingComment}
              numberOfLines={10}
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
