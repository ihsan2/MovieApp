import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {List, ListItem, Thumbnail, Left, Body} from 'native-base';
import {getW500ImageUrl} from '../apis';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w,
} from 'react-native-responsive-screen';

const ListCast = props => {
  const {item, navigation} = props;
  return (
    <>
      <View style={styles.body}>
        <TouchableOpacity
          onPress={() => {
            // here we navigate and pass props the components got it
            navigation.push('DetailPeople', {
              peopleId: item.id,
            });
          }}>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail
                  circular
                  source={{
                    uri: !item.profile_path
                      ? 'https://csgonline.org/wp-content/uploads/2016/08/Headshot-Silhouette-Unisex-3-Light-Grey-on-Dark-Grey.png'
                      : getW500ImageUrl(item.profile_path),
                  }}
                />
              </Left>
              <Body>
                <Text style={styles.name}> {item.name} </Text>
                <Text style={styles.character}> as {item.character} </Text>
              </Body>
            </ListItem>
          </List>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: h('1.2%'),
    paddingBottom: h('1.2%'),
  },
  name: {
    color: '#fff',
    fontSize: w('4.2%'),
    fontWeight: 'bold',
  },
  character: {
    color: 'rgba(123, 125, 125, 1)',
    fontSize: w('3.2%'),
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});

export default ListCast;
