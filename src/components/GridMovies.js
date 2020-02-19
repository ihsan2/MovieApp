import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {getW92ImageUrl} from '../apis';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class GridMovies extends Component {
  render() {
    const {item, navigation} = this.props;
    return (
      <>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DetailMovie', {
              movieId: item.id,
            })
          }>
          <View style={styles.body}>
            <View>
              <Image
                source={{
                  uri: !item.poster_path
                    ? 'https://payload.cargocollective.com/1/23/758880/13104445/NO-MOVIE-POSTERS-02-03-03_2000_c.png'
                    : getW92ImageUrl(item.poster_path),
                }}
                style={styles.poster}
              />
              <Text style={styles.year}>
                {moment(item.release_date).format('YYYY')}
              </Text>
              <Text numberOfLines={2} style={styles.title}>
                {item.original_title}
              </Text>
              <View style={styles.viewRate}>
                <Icon name="star" color={'#F5C518'} size={18} />
                <Text style={styles.vote}> {item.vote_average}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: h('1.3%'),
  },
  poster: {
    width: w('28%'),
    height: h('18%'),
    borderRadius: w('1%'),
  },
  viewRate: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: w('5%'),
    position: 'absolute',
    paddingLeft: w('1%'),
    paddingRight: w('1%'),
    right: 0,
    marginTop: h('1%'),
    marginRight: w('1%'),
  },
  year: {
    color: '#AEAEAF',
    fontSize: w('3%'),
    fontWeight: 'bold',
    marginTop: h('1%'),
  },
  title: {
    fontSize: w('4%'),
    fontWeight: 'bold',
    width: w('28%'),
  },
  vote: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: w('3.2%'),
  },
});

export default GridMovies;
