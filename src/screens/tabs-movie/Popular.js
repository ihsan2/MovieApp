import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {getPopular} from '../../public/redux/actions/movies';
import {getPopularMoviesUrl} from '../../apis';
import ListMovies from '../../components/ListMovies';
import GridMovies from '../../components/GridMovies';
import {heightPercentageToDP as h} from 'react-native-responsive-screen';

class Popular extends Component {
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
    await this.props.get(getPopularMoviesUrl(this.page));
  };

  handleRefresh = () => {
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
    data: state.popular,
  };
};

const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getPopular(url)),
});

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(Popular);
