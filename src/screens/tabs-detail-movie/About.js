import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import ListGenres from '../../components/ListGenres';
import NumberFormat from 'react-number-format';

export default class About extends Component {
  render() {
    const {
      overview,
      genres,
      original_title,
      status,
      res,
      runtime,
      budget,
      revenue,
      production_companies,
      production_countries,
    } = this.props;
    const hours = runtime / 60;
    const hrs = Math.floor(hours);
    const mins = Math.round((hours - hrs) * 60);

    return (
      <>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.view1}>
              <Text style={styles.value}>{overview}</Text>
            </View>
            <View style={styles.view2}>
              <Text style={styles.bio}>Genres</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={genres}
                  style={styles.list}
                  renderItem={({item}) => <ListGenres item={item} />}
                  keyExtractor={item => item}
                />
              </ScrollView>
            </View>

            <View style={styles.movieInfo}>
              <Text style={styles.info}>Movie Info</Text>
              <View style={styles.viewInfo1}>
                <Text style={styles.key}>Original Title</Text>
                <Text style={styles.value}>{original_title}</Text>
              </View>
              <View style={styles.viewInfo1}>
                <Text style={styles.key}>Status</Text>
                <Text style={styles.value}>{status}</Text>
              </View>
              <View style={styles.viewInfo1}>
                <Text style={styles.key}>Runtime</Text>
                <Text style={styles.value}>
                  {hrs} hrs {mins} mins
                </Text>
              </View>
              <View style={styles.viewInfo1}>
                <Text style={styles.key}>Original Language</Text>
                <FlatList
                  data={res}
                  renderItem={({item}) => (
                    <Text style={styles.value}>{item.name}</Text>
                  )}
                  keyExtractor={item => item.code}
                />
              </View>
              <View style={styles.viewInfo1}>
                <Text style={styles.key}>Production Countries</Text>
                <FlatList
                  data={production_countries}
                  renderItem={({item}) => (
                    <Text style={styles.value}>{item.name}</Text>
                  )}
                  keyExtractor={item => item}
                />
              </View>
              <View style={styles.viewInfo1}>
                <Text style={styles.key}>Production Companies</Text>
                <FlatList
                  data={production_companies}
                  renderItem={({item}) => (
                    <Text style={styles.value}>{item.name}</Text>
                  )}
                  keyExtractor={item => item}
                />
              </View>
              <View style={styles.viewInfo1}>
                <Text style={styles.key}>Budget</Text>
                <NumberFormat
                  value={budget}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'US$'}
                  decimalSeparator={'.'}
                  renderText={value => (
                    <Text style={styles.value}>{value}</Text>
                  )}
                />
              </View>
              <View style={styles.viewInfo1}>
                <Text style={styles.key}>Revenue</Text>
                <NumberFormat
                  value={revenue}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'US$'}
                  decimalSeparator={'.'}
                  renderText={value => (
                    <Text style={styles.value}>{value}</Text>
                  )}
                />
              </View>
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

  view2: {
    marginTop: h('1.8%'),
    marginLeft: w('4.2%'),
    marginBottom: h('1%'),
  },
  view1: {
    marginTop: h('3.2%'),
    marginLeft: w('4.2%'),
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
  movieInfo: {
    marginTop: h('1.8%'),
    marginLeft: w('4.2%'),
    marginBottom: h('1%'),
  },
  info: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: w('5.4%'),
  },
  viewInfo1: {
    marginTop: h('2%'),
    flexDirection: 'row',
  },
});
