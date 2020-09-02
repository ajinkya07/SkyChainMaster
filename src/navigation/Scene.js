import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Container from '@homepage/Container';
import SignIn from '@login/SignIn';
import Register from '@register/Register';
import ForgotPassword from '@forgotPassword/ForgotPassword';
import VerifyOtp from '@forgotPassword/VerifyOtp';
import VerifyOtpForRegister from '@register/VerifyOtpForRegister';
import AboutUs from '@aboutUs/AboutUs';
import OrderHistory from '@orderHistory/OrderHistory';
import OrderHistoryDetail from '@orderHistory/OrderHistoryDetail';
import CustomOrder from '@accountCustomOrder/CustomOrder';

import ProductGrid from '@productGrid/ProductGrid';
import SubCategoryList from '@subCategoryList/SubCategoryList';
import CategoryContainer from '@category/CategoryContainer';
import ProductDetails from '@category/ProductDetails';
import SearchScreen from '@search/SearchScreen';
import Notification from '@notification/Notification';
import Banner from '@homepage/Banner';
import BannerImage from '@category/BannerImage'
import CartContainer from '@cartContainer/CartContainer'



import AsyncStorage from '@react-native-community/async-storage';


const Stack = createStackNavigator();

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginValue: '',
    };
  }

  componentDidMount() {
    this.getItem();
  }

  async getItem() {
    let value = await AsyncStorage.getItem('userId');

    if (value) {
      let parsed = JSON.parse(value);
      if (parsed) {
        global.userId = parsed;
        this.setState({ isLoginValue: true });
      } else {
        this.setState({ isLoginValue: false });
      }
    } else {
      this.setState({ isLoginValue: false });
    }
  }



  getLoginScene() {
    return (
      <Stack.Navigator initialRouteName={SignIn}>
        <Stack.Screen name="SignIn"
          component={SignIn} options={{ headerShown: false }}
        />
        <Stack.Screen name="Container"
          component={Container} options={{ headerShown: false }}
        />
        <Stack.Screen name="Register"
          component={Register} options={{ headerShown: false }}
        />
        <Stack.Screen name="ForgotPassword"
          component={ForgotPassword} options={{ headerShown: false }}
        />
        <Stack.Screen name="VerifyOtp"
          component={VerifyOtp} options={{ headerShown: false }}
        />
        <Stack.Screen name="VerifyOtpForRegister"
          component={VerifyOtpForRegister} options={{ headerShown: false }}
        />
        <Stack.Screen name="OrderHistory"
          component={OrderHistory} options={{ headerShown: false }}
        />
        <Stack.Screen name="OrderHistoryDetail"
          component={OrderHistoryDetail} options={{ headerShown: false }}
        />
        <Stack.Screen name="CustomOrder"
          component={CustomOrder} options={{ headerShown: false }}
        />
        <Stack.Screen name="AboutUs"
          component={AboutUs} options={{ headerShown: false }}
        />
        <Stack.Screen name="ProductGrid"
          component={ProductGrid} options={{ headerShown: false }}
        />
        <Stack.Screen name="SubCategoryList"
          component={SubCategoryList} options={{ headerShown: false }}
        />
        <Stack.Screen name="CategoryContainer"
          component={CategoryContainer} options={{ headerShown: false }}
        />
        <Stack.Screen name="ProductDetails"
          component={ProductDetails} options={{ headerShown: false }}
        />
        <Stack.Screen name="SearchScreen"
          component={SearchScreen} options={{ headerShown: false }}
        />
        <Stack.Screen name="Banner"
          component={Banner} options={{ headerShown: false }}
        />

        <Stack.Screen name="Notification"
          component={Notification} options={{ headerShown: false }}
        />
        <Stack.Screen name="BannerImage"
          component={BannerImage} options={{ headerShown: false }}
        />

        <Stack.Screen name="CartContainer"
          component={CartContainer} options={{ headerShown: false }}
        />

      </Stack.Navigator>

    );
  }

  getHomeScene() {
    return (
      <Stack.Navigator initialRouteName={Container}>
        <Stack.Screen name="Container"
          component={Container} options={{ headerShown: false }}
        />
        <Stack.Screen name="SignIn"
          component={SignIn} options={{ headerShown: false }}
        />

        <Stack.Screen name="Register"
          component={Register} options={{ headerShown: false }}
        />
        <Stack.Screen name="ForgotPassword"
          component={ForgotPassword} options={{ headerShown: false }}
        />
        <Stack.Screen name="VerifyOtp"
          component={VerifyOtp} options={{ headerShown: false }}
        />
        <Stack.Screen name="VerifyOtpForRegister"
          component={VerifyOtpForRegister} options={{ headerShown: false }}
        />
        <Stack.Screen name="OrderHistory"
          component={OrderHistory} options={{ headerShown: false }}
        />
        <Stack.Screen name="OrderHistoryDetail"
          component={OrderHistoryDetail} options={{ headerShown: false }}
        />
        <Stack.Screen name="CustomOrder"
          component={CustomOrder} options={{ headerShown: false }}
        />
        <Stack.Screen name="AboutUs"
          component={AboutUs} options={{ headerShown: false }}
        />
        <Stack.Screen name="ProductGrid"
          component={ProductGrid} options={{ headerShown: false }}
        />
        <Stack.Screen name="SubCategoryList"
          component={SubCategoryList} options={{ headerShown: false }}
        />

        <Stack.Screen name="CategoryContainer"
          component={CategoryContainer} options={{ headerShown: false }}
        />
        <Stack.Screen name="ProductDetails"
          component={ProductDetails} options={{ headerShown: false }}
        />
        <Stack.Screen name="SearchScreen"
          component={SearchScreen} options={{ headerShown: false }}
        />
        <Stack.Screen name="Banner"
          component={Banner} options={{ headerShown: false }}
        />
        <Stack.Screen name="Notification"
          component={Notification} options={{ headerShown: false }}
        />
        <Stack.Screen name="BannerImage"
          component={BannerImage} options={{ headerShown: false }}
        />

        <Stack.Screen name="CartContainer"
          component={CartContainer} options={{ headerShown: false }}
        />

      </Stack.Navigator>

    );
  }

  render() {
    const { isLoginValue } = this.state;
    return (
      <NavigationContainer>
        {isLoginValue !== ''
          ? isLoginValue === true
            ? this.getHomeScene()
            : this.getLoginScene()
          : null}
        {/* {this.getLoginScene()} */}

      </NavigationContainer>
    );
  }
}

export default Scene;

// FOR LOG OUT
// global.userId =  "";
// AsyncStorage.setItem('userId', "")
