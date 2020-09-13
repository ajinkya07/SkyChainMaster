import 'react-native-gesture-handler';
import * as React from 'react';
import Scene from '@navigation/Scene';
import {Root} from 'native-base';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from '@redux/store';
const store = configureStore();

class App extends React.Component {
  componentDidMount = () => {
     console.disableYellowBox = true;
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Root>
          <Provider store={store}>
            <Scene />
          </Provider>
        </Root>
      </View>
    );
  }
}

export default App;
