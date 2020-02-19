import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  StyleSheet,
} from 'react-native';
import {Card} from 'native-base';
import {Rating} from 'react-native-ratings';
import {Overlay} from 'react-native-elements';

class RatingTes extends React.Component {
  ratingCompleted(rating) {
    console.log(`Rating is: ${rating}`);
  }

  render() {
    return (
      <SafeAreaView style={styles.flex}>
        <ScrollView style={styles.flex} contentContainerStyle={styles.center}>
          <Card title="CUSTOM RATING" containerStyle={styles.card}>
            <Rating
              ratingCount={10}
              fractions={1}
              startingValue={0}
              imageSize={32}
              onFinishRating={this.ratingCompleted}
              showRating
              style={{paddingVertical: 10}}
            />
          </Card>
        </ScrollView>
        <Overlay
          isVisible={true}
          windowBackgroundColor="rgba(255, 255, 255, 0.8)"
          overlayBackgroundColor="red"
          width="auto"
          height="auto">
          <Text>sad</Text>
        </Overlay>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingContainer: {
    paddingBottom: 30,
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    fontFamily: Platform.OS === 'ios' ? 'Menlo-Bold' : null,
    color: '#27ae60',
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : null,
    color: '#34495e',
  },
  card: {
    width: '85%',
    marginBottom: 20,
  },
});

export default RatingTes;
