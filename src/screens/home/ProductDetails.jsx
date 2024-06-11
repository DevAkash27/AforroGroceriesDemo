import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addProduct} from '../../apiSlices/homeSlice';
import ViewCart from '../../components/ViewCart';

const ProductDetailScreen = ({navigation, route}) => {
  const {product} = route.params;
  const dispatch = useDispatch();

  const addToCart = item => {
    dispatch(addProduct(product));
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView>
        <ViewCart
          navigation={navigation}
          extraStyles={{alignSelf: 'flex-end', padding: 10}}
        />
        <Image source={{uri: product.image}} style={styles.image} />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{`${'$' + product.price}`}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </SafeAreaView>
      <TouchableOpacity onPress={() => addToCart()} style={styles.addToCart}>
        <Text style={{color: 'white'}}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#FFC55C',
  },
  image: {
    width: '100%',
    height: 400,
    marginBottom: 16,
    borderRadius: 8,
    marginTop: '2%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: 'black',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: 'black',
  },
  addToCart: {
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
});

export default ProductDetailScreen;
