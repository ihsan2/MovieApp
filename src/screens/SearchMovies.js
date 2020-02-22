import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {SearchBar, Icon} from 'react-native-elements';
import {getSearchMovies} from '../public/redux/actions/search';
import {getSearchMoviesUrl} from '../apis';
import {connect} from 'react-redux';
import NoResult from '../components/NoResult';
import GridMovies from '../components/GridMovies';

class SearchMovies extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }

  onSearch = search => {
    this.setState({search});
    try {
      this.props.get(getSearchMoviesUrl(search));
    } catch (err) {
      console.log(err);
    }
  };

  goBack = () => {
    this.props.navigation.goBack();
    this.props.data.data = [];
  };

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <SearchBar
            showLoading={this.props.data.isLoading}
            searchIcon={() => (
              <TouchableOpacity
                onPress={val => {
                  this.goBack(val);
                }}>
                <Icon name="chevron-small-left" type="entypo" color="#fff" />
              </TouchableOpacity>
            )}
            placeholderTextColor={'#fff'}
            placeholder="Search Movies ..."
            onChangeText={val => {
              this.onSearch(val);
            }}
            onClear={val => {
              this.onSearch(val);
            }}
            value={this.state.search}
            inputStyle={styles.colorStyle}
          />

          {this.props.data.data.length === 0 ? (
            <NoResult />
          ) : (
            <FlatList
              numColumns={3}
              data={this.props.data.data}
              renderItem={({item}) => (
                <GridMovies item={item} navigation={this.props.navigation} />
              )}
              keyExtractor={item => item.id.toString()}
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
  },
  colorStyle: {
    color: '#fff',
  },
});

const mapStateToProps = state => {
  return {
    data: state.searchmovies,
  };
};

const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getSearchMovies(url)),
});

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(SearchMovies);
