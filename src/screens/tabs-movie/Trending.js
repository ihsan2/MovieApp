import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {getTrending} from '../../public/redux/actions/movies';
import {getTrendingDailyMoviesUrl} from '../../apis';
import GridMovies from '../../components/GridMovies';
import ListMovies from '../../components/ListMovies';
import {heightPercentageToDP as h} from 'react-native-responsive-screen';

class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      page: 1,
      load: false,
      movies: [],
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({load: true});
    this.getData();
  }

  getData = async () => {
    await this.props
      .get(getTrendingDailyMoviesUrl(this.state.page))
      .then(() => {
        this.setState({
          movies: [...this.state.movies, ...this.props.data.data],
          load: false,
        });
      });
  };

  handleRefresh = () => {
    this.setState({movies: [], page: 1, load: true}, () => {
      this.getData();
    });
  };

  handleLoadMore = () => {
    this.setState({page: this.state.page + 1}, () => {
      this.getData();
    });
  };

  render() {
    const {viewChange, navigation} = this.props;
    return (
      <>
        <SafeAreaView style={styles.container}>
          {this.state.load ? (
            <ActivityIndicator size={'large'} color={'#343336'} />
          ) : !viewChange ? (
            <FlatList
              numColumns={1}
              data={this.state.movies}
              renderItem={({item}) => (
                <ListMovies item={item} navigation={navigation} />
              )}
              keyExtractor={item => item.id.toString()}
              style={styles.list}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
              key={1}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.1}
              ListFooterComponent={() =>
                this.props.data.isLoading ? (
                  <ActivityIndicator style={styles.loadMore} />
                ) : (
                  <></>
                )
              }
            />
          ) : (
            <FlatList
              numColumns={3}
              data={this.state.movies}
              renderItem={({item}) => (
                <GridMovies item={item} navigation={navigation} />
              )}
              keyExtractor={item => item.id.toString()}
              style={styles.list}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
              key={3}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.1}
              ListFooterComponent={() =>
                this.props.data.isLoading ? (
                  <ActivityIndicator style={styles.loadMore} />
                ) : (
                  <></>
                )
              }
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
  loadMore: {
    marginBottom: h('2%'),
    marginTop: h('2%'),
  },
});

const mapStateToProps = state => {
  return {
    data: state.trending,
  };
};

const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getTrending(url)),
});

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(Trending);
