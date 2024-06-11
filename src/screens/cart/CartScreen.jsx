import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {removeProduct, setTotalAmount} from '../../apiSlices/homeSlice';

const CartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [cartTotal, setCartTotal] = useState(0);
  const products = useSelector(state => state?.home?.cartProducts);

  useEffect(() => {
    calculateTotal();
  }, [products]);

  const calculateTotal = () => {
    setCartTotal(0);
    products?.map(item => {
      setCartTotal(cartTotal => cartTotal + item?.price);
    });
  };
  const removeFromCart = item => {
    dispatch(removeProduct(item));
  };

  const goToAddress = () => {
    dispatch(setTotalAmount(cartTotal));
    navigation.navigate('Address');
  };
  return (
    <View style={{flex: 1, paddingVertical: '20%', paddingHorizontal: '6%'}}>
      <Text style={{fontSize: 24, fontWeight: '600'}}>Your Cart </Text>
      {products?.length === 0 && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 24, fontWeight: '600'}}>
            Your Cart is Empty
          </Text>
        </View>
      )}
      <FlatList
        data={products}
        style={{paddingVertical: '10%'}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Image source={{uri: item?.image}} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item?.name}</Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.price}>{`${
                  '$' + item?.price?.toFixed(2)
                }`}</Text>

                <TouchableOpacity
                  onPress={() => removeFromCart(item)}
                  style={styles.removeButton}>
                  <Text>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => {
          goToAddress();
        }}
        style={styles.buyButton}>
        <Text style={{color: 'white'}}>
          {`${'Proceed To Buy'} - ${'$' + cartTotal.toFixed(2)}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 10,
    marginTop: '4%',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#f0bf7a',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 8,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'black',
    marginVertical: 4,
  },
  description: {
    fontSize: 14,
    color: '#888',
  },
  buyButton: {
    width: '100%',
    backgroundColor: 'green',
    borderRadius: 8,
    padding: 16,
    marginTop: '5%',
    alignItems: 'center',
    position: 'absolute',
    bottom: '8%',
    marginHorizontal: '6%%',
  },
  removeButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#f0714a',
    alignItems: 'center',
  },
});

export default CartScreen;
