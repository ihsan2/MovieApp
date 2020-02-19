import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {heightPercentageToDP as h} from 'react-native-responsive-screen';
import ListCast from '../../components/ListCast';

export default class Cast extends Component {
  render() {
    const {data, navigation} = this.props;
    return (
      <>
        <View style={styles.container}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <ListCast item={item} navigation={navigation} />
            )}
            keyExtractor={item => item.id}
            style={styles.list}
          />
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
  list: {
    marginTop: h('0.2%'),
  },
});
