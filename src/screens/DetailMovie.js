import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import {Tab, Tabs, Toast} from 'native-base';
import {connect} from 'react-redux';
import {getMovieUrl, getW500ImageUrl, getCastUrl} from '../apis';
import {getMovie} from '../public/redux/actions/movies';
import {getCast} from '../public/redux/actions/cast';
import moment from 'moment';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {languageList} from '../apis/language';
import {Overlay} from 'react-native-elements';
import {Rating} from 'react-native-ratings';
// import tabs
import About from './tabs-detail-movie/About';
import Cast from './tabs-detail-movie/Cast';

class DetailMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: 0,
      rating: 0,
      title: '',
      poster: '',
      backdrop: '',
      runtime: '',
      release_date: '',
      vote_average: '',
      vote_count: '',
      overview: '',
      genres: [],
      original_title: '',
      status: '',
      original_language: '',
      production_countries: [],
      production_companies: [],
      budget: '',
      revenue: '',
      isLike: false,
      isVisible: false,
    };
  }

  componentDidMount() {
    console.disableYellowBox = true;
    this.getData();
    this.getDataCast();
  }

  getDataCast = () => {
    const {movieId} = this.props.route.params;
    this.props.getList(getCastUrl(JSON.stringify(movieId)));
  };

  handleLike = () => {
    this.setState({isLike: !this.state.isLike});
    Toast.show({
      text: 'The Movie has been liked!',
      buttonText: 'Okay',
      type: 'success',
    });
  };
  handleDisLike = () => {
    this.setState({isLike: !this.state.isLike});
    Toast.show({
      text: 'The Movie has been disliked!',
      buttonText: 'Okay',
      type: 'warning',
    });
  };

  handleRate = () => {
    this.setState({rate: this.state.rating, isVisible: false});
    if (!this.state.rating) {
      Toast.show({
        text: 'You has been remove vote',
        buttonText: 'Okay',
        type: 'warning',
      });
    } else {
      Toast.show({
        text: `The Movie has been rated with ${this.state.rating}`,
        buttonText: 'Okay',
        type: 'success',
      });
    }
  };
  ratingCompleted = rating => {
    this.setState({rating});
  };
  onCancelRate = () => {
    this.setState({rate: this.state.rate, isVisible: false});
  };

  getData = () => {
    const {movieId} = this.props.route.params;
    this.props.get(getMovieUrl(JSON.stringify(movieId))).then(() => {
      Object.keys(this.props.data).map((item, i) => {
        let info = this.props.data[item];
        this.setState({
          title: info.title,
          poster: info.poster_path,
          backdrop: info.backdrop_path,
          runtime: info.runtime,
          release_date: info.release_date,
          vote_count: info.vote_count,
          vote_average: info.vote_average,
          overview: info.overview,
          genres: info.genres,
          original_title: info.original_title,
          status: info.status,
          original_language: info.original_language,
          production_countries: info.production_countries,
          production_companies: info.production_companies,
          budget: info.budget,
          revenue: info.revenue,
        });
      });
    });
  };

  render() {
    const {
      title,
      poster,
      backdrop,
      runtime,
      release_date,
      vote_average,
      vote_count,
      overview,
      genres,
      original_title,
      status,
      original_language,
      production_countries,
      production_companies,
      budget,
      revenue,
      rate,
    } = this.state;
    const res = languageList.filter(lang => lang.code === original_language);
    let review = '';
    rate > 0 && rate <= 2
      ? (review = 'Terrible')
      : rate > 2 && rate <= 4
      ? (review = 'Bad')
      : rate > 4 && rate <= 6
      ? (review = 'Okay')
      : rate > 6 && rate <= 8
      ? (review = 'Good')
      : (review = 'Great');
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ImageBackground
            style={styles.backimg}
            source={{
              uri: getW500ImageUrl(backdrop),
            }}>
            <StatusBar
              barStyle={'light-content'}
              translucent={true}
              backgroundColor={'rgba(52, 51, 54, 0.2)'}
            />
            <LinearGradient
              colors={[
                'rgba(52, 51, 54, 0.1)',
                'rgba(52, 51, 54, 0.65)',
                'rgba(52, 51, 54, 1)',
              ]}
              style={styles.gradient}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon
                  name="arrowleft"
                  size={24}
                  color={'#fff'}
                  style={styles.back}
                />
              </TouchableOpacity>

              <View style={styles.viewHome}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Navbar')}>
                  <MaterialIcon name="home" color={'#C6CFCF'} size={32} />
                </TouchableOpacity>
              </View>
              {!this.state.isLike ? (
                <View style={styles.viewLike}>
                  <TouchableOpacity onPress={this.handleLike.bind(this)}>
                    <MaterialIcon name="heart" color={'#C6CFCF'} size={32} />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.viewDisLike}>
                  <TouchableOpacity onPress={this.handleDisLike.bind(this)}>
                    <MaterialIcon name="heart" color={'#C6CFCF'} size={32} />
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.viewMain}>
                <Image
                  style={styles.profileImage}
                  source={{
                    uri: !poster
                      ? 'https://payload.cargocollective.com/1/23/758880/13104445/NO-MOVIE-POSTERS-02-03-03_2000_c.png'
                      : getW500ImageUrl(poster),
                  }}
                />
                <View style={styles.viewName}>
                  <Text style={styles.name}>{title}</Text>
                  <View style={styles.viewYear}>
                    <Text style={styles.acting}>
                      {moment(release_date).format('MMM YYYY')}
                    </Text>
                    <View style={styles.viewDot} />
                    <Text style={styles.acting}>{runtime} mins</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
          <View style={styles.statistic}>
            <View style={styles.viewVote}>
              <MaterialIcon name="rocket" color={'#2ecc71'} size={32} />
            </View>
            <View style={styles.viewVote1}>
              <Text style={styles.average}>{vote_average}</Text>
              <View style={styles.viewVote2}>
                <Text style={styles.count}>{vote_count}</Text>
                <MaterialIcon
                  name="account-multiple"
                  size={12}
                  color={'#C6CFCF'}
                />
              </View>
            </View>
            <View style={styles.viewRate}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({isVisible: true, rating: this.state.rate})
                }>
                {!rate ? (
                  <MaterialIcon name="plus" color={'#9C9FA8'} size={32} />
                ) : (
                  <Text style={styles.rate}>{rate}</Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.viewRate1}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({isVisible: true, rating: this.state.rate})
                }>
                {!rate ? (
                  <Text style={styles.rate}>Rate This Movie</Text>
                ) : (
                  <Text style={styles.rate}>{review}</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.body}>
            <Tabs tabBarUnderlineStyle={styles.underline}>
              <Tab
                heading="About"
                tabStyle={styles.tab}
                textStyle={styles.textStyle}
                activeTabStyle={styles.tab}
                activeTextStyle={styles.activeText}>
                <About
                  overview={overview}
                  genres={genres}
                  original_title={original_title}
                  status={status}
                  res={res}
                  production_countries={production_countries}
                  production_companies={production_companies}
                  budget={budget}
                  revenue={revenue}
                  runtime={runtime}
                />
              </Tab>
              <Tab
                heading="Cast"
                tabStyle={styles.tab}
                textStyle={styles.textStyle}
                activeTabStyle={styles.tab}
                activeTextStyle={styles.activeText}>
                <Cast
                  data={this.props.cast}
                  navigation={this.props.navigation}
                />
              </Tab>
            </Tabs>
          </View>
          <Overlay
            isVisible={this.state.isVisible}
            windowBackgroundColor="rgba(255, 255, 255, .5)"
            overlayBackgroundColor="rgba(52, 51, 54, 1)"
            width="auto"
            borderRadius={w('2%')}
            height="auto">
            <Rating
              type="rocket"
              ratingTextColor={'white'}
              ratingCount={10}
              fractions={1}
              startingValue={this.state.rate}
              imageSize={28}
              onFinishRating={this.ratingCompleted}
              showRating
            />
            <View style={styles.viewBtnRate}>
              <TouchableOpacity onPress={this.onCancelRate.bind(this)}>
                <Text style={styles.viewTextRate1}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleRate.bind(this)}>
                <Text style={styles.viewTextRate2}>Rate</Text>
              </TouchableOpacity>
            </View>
          </Overlay>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backimg: {
    height: h('42%'),
  },
  gradient: {
    height: h('42%'),
    marginTop: h('3.6%'),
  },
  back: {
    marginLeft: w('4%'),
    marginTop: h('2%'),
  },
  viewMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: w('10%'),
    marginTop: h('14%'),
  },
  viewYear: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDot: {
    width: w('1%'),
    height: h('0.5%'),
    borderRadius: w('50%'),
    backgroundColor: 'rgba(198, 207, 207, 0.5)',
    marginLeft: w('1%'),
    marginRight: w('1%'),
  },
  profileImage: {
    width: w('22%'),
    height: h('16%'),
    borderRadius: w('1.2%'),
    borderWidth: w('0.2%'),
    borderColor: '#fff',
  },
  viewName: {
    marginLeft: w('3.6%'),
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: w('5.4%'),
    maxWidth: w('64%'),
  },
  acting: {
    color: '#C6CFCF',
    fontWeight: 'bold',
    fontSize: w('3.6%'),
  },
  tab: {
    backgroundColor: '#343336',
  },
  underline: {
    backgroundColor: '#22B07F',
  },
  textStyle: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: w('4.2%'),
  },
  activeText: {
    color: '#22B07F',
    fontWeight: '900',
    fontSize: w('4.2%'),
  },
  body: {
    flex: 1,
  },
  statistic: {
    flexDirection: 'row',
    backgroundColor: 'rgba(52, 51, 54, 1)',
  },
  viewVote: {
    width: w('12%'),
    height: h('6%'),
    borderRadius: w('3%'),
    backgroundColor: 'rgba(147,145,145,0.4)',
    marginLeft: w('10%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewRate: {
    width: w('12%'),
    height: h('6%'),
    borderRadius: w('3%'),
    backgroundColor: 'rgba(147,145,145,0.4)',
    marginLeft: w('5.4%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewLike: {
    width: w('12%'),
    height: h('6%'),
    borderRadius: w('10%'),
    backgroundColor: 'rgba(147,145,145,1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    marginRight: w('4%'),
    marginTop: h('2%'),
  },
  viewHome: {
    width: w('12%'),
    height: h('6%'),
    borderRadius: w('10%'),
    backgroundColor: 'rgba(147,145,145,1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    marginRight: w('18%'),
    marginTop: h('2%'),
  },
  viewDisLike: {
    width: w('12%'),
    height: h('6%'),
    borderRadius: w('10%'),
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    marginRight: w('4%'),
    marginTop: h('2%'),
  },
  viewVote2: {
    flexDirection: 'row',
  },
  viewVote1: {
    justifyContent: 'center',
    marginLeft: w('2%'),
  },
  viewRate1: {
    justifyContent: 'center',
    marginLeft: w('2%'),
  },
  average: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: w('4.6%'),
  },
  count: {
    color: '#C6CFCF',
    fontWeight: 'bold',
    fontSize: w('2.8%'),
    marginRight: w('1.2%'),
  },
  rate: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: w('4.2%'),
  },
  viewBtnRate: {
    flexDirection: 'row',
    marginTop: h('2.4%'),
    justifyContent: 'flex-end',
  },
  viewTextRate1: {
    color: '#22B07F',
    fontWeight: 'bold',
    fontSize: w('4.2%'),
    marginRight: w('3.6%'),
  },
  viewTextRate2: {
    color: '#22B07F',
    fontWeight: 'bold',
    fontSize: w('4.2%'),
  },
});

const mapStateToProps = state => {
  return {
    data: state.movie,
    cast: state.cast.data,
  };
};

const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getMovie(url)),
  getList: url => dispatch(getCast(url)),
});

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(DetailMovie);
