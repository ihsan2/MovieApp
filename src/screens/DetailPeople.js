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
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import {Tab, Tabs} from 'native-base';
import {connect} from 'react-redux';
import {getPersonUrl, getW500ImageUrl, getMoviesPersonUrl} from '../apis';
import {getPerson} from '../public/redux/actions/person';
import {getMoviesPerson} from '../public/redux/actions/moviesperson';
// import tabs
import About from './tabs-detail-people/About';
import Movies from './tabs-detail-people/Movies';

class DetailPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      profile_image: '',
      known: '',
      birthday: '',
      from: '',
      bio: '',
      known_as: [],
    };
  }

  componentDidMount() {
    console.disableYellowBox = true;
    this.getData();
    this.getDataCast();
  }

  getDataCast = () => {
    const {peopleId} = this.props.route.params;
    this.props.getList(getMoviesPersonUrl(JSON.stringify(peopleId)));
  };

  getData = () => {
    const {peopleId} = this.props.route.params;
    this.props.get(getPersonUrl(JSON.stringify(peopleId))).then(() => {
      Object.keys(this.props.data).map((item, i) => {
        let info = this.props.data[item];
        this.setState({
          name: info.name,
          profile_image: info.profile_path,
          known: info.known_for_department,
          birthday: info.birthday,
          from: info.place_of_birth,
          bio: info.biography,
          known_as: info.also_known_as,
        });
      });
    });
  };

  render() {
    const {
      name,
      profile_image,
      known,
      birthday,
      from,
      bio,
      known_as,
    } = this.state;

    return (
      <>
        <SafeAreaView style={styles.container}>
          <ImageBackground
            style={styles.backimg}
            source={{
              uri: getW500ImageUrl(profile_image),
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
                  onPress={() => this.props.navigation.push('Navbar')}>
                  <MaterialIcon name="home" color={'#C6CFCF'} size={32} />
                </TouchableOpacity>
              </View>
              <View style={styles.viewMain}>
                <Image
                  style={styles.profileImage}
                  source={{
                    uri: !profile_image
                      ? 'https://csgonline.org/wp-content/uploads/2016/08/Headshot-Silhouette-Unisex-3-Light-Grey-on-Dark-Grey.png'
                      : getW500ImageUrl(profile_image),
                  }}
                />
                <View style={styles.viewName}>
                  <Text style={styles.name}>{name}</Text>
                  <Text style={styles.acting}>{known}</Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
          <View style={styles.body}>
            <Tabs tabBarUnderlineStyle={styles.underline}>
              <Tab
                heading="About"
                tabStyle={styles.tab}
                textStyle={styles.textStyle}
                activeTabStyle={styles.tab}
                activeTextStyle={styles.activeText}>
                <About
                  from={from}
                  birthday={birthday}
                  bio={bio}
                  known_as={known_as}
                />
              </Tab>
              <Tab
                heading="Movies"
                tabStyle={styles.tab}
                textStyle={styles.textStyle}
                activeTabStyle={styles.tab}
                activeTextStyle={styles.activeText}>
                <Movies
                  data={this.props.movies}
                  navigation={this.props.navigation}
                />
              </Tab>
            </Tabs>
          </View>
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
    width: w('100%'),
    height: h('36%'),
  },
  gradient: {
    height: h('36%'),
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
  profileImage: {
    width: w('20%'),
    height: h('10%'),
    borderRadius: w('50%'),
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
  viewHome: {
    width: w('12%'),
    height: h('6%'),
    borderRadius: w('10%'),
    backgroundColor: 'rgba(147,145,145,1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    marginRight: w('8%'),
    marginTop: h('2%'),
  },
});

const mapStateToProps = state => {
  return {
    data: state.person,
    movies: state.moviesperson.data,
  };
};

const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getPerson(url)),
  getList: url => dispatch(getMoviesPerson(url)),
});

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(DetailPeople);
