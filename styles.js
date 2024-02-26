import { StyleSheet } from "react-native";

const LemonMilkRegular = require('./assets/fonts/lemonmilk/LEMONMILK-Regular.otf');

const styles = StyleSheet.create({
/////////////DEFAULT VIRO STYLING/////////////////
    helloWorldTextStyle: {
        fontStyle: "bold",
        fontSize: 20,
        color: "#000",
        textAlign: "center",
    },
////////////WELCOME PAGE STYLING//////////////
// backgroundImage: {
//   flex:1,
//   resizeMode:"cover"
// },

container: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#2E3B4E",
},

appName: {
  color: '#FFFFFF',
  fontSize: 40,
  fontWeight: 'bold',
  marginBottom: 15,
},
subtitle: {
  color: '#8F9BB3',
  fontSize: 18,
  marginBottom: 15,
},
arIcon: {
  width: 75,
  height: 75,
  marginTop: 25,
},
button: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 3,
  paddingHorizontal: 5,
  borderRadius: 4,
  elevation: 3,
  backgroundColor: 'green',
},
text: {
  fontSize: 16,
  lineHeight: 21,
  fontWeight: 'bold',
  letterSpacing: 0.25,
  color: 'white',
  textAlign:"center"
},
buttonGroupContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between', 
  width: '80%', 
  marginTop: 15, 
},
buttonGroup: {
  flex: 1,
  alignItems: 'center', 
},

///////////////SWITCH USER PAGE STYLING///////////

    switchUserPageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#a5d8fd'
    },

    switchUserPageHeader: {
      position: 'absolute',
      top: 20,
      left: 20,
    },

    switchUserPageContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    switchUserPageText: {
      textAlign: 'center',
      marginBottom: 20,
      padding: 10,
      color: 'white',
      fontSize: 15,
      fontFamily: 'LemonMilkRegular',
    },

    // userListContainer: {
    //   width: '80%', // Adjust the width as per your requirement
    //   borderWidth: 10,
    //   borderColor: '#545fb2',
    //   borderRadius: 0,
    //   padding: 0,
    //   flexDirection: 'row'
    // },

    userListContainer: {
      width: '80%', // Adjust the width as per your requirement
      borderWidth: 1,
      borderColor: 'a5d8fd',
      borderRadius: 0,
      padding: 10,
      marginTop: 20, // Add margin top as needed
      height: 100, // Specify the height of the ScrollView container
    },
    userListScrollContainer: {
      alignItems: 'center',
    },

    userCard: {
      borderWidth: 2,
      borderColor: '#545fb2',
      backgroundColor: '#a3adf2',
      height: 50
    },
    userCardText: {
      textAlign: 'center',
      fontFamily: 'LemonMilkRegular',
      fontWeight: 'bold',
      fontSize: 20,
      color: 'white',
      padding: 5
    },


////////////AR ELEMENTS STYLING///////////////////
    venueInfoAndReviewsContainer: {
        height: 4,
        width: 6,
        backgroundColor: "black",
        opacity: 0.7
    },
    displayedVenueTitleBar: {
        flex: 0.5,
        flexDirection: "row",
        backgroundColor: "navy"
    },
    displayedVenueTitleBarText: {
        color: "white",
        flexDirection: "row",
        textAlignHorizontal: "center",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    },
//////////////////////////
    displayedReviewAvgRatingVisual: {
        flex: 0.2,
        opacity: 1,
        width: 6,
        flexDirection: "row",
        backgroundColor: "white"
    },
    avg1Star: {
        flex: 0.2,
        backgroundColor: 'rgb(255, 0, 0)',
        opacity: 1,
        width: 1.2
    },
    avg2Star: {
        flex: 0.2,
        backgroundColor: 'rgb(255, 165, 0)',
        opacity: 1,
        width: 1.2
    },
    avg3Star: {
        flex: 0.2,
        backgroundColor: 'rgb(255, 255, 0)',
        opacity: 1,
        width: 1.2
    },
    avg4Star: {
        flex: 0.2,
        backgroundColor: 'rgb(144, 238, 144)',
        opacity: 1,
        width: 1.2
    },
    avg5Star: {
        flex: 0.2,
        backgroundColor: 'rgb(0, 128, 0)',
        opacity: 1,
        width: 1.2
    },


////////////AVERAGE RATING BARS (CONDITIONALLY COLOURED)

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
    displayedVenueAvgRatingBarText: {
        color: "black",
        textAlign: "center",
        fontSize: 15
    },
    displayedReviewBody: {
        flex: 2,// edit here to give more space if needed. but make sure it doesnt overlap.
        flexDirection: "row",
        backgroundColor: "white"
    },
    displayedReviewBodyText: {
        color: "black",
        alignItems: "center",
        fontSize: 30
    },

    // displayedReviewRating: {
    //     color: "black",
    //     flex: 0.1,
    //     flexDirection: "row",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     fontFamily:"",
    //     fontSize: 30
    // },

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
    
    textAlign: "center",
    fontSize: 30,
  },
});

module.exports = styles;