import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Button } from 'react-native';
import WebView from 'react-native-webview';


class WebViewComponent extends React.Component {


  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView source={{ uri: 'http://royal.chains.jewelmarts.in//about' }}
          style={{ marginTop: 0 }}
        />
      </SafeAreaView>
    );
  }
}
export default WebViewComponent;
