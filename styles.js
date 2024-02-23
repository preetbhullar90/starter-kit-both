import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
/////////////DEFAULT VIRO STYLING/////////////////
    helloWorldTextStyle: {
        fontStyle: "bold",
        fontSize: 20,
        color: "#000",
        textAlign: "center",
    },
////////////WELCOME PAGE STYLING//////////////
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    welcomeText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        position: "absolute",
        top: 20,
        left: 20,
    },
    logoImage: {
        marginTop: 60,
    },
    startARButton: {
        color: "black"
    },
///////////////SWITCH USER PAGE STYLING///////////

    switchUserPageBackground: {
        backgroundColor: "blue",
    },
    switchUserPageText: {
        color: "white",
        fontSize: 20,
    },


////////////AR ELEMENTS STYLING///////////////////
    venueInfoAndReviewsContainer: {
        height: 4,
        width: 6,
        backgroundColor: "black",
        opacity: 0.7
    },
    displayedVenueTitleBar: {
        flex: 0.2,
        flexDirection: "row",
        backgroundColor: "navy"
    },
    displayedVenueTitleBarText: {
        color: "white",
        flex: 1,
        flexDirection: "row",
        textAlignVertical: "center",
        textAlignHorizontal: "center",
        textAlign: "center",
        fontSize: 40,
        fontWeight: "bold"
    },
    displayedVenueAvgRatingBar: {
        flex: 0.25,
        flexDirection: "row",
        backgroundColor: "yellow"
    },
    displayedVenueAvgRatingBarText: {
        color: "black",
        flex: 1,
        textAlignVertical: "center",
        textAlign: "center",
        fontSize: 30
    },
    displayedReviewBody: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white"
    },
    displayedReviewBodyText: {
        color: "black",
        flex: 0.8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 30
    },

    displayedReviewRating: {
        color: "black",
        flex: 0.2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:"",
        fontSize: 30
    },
    mostRecentReviewButton: {
        height: 1.5,
        width: 1.5,
        backgroundColor: "black",
        opacity: 0.7
    },
    mostRecentReviewButtonText: {
        color: "white",
        flex: 1,
        textAlignVertical: "center",
        textAlign: "center",
        fontSize: 30
    },
    addReviewButton: {
        height: 1.5,
        width: 2.5,
        backgroundColor: "green",
        opacity: 0.7
    },
    addReviewButtonText: {
        color: "black",
        flex: 1,
        textAlignVertical: "center",
        textAlign: "center",
        fontSize: 30
    }
  });

  module.exports = styles;
