import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Header, Body, Right, Tab, Tabs, ScrollableTab} from 'native-base';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import screen tabs
import NowPlaying from './tabs-movie/NowPlaying';
import Upcoming from './tabs-movie/Upcoming';
import Popular from './tabs-movie/Popular';
import Trending from './tabs-movie/Trending';
import TopRated from './tabs-movie/TopRated';

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      view: true,
    };
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <Header style={styles.header}>
            <StatusBar
              backgroundColor={'rgba(38, 38, 45, 0.75)'}
              barStyle={'light-content'}
              translucent={false}
            />
            <Body>
              <Text style={styles.textHeader}>Movies</Text>
            </Body>
            <Right>
              <TouchableOpacity
                onPress={() => this.setState({view: !this.state.view})}>
                {!this.state.view ? (
                  <MaterialCommunityIcons
                    name="view-grid"
                    color={'#fff'}
                    size={28}
                    style={styles.right}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="view-list"
                    color={'#fff'}
                    size={28}
                    style={styles.right}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SearchMovies')}>
                <MaterialIcons
                  name="search"
                  color={'#fff'}
                  size={28}
                  style={styles.right}
                />
              </TouchableOpacity>
            </Right>
          </Header>

          <Tabs
            renderTabBar={() => <ScrollableTab />}
            tabBarUnderlineStyle={styles.underline}>
            <Tab
              heading="Now Playing"
              tabStyle={styles.tab}
              textStyle={styles.textStyle}
              activeTabStyle={styles.tab}
              activeTextStyle={styles.activeText}>
              <NowPlaying
                viewChange={this.state.view}
                navigation={this.props.navigation}
              />
            </Tab>
            <Tab
              heading="Upcoming"
              tabStyle={styles.tab}
              textStyle={styles.textStyle}
              activeTabStyle={styles.tab}
              activeTextStyle={styles.activeText}>
              <Upcoming
                viewChange={this.state.view}
                navigation={this.props.navigation}
              />
            </Tab>
            <Tab
              heading="Popular"
              tabStyle={styles.tab}
              textStyle={styles.textStyle}
              activeTabStyle={styles.tab}
              activeTextStyle={styles.activeText}>
              <Popular
                viewChange={this.state.view}
                navigation={this.props.navigation}
              />
            </Tab>
            <Tab
              heading="Trending"
              tabStyle={styles.tab}
              textStyle={styles.textStyle}
              activeTabStyle={styles.tab}
              activeTextStyle={styles.activeText}>
              <Trending
                viewChange={this.state.view}
                navigation={this.props.navigation}
              />
            </Tab>
            <Tab
              heading="Top Rated"
              tabStyle={styles.tab}
              textStyle={styles.textStyle}
              activeTabStyle={styles.tab}
              activeTextStyle={styles.activeText}>
              <TopRated
                viewChange={this.state.view}
                navigation={this.props.navigation}
              />
            </Tab>
          </Tabs>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#343336',
  },
  textHeader: {
    fontSize: w('6%'),
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: w('5%'),
  },
  right: {
    marginRight: w('3%'),
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
    fontSize: w('7%'),
  },
  activeText: {
    color: '#22B07F',
    fontWeight: '900',
    fontSize: w('7%'),
  },
});
