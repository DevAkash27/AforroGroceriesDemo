import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const MockApiList = ({navigation}) => {
  const mockData = useSelector(state => state?.home?.mockData);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.item}>
        <Text style={styles.title}>{`${'User:'}${item?.userId}`}</Text>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.body}>{item?.body}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <Text style={{fontSize: 24, fontWeight: '600', marginHorizontal: 10}}>
        Mock Data Response
      </Text>
      <FlatList
        data={mockData}
        style={{marginTop: '4%', marginBottom: '10%'}}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default MockApiList;

const styles = StyleSheet.create({
  item: {
    padding: 20,
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
  title: {
    fontSize: 16,
    height: 20,
  },
  body: {
    fontSize: 16,
    color: 'gray',
    height: 150,
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
