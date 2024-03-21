import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {Dropdown} from 'react-native-element-dropdown';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState('');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [subValue, setSubValue] = useState(null);
  const [subName, setSubName] = useState([
    {value: '1', label: 'Hydraulic Pumps'},
    {value: '2', label: 'Hydraulic Motors'},
    {value: '3', label: 'Surplus Stock'},
    {value: '4', label: 'Other Products'},
  ]);

  useEffect(() => {
    getToken();
  }, []);
  const getToken = async () => {
    const bodyParameters = {
      Username: 'apiuser@stacktech.io',
      Usersecret: '!api123',
      Userpassword: '!Temp123',
    };
    await axios
      .post('https://devapi.whitehouseproductsltd.com/token', bodyParameters)
      .then(response => {
        const token = response?.data?.auth_token;
        setToken(token);
        getProduct(token);
      })
      .catch(error => {
        Toast.show({
          position: 'top',
          type: 'error',
          text1: 'Token Error',
          text2: error,
          visibilityTime: 3000,
          autoHide: true,
        });
      });
  };

  const getProduct = async token => {
    const bodyParameters = {
      offset: currentPage.toString(),
      pagesize: 50,
      department:
        subValue === '1'
          ? 'hydraulic-pumps'
          : subValue === '2'
          ? 'hydraulic-motors'
          : subValue === '3'
          ? 'surplus-stock'
          : 'other-products',
    };
    setLoading(true);
    await axios
      .post(
        'https://devapi.whitehouseproductsltd.com/products',
        bodyParameters,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      )
      .then(response => {
        const nextPage = currentPage + 1;
        setDataSource([...dataSource, ...response?.data]);
        setCurrentPage(nextPage);
        setLoading(false);
      })
      .catch(error => {
        Toast.show({
          position: 'top',
          type: 'error',
          text1: 'Get Product Error',
          text2: error,
          visibilityTime: 3000,
          autoHide: true,
        });
      });
  };

  const ItemView = ({item}) => {
    return (
      <View style={styles.renderView}>
        <View style={styles.imgView}>
          <Image
            style={{width: 100, height: 100}}
            source={{uri: item.skuimageurl}}
          />
        </View>
        <View style={styles.cardDetailsView}>
          <Text style={styles.cardTxt1}>
            Name :<Text style={styles.cardTxt2}>{item.skuname_enGB}</Text>
          </Text>
          <Text style={styles.cardTxt1}>
            Price :<Text style={styles.cardTxt2}>{item.skuprice}</Text>
          </Text>
          <Text style={styles.cardTxt1}>
            QTY :<Text style={styles.cardTxt2}>{item.skuavailableitems}</Text>
          </Text>
          <Text style={styles.cardTxt1}>
            Rent Price :
            <Text style={styles.cardTxt2}>{item.skuretailprice}</Text>
          </Text>
          <Text style={styles.cardTxt1}>
            Decs :
            <Text style={styles.cardTxt2}>{item.skushortdescription_enGB}</Text>
          </Text>
        </View>
      </View>
    );
  };

  const fetchData = async () => {
    getProduct(token);
  };
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={{height: 40, width: '100%', margin: 20}}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            maxHeight={200}
            data={subName}
            itemTextStyle={styles.itemStyle}
            labelField="label"
            valueField="value"
            placeholder={'Other Products'}
            value={subValue}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setSubValue(item.value);
            }}
          />
        </View>
        <FlatList
          data={dataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
          onEndReached={fetchData}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() =>
            loading ? (
              <ActivityIndicator
                style={{marginVertical: 20}}
                size="large"
                color="blue"
              />
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#000',
    fontSize: 15,
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  paginationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: 'gray',
  },
  activeButton: {
    backgroundColor: '#22c55d',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  buttonText: {
    color: '#000',
  },
  itemStyle: {
    color: '#000',
  },
  renderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 10,
    margin: 5,
  },
  imgView: {
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTxt1: {
    fontSize: 11,
    color: '#000',
  },
  cardTxt2: {
    fontSize: 10,
    color: '#000',
  },
  cardDetailsView: {
    width: '60%',
  },
  dropdown: {
    height: 50,
    width: 200,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: '#000',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
});
