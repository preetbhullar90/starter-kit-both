import { StyleSheet } from "react-native";
https://github.com/KelvinUng1/ReviewAR-fe/pull/21/conflict?name=styles.js&ancestor_oid=c145042fe6cd13dee04b459e60d0843f9ed60a21&base_oid=ab98d8c2739aa278553f14bacadf922074409a3b&head_oid=dac0f2d380a3b7b23e6f36d5aa6dfc74c612a83a
const LemonMilkRegular = require('./assets/fonts/lemonmilk/LEMONMILK-Regular.otf');

const styles = StyleSheet.create({
/////////////DEFAULT VIRO STYLING/////////////////
    helloWorldTextStyle: {
        fontStyle: "bold",
        fontSize: 20,
        color: "#000",
        textAlign: "center",
    },
//////////WELCOME PAGE STYLING//////////////
backgroundImage: {
  flex: 1,
  resizeMode:"cover",
},

container: {
  flex: 1,
  justifyContent: "top",
  alignItems: "center",
  marginTop: 160,
},

logo: {
  marginBottom: 130,
},
appName: {
  color: '#FFFFFF',
  fontSize: 40,
  fontWeight: 'bold',
  marginBottom: 15,
},
subtitle: {
  color: 'white',
  fontSize: 18,
  marginBottom: 50,
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
  borderRadius: 2,
  elevation: 3,
  backgroundColor: "#a5d8ff"
  
},
text: {
  fontSize: 16,
  lineHeight: 21,
  fontWeight: 'bold',
  letterSpacing: 0.25,
  color: 'black',
  textAlign:"center"
},
buttonGroupContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between', 
  width: '80%', 
  marginTop: 30, 
},
buttonGroup: {
  flex: 1,
  alignItems: 'center', 
},
//ring
ring: {
  position: 'absolute', // Make the ring absolute positioned
  width: 400,
  height: 400,
  borderRadius: 200,
  backgroundColor: '#a3adf2',
  borderWidth: 1,
  borderColor: '#7789ea',
  opacity: 1,
},

///////////////SWITCH USER PAGE STYLING///////////

    switchUserPageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
      fontSize: 20,
      lineHeight: 22,
      marginBottom: 150,
      padding: 10,
      color: 'white',
      fontSize: 15,
      fontFamily: 'LemonMilkRegular',
    },
    userListContainer: {
      width: '90%',
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 0,
      padding: 10,
      marginTop: 20,
      height: 100,
    },
    userListScrollContainer: {
      alignItems: 'center',
    },
    userCard: {
      borderWidth: 2,
      borderColor: 'rgba(84, 95, 178, 0)',
      backgroundColor: '#a3adf2',
      marginLeft: 10,
      marginRight: 10,
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


////////////AVERAGE RATING BARS (CONDITIONALLY COLOURED) STYLING

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