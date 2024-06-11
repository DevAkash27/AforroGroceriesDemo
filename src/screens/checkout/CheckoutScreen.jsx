import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProduct,
  selectedPaymentOption,
  setTotalAmount,
} from '../../apiSlices/homeSlice';

const CheckoutScreen = ({navigation, route}) => {
  let address =
    route?.params?.address +
    ' ,' +
    route?.params?.city +
    ' ,' +
    route?.params?.postalCode;
  const products = useSelector(state => state?.home?.cartProducts);
  const paymentMethod = useSelector(state => state?.home?.paymentMethod);
  const totalAmount = useSelector(state => state?.home?.totalAmount);
  const dispatch = useDispatch();

  const orderNow = () => {
    Alert.alert('Yippiee!!', 'Your Order has been placed successfully', [
      {
        text: 'OK',
        onPress: () => {
          navigateToHomeScreen();
        },
      },
    ]);
  };

  const navigateToHomeScreen = () => {
    dispatch(setTotalAmount(0));
    dispatch(selectedPaymentOption('Credit/Debit Card'));
    dispatch(addProduct([]));
    navigation.navigate('Home');
  };

  return (
    <>
      <View style={{padding: 10}}>
        <Text style={{paddingTop: '10%', fontSize: 24, fontWeight: '600'}}>
          Order Now
        </Text>
        <FlatList
          data={products}
          style={{height: products?.length > 3 ? '40%' : 'auto'}}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Image source={{uri: item.image}} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>

                <Text style={styles.price}>{`${
                  '$' + item?.price?.toFixed(2)
                }`}</Text>
              </View>
            </View>
          )}
        />
        <ScrollView>
          <View style={{marginTop: '20%'}}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>
              Address Details
            </Text>
            <View style={styles.addressView}>
              <Text style={{marginTop: 10, fontSize: 16, fontWeight: '500'}}>
                {address}
              </Text>
            </View>

            <Text style={{fontSize: 18, fontWeight: '600', marginTop: '6%'}}>
              Selected Payment Method
            </Text>
            <View style={styles.selectedPaymentMethodView}>
              <Text style={{marginTop: 10, fontSize: 16, fontWeight: '500'}}>
                {paymentMethod}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity onPress={() => orderNow()} style={styles.buyButton}>
        <Text style={{color: 'white'}}>
          {`${'Buy'} - ${'$' + totalAmount.toFixed(2)}`}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default CheckoutScreen;
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
    width: '90%',
    backgroundColor: 'green',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    position: 'absolute',
    bottom: '5%',
    marginHorizontal: '4%%',
  },
  selectedPaymentMethodView: {
    height: 40,
    borderColor: '#FAD5A5',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: '4%',
  },
  addressView: {
    height: 40,
    borderColor: '#FAD5A5',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: '4%',
  },
});
