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
//////////////////////////
    displayedReviewAvgRatingVisual: {
        flex: 0.2,
        opacity: 1,
        width: 6,
        flexDirection: "row",
        backgroundColor: "black"
    },
    avg1Star: {
        flex: 0.2,
        backgroundColor: 'rgb(255, 0, 0)',
        width: 1.2
    },
    avg2Star: {
        flex: 0.2,
        backgroundColor: 'rgb(255, 165, 0)',
        width: 1.2
    },
    avg3Star: {
        flex: 0.2,
        backgroundColor: 'rgb(255, 255, 0)',
        width: 1.2
    },
    avg4Star: {
        flex: 0.2,
        backgroundColor: 'rgb(144, 238, 144)',
        width: 1.2
    },
    avg5Star: {
        flex: 0.2,
        backgroundColor: 'rgb(0, 128, 0)',
        width: 1.2
    },
////////////////////////////
    // displayedVenueAvgRatingBar: {
    //     flex: 0.25,
    //     flexDirection: "row",
    //     backgroundColor: "yellow"
    // },
    // displayedVenueAvgRatingBarBase: {
    //     flex: 0.25,
    //     flexDirection: "row",
    //   },
      displayedVenueAvgRatingBarRed: {
        flex: 0.25,
        flexDirection: "row",
        backgroundColor: "rgb(255, 0, 0)", // Red
      },
      displayedVenueAvgRatingBarOrange: {
        flex: 0.25,
        flexDirection: "row",
        backgroundColor: "rgb(255, 165, 0)", // Orange
      },
      displayedVenueAvgRatingBarYellow: {
        flex: 0.25,
        flexDirection: "row",
        backgroundColor: "rgb(255, 255, 0)", // Yellow
      },
      displayedVenueAvgRatingBarLightGreen: {
        flex: 0.25,
        flexDirection: "row",
        backgroundColor: "rgb(144, 238, 144)", // Light Green
      },
      displayedVenueAvgRatingBarGreen: {
        flex: 0.25,
        flexDirection: "row",
        backgroundColor: "rgb(0, 128, 0)", // Green
      },
////////////////////////////
venueInfoAndReviewsContainer: {
    height: 4,
    width: 6,
    backgroundColor: "black",
    opacity: 0.7,
  },
  displayedVenueTitleBar: {
    flex: 0.5,
    flexDirection: "row",
    backgroundColor: "navy",
  },
  displayedVenueTitleBarText: {
    color: "white",
    flexDirection: "row",
    textAlignVertical: "center",
    textAlignHorizontal: "center",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  displayedVenueAvgRatingBar: {
    flex: 0.5,
    flexDirection: "row",
    backgroundColor: "yellow",
  },
  displayedVenueAvgRatingBarText: {
    color: "black",
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 30,
  },
  displayedReviewBody: {
    flex: 2,    // edit here to give more space if needed. but make sure it doesnt overlap.
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
  },
  displayedReviewBodyText: {
    color: "black",
    alignItems: "center",
    fontSize: 25,
  },
  // displayedReviewRating: {
  //         color: "black",
  //         flex: 0.25,
  //         alignItems: "flex-end",
  //         fontFamily:"",
  //         fontSize: 30
  //     },
  //BUTTON BAR --
  buttonBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "black"
    // backgroundColor:"white" // setting to white makes it look greyed out
  },
  //ADD REVIEW BUTTON
  addReviewButton: {
    height: 1,
    width: 1.5,
    backgroundColor: "green",
    opacity: 0.7,
  },
  addReviewButtonText: {
    color: "white",
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 30,
  },
  //BLANK BUTTON _ANOTHER
  anotherOneButton: {
    height: 1,
    width: 1.5,
    backgroundColor: "blue",
    opacity: 0.7,
  },
  anotherOneButtonText: {
    color: "white",
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 30,
  },
  //BACK TO TOP BUTTON
  mostRecentReviewButton: {
    height: 1,
    width: 1.5,
    backgroundColor: "black",
    opacity: 0.7,
  },
  mostRecentReviewButtonText: {
    color: "white",
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 30,
  },
  //NEXTT BUTTON
  displayedNextReviewButton: {
    color: "Blue",
    height: 1,
    width: 1.5,
    backgroundColor: "red",
    fontSize: 25,
  },
  displayedReviewNextButtonText: {
    color: "white",
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 30,
  },
});
module.exports = styles;