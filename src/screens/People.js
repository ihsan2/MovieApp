import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  View,
} from 'react-native';
import {Header, Body, Right} from 'native-base';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ListPeople from '../components/ListPeople';
import {connect} from 'react-redux';
import {getPopularPeople} from '../public/redux/actions/people';
import {getPopularPersonUrl} from '../apis';

class People extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      people: [],
      page: 1,
      load: false,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({load: true});
    this.getData();
  }

  getData = async () => {
    await this.props.get(getPopularPersonUrl(this.state.page)).then(() => {
      this.setState({
        people: [...this.state.people, ...this.props.data.data],
        load: false,
      });
    });
  };

  handleRefresh = () => {
    this.setState({people: [], page: 1, load: true}, () => {
      this.getData();
    });
  };

  handleLoadMore = () => {
    this.setState({page: this.state.page + 1}, () => {
      this.getData();
    });
  };

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
              <Text style={styles.textHeader}>People</Text>
            </Body>
            <Right>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SearchPerson')}>
                <MaterialIcons
                  name="search"
                  color={'#fff'}
                  size={28}
                  style={styles.right}
                />
              </TouchableOpacity>
            </Right>
          </Header>

          {this.state.load ? (
            <View style={styles.body}>
              <ActivityIndicator size={'large'} color={'#343336'} />
            </View>
          ) : (
            <FlatList
              data={this.state.people}
              renderItem={({item}) => (
                <ListPeople item={item} navigation={this.props.navigation} />
              )}
              keyExtractor={item => item.id.toString()}
              style={styles.list}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
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
  },
  header: {
    backgroundColor: '#343336',
  },
  body: {
    justifyContent: 'center',
    flex: 1,
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
    fontSize: w('4%'),
  },
  activeText: {
    color: '#22B07F',
    fontWeight: '900',
    fontSize: w('4%'),
  },
  list: {
    marginTop: h('0.2%'),
  },
  loadMore: {
    marginBottom: h('2%'),
    marginTop: h('2%'),
  },
});

const mapStateToProps = state => {
  return {
    data: state.people,
  };
};

const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getPopularPeople(url)),
});

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(People);
