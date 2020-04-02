/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Picker,
  ImageBackground,
  Alert,
  Dimensions,
} from 'react-native';
import {
  Button, 
  Input, 
  ThemeProvider, 
  Divider, 
  Text,
  Overlay,
  Image
} from 'react-native-elements';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import conversionData from './data/conversion-factors.json';

const App: () => React$Node = () => {
  const [selectedValue, setSelectedValue] = useState("car");
  const [value, onChangeText] = useState('');
  const [fuelType, setFuelType] = useState("petrol");
  const [googleSearches, setGoogleSearches] = useState(false);

  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_HEIGHT = Dimensions.get('window').height;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <ImageBackground
            accessibilityRole={'image'}
            source={require('./images/wind-farm-sea.jpg')}
            style={styles.background}
            imageStyle={styles.logo}>
            <Text h1 style={styles.text}>Isolation Carbon Calculator</Text>
          </ImageBackground>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <ThemeProvider
            theme={{
              Input: {
                containerStyle: {
                  width: SCREEN_WIDTH - 50,
                },
                inputContainerStyle: {
                  borderRadius: 40,
                  borderWidth: 1,
                  borderColor: 'rgba(110, 120, 170, 1)',
                  height: 50,
                  marginVertical: 10,
                },
                placeholderTextColor: 'rgba(110, 120, 170, 1)',
                inputStyle: {
                  marginLeft: 10,
                  color: 'white',
                },
                keyboardAppearance: 'light',
                blurOnSubmit: false,
              },
            }}
          >
          <View style={{
                backgroundColor: 'rgba(46, 50, 72, 1)',
                width: SCREEN_WIDTH,
                alignItems: 'center',
                paddingBottom: 30,
              }}>
            <View style={[styles.pickerView, {width: SCREEN_WIDTH - 50, borderColor: 'gray'}]}>
              <Picker
                style={styles.pickerContainerStyle}
                itemStyle={styles.pickerStyle}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)} >
                <Picker.Item label="Car" value="car" />
                {/* <Picker.Item label="Bus" value="bus" />
                <Picker.Item label="Train" value="train" />
                <Picker.Item label="Walk" value="walk" />
                <Picker.Item label="Bike" value="bike" /> */}
              </Picker>
            </View>
            <View style={{borderColor: 'gray'}}>
              <Input
                onChangeText={text => onChangeText(text)}
                value={value}
                label={'Distance in Miles'}
                placeholder={'20'} />
            </View>
            { (selectedValue == 'car') && 
              <View style={[styles.pickerView, {width: SCREEN_WIDTH - 50, borderColor: 'gray', borderBottomWidth: 0}]}>
                <Picker
                  style={styles.pickerContainerStyle}
                  selectedValue={fuelType}
                  onValueChange={(itemValue, itemIndex) => setFuelType(itemValue)} >
                  <Picker.Item label="Petrol" value="petrol" />
                  <Picker.Item label="Diesel" value="diesel" />
                  <Picker.Item label="Hybrid" value="hybrid" />
                  <Picker.Item label="Electric" value="electric" />
                </Picker>
              </View>
            }
            <View style={{width: SCREEN_WIDTH - 50}}>
              <Divider style={{ backgroundColor: 'rgba(110, 120, 170, 1)', height: 4 }} />
              <Text h4 style={{color: 'white'}}>Total Emissions: {conversion(selectedValue, value, fuelType)}</Text>
              <Divider style={{ backgroundColor: 'rgba(110, 120, 170, 1)', height: 4 }} />
            </View>
            <View style={{borderWidth: 10, borderColor: 'transparent'}}>
              <Button
                buttonStyle={styles.button}
                title="&#128270; Google searches &#128269;"
                // onPress={() => Alert.alert(`${google(conversion(selectedValue, value, fuelType))} Google Searches`)}
                onPress={() => setGoogleSearches(true)}
              />
              <Button
                buttonStyle={{backgroundColor: '#738A9A'}}
                titleStyle={{color: '#0E2D49'}}
                title="&#9749; Kettles boiled &#9749;"
                onPress={() => Alert.alert(`${kettles(conversion(selectedValue, value, fuelType))} Kettles Boiled`)}
              />
              <Button
                title="&#128250; Netflix episodes &#128250;"
                onPress={() => Alert.alert(`${netflix(conversion(selectedValue, value, fuelType))} Netflix Episodes (30 minutes)`)}
              />
            </View>
          </View>
          {googleSearches && <Overlay
            height={SCREEN_HEIGHT - 350}
            width={SCREEN_WIDTH - 150}
            isVisible={googleSearches}
            onBackdropPress={() => setGoogleSearches(false)}
          >
            <Text h4 style={{color: 'gray'}}>That's:</Text>
            <Text h3>{google(conversion(selectedValue, value, fuelType))}</Text>
            <Text h4 style={{color: 'gray'}}>Google Searches</Text>
            <Image source={require('./images/panic.jpg')}/>
          </Overlay>}
          </ThemeProvider>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const conversion = (mode, miles, fuel) => {
  if(mode == 'car') {
    const kgCO2 = conversionData[mode].find(x => x.fuel == fuel).CO2kg * miles;
    return isNaN(kgCO2) ? "" : kgCO2;
  }
  const kgCO2 = conversionData[mode][0].CO2kg * miles;
  return isNaN(kgCO2) ? "" : kgCO2;
}

const google = (kgCO2) => {
  return ((kgCO2 * 1000) / 7).toFixed(3);
}

const netflix = (kgCO2) => {
  return (kgCO2 / 1.593842559).toFixed(3);
}

const kettles = (kgCO2) => {
  return ((kgCO2 * 1000) / 15).toFixed(3);
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  logo: {
    overflow: 'visible',
    resizeMode: 'cover',
  },
  background: {
    paddingBottom: 40,
    paddingTop: 96,
    paddingHorizontal: 32,
    backgroundColor: Colors.lighter,
  },
  button: {
    backgroundColor: '#0E2D49'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  text: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    width: '70%',
  },
  pickerContainerStyle: {
    borderRadius: 40,
    borderWidth: 1,
    borderBottomWidth:1,
    borderColor: 'rgba(110, 120, 170, 1)',
    height: 50,
    marginVertical: 10,
    marginTop: 15,
    marginLeft:20,
    marginRight:20,
    color: 'rgba(110, 120, 170, 1)'
  },
  pickerStyle: {
    alignSelf: 'center',
    color: 'white',
  },
  pickerView: {
    marginTop: 15,
    marginLeft:20,
    marginRight:20,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderRadius: 10,
    alignSelf: 'center'
  },
});

export default App;
