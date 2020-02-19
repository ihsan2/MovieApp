import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {SearchBar, Icon} from 'react-native-elements';
import {getSearchPerson} from '../public/redux/actions/search';
import {getSearchPersonUrl} from '../apis';
import {connect} from 'react-redux';
import NoResult from '../components/NoResult';
import ListPeople from '../components/ListPeople';

class SearchPerson extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }

  onSearch = search => {
    this.setState({search});
    try {
      this.props.get(getSearchPersonUrl(search));
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
            placeholder="Search Actor ..."
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
              data={this.props.data.data}
              renderItem={({item}) => (
                <ListPeople item={item} navigation={this.props.navigation} />
              )}
              keyExtractor={item => item.id}
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
    data: state.searchperson,
  };
};

const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getSearchPerson(url)),
});

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(SearchPerson);
