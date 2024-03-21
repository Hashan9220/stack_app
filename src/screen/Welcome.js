import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';

export default function Welcome({navigation}) {
  const tostShow = () => {
    Toast.show({
      position: 'top',
      type: 'success',
      text1: 'Hello Welcome',
      text2: '👋Let' + "'" + 's Go Home🙋',
      visibilityTime: 3000,
      autoHide: true,
    });
  };
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.head}>
        <Text style={styles.headTxt}>Welcome To Our Place!</Text>
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity onPress={tostShow} style={styles.startBtn}>
          <Text style={styles.btnTxt}>Get Stated</Text>
        </TouchableOpacity>
      </View>
      <Toast
        ref={ref => {
          Toast.setRef(ref);
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  head: {
    width: '100%',
    height: '60%',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: '#373957',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headTxt: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '600',
  },
  btnView: {
    width: '100%',
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  startBtn: {
    width: '40%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#373957',
    borderRadius: 15,
  },
  btnTxt: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
});
