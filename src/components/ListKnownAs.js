import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';

const ListKnownAs = props => {
  const {item} = props;
  return (
    <>
      <View style={styles.body}>
        <Text style={styles.name}>{item}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    height: h('4.6%'),
    backgroundColor: 'rgba(244, 244, 244, 0.4)',
    marginLeft: w('1.6%'),
    marginRight: w('1.6%'),
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: w('3.6%'),
    paddingRight: w('3.6%'),
    borderRadius: w('3.6%'),
  },
  name: {
    color: '#fff',
    fontSize: w('3.6%'),
    fontWeight: '800',
  },
});

export default ListKnownAs;
