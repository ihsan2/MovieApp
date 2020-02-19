import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {getNowPlaying} from '../../public/redux/actions/movies';
import {getNowPlayingMoviesUrl} from '../../apis';
import GridMovies from '../../components/GridMovies';
import ListMovies from '../../components/ListMovies';
import {heightPercentageToDP as h} from 'react-native-responsive-screen';

class NowPlaying extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
    this.page = 1;
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    await this.props.get(getNowPlayingMoviesUrl(this.page));
  };

  handleRefresh = () => {
    this.getData();
  };

  handleLoadMore = () => {
    this.page += 1;
    this.getData();
  };

  render() {
    const {viewChange, navigation} = this.props;
    return (
      <>
        <SafeAreaView style={styles.container}>
          {this.props.data.isLoading ? (
            <ActivityIndicator size={'large'} color={'#343336'} />
          ) : !viewChange ? (
            <FlatList
              numColumns={1}
              data={this.props.data.data}
              renderItem={({item}) => (
                <ListMovies item={item} navigation={navigation} />
              )}
              keyExtractor={item => item.id}
              style={styles.list}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
              key={1}
            />
          ) : (
            <FlatList
              numColumns={3}
              data={this.props.data.data}
              renderItem={({item}) => (
                <GridMovies item={item} navigation={navigation} />
              )}
              keyExtractor={item => item.id}
              style={styles.list}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
              key={3}
              // onEndReached={this.handleLoadMore}
              // onEndReachedThreshold={0.8}
            />
          )}
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  list: {
    marginTop: h('1%'),
  },
});

const mapStateToProps = state => {
  return {
    data: state.nowplaying,
  };
};

const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getNowPlaying(url)),
});

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(NowPlaying);
