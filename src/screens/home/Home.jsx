import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {FetchPosts} from '../../apiSlices/homeSlice';
import products from '../../constants/dummyData';
import {addProduct} from '../../apiSlices/homeSlice';
import ViewCart from '../../components/ViewCart';

const Home = ({navigation}) => {
  const [searchText, setSearchedText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await dispatch(FetchPosts());
  };

  const addToCart = item => {
    dispatch(addProduct(item));
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ProductDetails', {product: item})}>
      <Image source={{uri: item?.image}} style={styles.image} />
      <Text style={styles.name}>{item?.name}</Text>
      <Text style={styles.price}>{`${'$' + item?.price?.toFixed(2)}`}</Text>

      <TouchableOpacity
        onPress={() => addToCart(item)}
        style={styles.addToCart}>
        <Text style={{color: 'white'}}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
  return (
    <View style={{paddingVertical: '20%', paddingHorizontal: '6%'}}>
      <Text style={{fontSize: 24, fontWeight: '600'}}>Get Your Groceries</Text>
      <ViewCart navigation={navigation} extraStyles={styles.viewCartStyles} />
      <View>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchTextInput}
            placeholder="SEARCH"
            value={searchText}
            onChangeText={data => setSearchedText(data)}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Mock')}
        style={styles.mockTab}>
        <Text>View Mock Api Data List</Text>
      </TouchableOpacity>
      <FlatList
        data={products}
        style={{marginTop: '4%', marginBottom: '10%'}}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderWidth: 0.7,
    borderRadius: 10,
    borderColor: 'red',
    margin: 10,
    height: 210,
    width: '45%',
    shadowColor: '#DADADA',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 2,
    shadowRadius: 7,
    elevation: 20,
  },
  image: {
    width: '100%',
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  mockTab: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FAD5A5',
    marginTop: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 10,
    height: 20,
  },
  price: {
    fontSize: 16,
    color: 'gray',
  },
  viewCartStyles: {
    position: 'absolute',
    padding: 10,
    end: '8%',
    top: '10%',
  },
  searchBar: {
    borderRadius: 16,
    height: 40,
    borderWidth: 2,
    borderColor: '#FAD5A5',
    marginTop: '6%',
    justifyContent: 'center',
    shadowColor: '#DADADA',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 2,
    shadowRadius: 7,
    elevation: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchTextInput: {
    color: '#5D5D5D',
    fontSize: 12,
    fontWeight: '400',
    width: '90%',
  },
  addToCart: {
    width: '80%',
    backgroundColor: 'green',
    borderRadius: 8,
    padding: 8,
    marginTop: '5%',
  },
});
