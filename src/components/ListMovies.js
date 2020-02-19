import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Separator} from 'native-base';
import {getW92ImageUrl} from '../apis';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import moment from 'moment';
import {connect} from 'react-redux';
import {getGenres} from '../public/redux/actions/genres';
import {getGenresUrl} from '../apis';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class ListMovies extends Component {
  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    await this.props.get(getGenresUrl());
  };

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
            </View>
            <View style={styles.viewText}>
              <Text style={styles.year}>
                {moment(item.release_date).format('YYYY')}
              </Text>
              <Text style={styles.title}>{item.original_title}</Text>
              <View style={styles.viewGenre}>
                {item.genre_ids.map((id, index) => {
                  const res = this.props.data.filter(genre => genre.id === id);
                  if (res.length) {
                    return (
                      <Text key={id} style={styles.genre}>
                        {res.shift().name}
                        {index + 1 !== item.genre_ids.length && ', '}
                      </Text>
                    );
                  }
                })}
              </View>
            </View>
            <View style={styles.viewRate}>
              <Icon name="star" color={'#F5C518'} size={24} />
              <Text style={styles.vote}> {item.vote_average}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Separator style={styles.separator} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: h('1%'),
  },
  poster: {
    width: w('24%'),
    height: h('16%'),
    borderRadius: w('1%'),
  },
  viewText: {
    marginLeft: w('30%'),
    position: 'absolute',
    marginTop: h('2%'),
  },
  separator: {
    height: h('0.2'),
    marginLeft: w('1%'),
  },
  viewGenre: {
    flexDirection: 'row',
  },
  viewRate: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 0,
    marginBottom: h('1.2%'),
    position: 'absolute',
    marginLeft: w('30%'),
  },
  year: {
    color: '#AEAEAF',
    fontSize: w('3%'),
    fontWeight: 'bold',
  },
  title: {
    fontSize: w('4%'),
    fontWeight: 'bold',
  },
  genre: {
    color: '#AEAEAF',
    fontSize: w('3%'),
    marginTop: h('2%'),
    fontWeight: 'bold',
  },
  vote: {
    color: '#BBBBBB',
    fontWeight: 'bold',
    fontSize: w('3.6%'),
  },
});

const mapStateToProps = state => {
  return {
    data: state.genre.data,
  };
};

const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getGenres(url)),
});

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(ListMovies);
