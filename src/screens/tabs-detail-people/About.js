import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import ListKnownAs from '../../components/ListKnownAs';
import moment from 'moment';

export default class About extends Component {
  render() {
    const {bio, from, birthday, known_as} = this.props;
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return (
      <>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.view1}>
              <Text style={styles.key}>Age</Text>
              <Text style={styles.value}>{age}</Text>
            </View>
            <View style={styles.view1}>
              <Text style={styles.key}>Born On</Text>
              <Text style={styles.value}>
                {moment(birthday).format('DD MMMM YYYY')}
              </Text>
            </View>
            <View style={styles.view1}>
              <Text style={styles.key}>From</Text>
              <Text style={styles.value}>{from}</Text>
            </View>
            <View style={styles.view2}>
              <Text style={styles.bio}>Also Known as</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={known_as}
                  style={styles.list}
                  renderItem={({item}) => <ListKnownAs item={item} />}
                  keyExtractor={item => item}
                />
              </ScrollView>
            </View>
            <View style={styles.view2}>
              <Text style={styles.bio}>Biography</Text>
              {!bio ? (
                <Text style={styles.value}>
                  Biography hasn't been added yet
                </Text>
              ) : (
                <Text style={styles.value}>{bio}</Text>
              )}
            </View>
          </ScrollView>
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
    flexDirection: 'row',
    marginLeft: w('4.2%'),
  },
  view2: {
    marginTop: h('3.2%'),
    marginLeft: w('4.2%'),
    marginBottom: h('1%'),
  },
  key: {
    color: '#B3B6B7',
    fontWeight: 'bold',
    fontSize: w('3.6%'),
    marginRight: w('2.4%'),
  },
  list: {marginRight: w('4.2%')},
  bio: {
    color: '#B3B6B7',
    fontWeight: 'bold',
    fontSize: w('3.6%'),
    marginRight: w('2.4%'),
    marginBottom: h('1.2%'),
  },
  value: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: w('3.6%'),
  },
});
