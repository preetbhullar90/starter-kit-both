import { ViroFlexView, ViroText } from "@viro-community/react-viro"

//main styles file
import styles from "../styles"

export const TestComponent = ({ rating }) => {

    return (
        <ViroFlexView>
            <ViroFlexView style={styles.displayedReview1Star} />
            <ViroFlexView style={styles.displayedReview2Star} />
        </ViroFlexView>
    )

}




//THIS CODE WOULD CONDITIONALLY RENDER ASTERISKS FOR THE RATING
// const numOfStars = Number(rating);

// // Create a string with the specified number of stars
// const stars = '*'.repeat(numOfStars);
// console.log(stars);

// return (
//     <ViroText style={styles.displayedReviewAvgRatingVisualText} text={stars} />
// );