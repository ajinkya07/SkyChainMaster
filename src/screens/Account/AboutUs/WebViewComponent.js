import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Button} from 'react-native';
import WebView from 'react-native-webview';


class WebViewComponent extends React.Component {
  state = {
    showWebView: false,
  };
  renderContent() {
    return <WebView source={{uri: 'https://heartbeat.fritz.ai/'}} />;
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        {this.state.showWebView && this.renderContent()}
        <Button
          title="Login"
          onPress={() => this.setState({showWebView: true})}
        />
      </SafeAreaView>
    );
  }
}
export default WebViewComponent;
