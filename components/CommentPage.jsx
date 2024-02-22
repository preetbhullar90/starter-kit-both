import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Platform, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";

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
    <ImageBackground source={require("../_media_/background-01.jpg")} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Button
          title="Write a Comment ✍"
          onPress={togglePostComment}
          color="black"
          style={styles.commentButton}
        />
        {showPostComment && (
          <View style={styles.formContainer}>
            <TextInput
              multiline={true}
              style={styles.input}
              placeholder="My Comment..."
              value={commentBody}
              onChangeText={setCommentBody}
              editable={!isPostingComment}
              numberOfLines={10}
            />
            <View style={styles.buttonContainer}>
              <Button
                title="❌ Cancel"
                onPress={() =>
                  Platform.OS === "ios"
                    ? navigation.navigate("Home")
                    : navigation.push("Home")
                }
                color="black"
              />
              <Button
                title="Post ✅"
                onPress={handleNewCommentSubmit}
                color="black"
                disabled={isPostingComment}
              />
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
