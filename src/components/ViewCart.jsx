import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const ViewCart = ({navigation, extraStyles}) => {
  const products = useSelector(state => state?.home?.cartProducts);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={[
        {
          width: '30%',
          borderRadius: 10,
          borderColor: 'yellow',
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        },
        extraStyles,
      ]}>
      <Text style={{color: 'white', fontWeight: '500'}}>View Cart</Text>
      <Text style={{color: 'white', fontWeight: '500'}}>
        {'-' + products?.length}
      </Text>
    </TouchableOpacity>
  );
};

export default ViewCart;
