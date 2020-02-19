import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import GridMoviesPeople from '../../components/GridMoviesPeople';
import NoResult from '../../components/NoResult';

export default class About extends Component {
  render() {
    const {data, navigation} = this.props;

    return (
      <>
        <View style={styles.container}>
          <View style={styles.view1}>
            {data.length === 0 ? (
              <NoResult />
            ) : (
              <FlatList
                numColumns={3}
                data={data}
                renderItem={({item}) => (
                  <GridMoviesPeople item={item} navigation={navigation} />
                )}
                keyExtractor={item => item.id}
                style={styles.list}
                key={3}
              />
            )}
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(52, 51, 54, 1)',
  },
  view1: {
    marginTop: h('2%'),
    marginLeft: w('0.2%'),
  },
});
