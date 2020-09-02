import React, {Component} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Platform,
  Linking,
} from 'react-native';
import {Icon, Header, Item, Input, Card, Body, Toast} from 'native-base';
import _Container from '@container/_Container';
import {color} from '@values/colors';
import _Tabs from '@tabs/_Tabs';
import HomePageStyle from '@homepage/HomePageStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import {strings} from '@values/strings';
import {getTotalCartCount} from '@homepage/HomePageAction';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import IconPack from '../OnBoarding/Login/IconPack';
import Theme from '../../values/Theme';

var userId = '';

const CallComponent = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          marginHorizontal: 18,
          borderBottomWidth: 0.8,
          borderColor: '#D3D3D3',
          marginBottom: 10,
        }}>
        <Text
          style={{
            ...Theme.ffLatoRegular16,
            color: color.brandColor,
            marginBottom: 7,
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCallModalVisible: false,
    };
    userId = global.userId;
  }

  componentDidMount = async () => {
    const data2 = new FormData();
    data2.append('user_id', userId);
    data2.append('table', 'cart');

    await this.props.getTotalCartCount(data2);
  };
  showCallPopup = () => {
    this.setState({isCallModalVisible: true});
  };

  hideCallPopup = () => {
    this.setState({isCallModalVisible: false});
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      successTotalCartCountVersion,
      errorTotalCartCountVersion,
    } = nextProps;
    let newState = null;
    if (successTotalCartCountVersion > prevState.successTotalCartCountVersion) {
      newState = {
        ...newState,
        successTotalCartCountVersion: nextProps.successTotalCartCountVersion,
      };
    }
    if (errorTotalCartCountVersion > prevState.errorTotalCartCountVersion) {
      newState = {
        ...newState,
        errorTotalCartCountVersion: nextProps.errorTotalCartCountVersion,
      };
    }

    return newState;
  }

  async componentDidUpdate(prevProps, prevState) {
    const {totalCartCountData} = this.props;

    if (
      this.state.successTotalCartCountVersion >
      prevState.successTotalCartCountVersion
    ) {
      //AsyncStorage.setItem("totalCartCount", totalCartCountData.count)
      global.totalCartCount = totalCartCountData.count;
    }
  }

  onNotificationPress() {
    this.props.navigation.navigate('Notification');
  }

  renderSearchbar = () => {
    this.props.navigation.navigate('SearchScreen');
  };

  renderCall = () => {
    // alert('call');
    this.showCallPopup();
  };
  _pressCall = () => {
    const url = 'tel:+123456789';
    //TODO ios
    //const url = 'tel://+123456789';
    Linking.openURL(url);
  };

  render() {
    const {safeAreaView} = HomePageStyle;

    return (
      <SafeAreaView style={safeAreaView}>
        <_Container
          showHeader
          showSearch
          showNotification
          showCalling
          showLogo={false}
          showBack={false}
          showLoading={false}
          onSearchPress={() => this.renderSearchbar()}
          onCallingPress={() => this.renderCall()}
          onNotificationPress={() => this.onNotificationPress()}>
          <_Tabs count={global.totalCartCount} />
        </_Container>
        <Modal
          isVisible={this.state.isCallModalVisible}
          transparent={true}
          onRequestClose={() => this.hideCallPopup()}
          onBackdropPress={() => this.hideCallPopup()}
          onBackButtonPress={() => this.hideCallPopup()}
          style={{margin: 0}}>
          <TouchableWithoutFeedback style={{flex: 1}} onPress={this._pressCall}>
            <View
              style={{
                backgroundColor: '#ffffff',
                marginHorizontal: 16,
                borderRadius: 14,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    marginLeft: 10,
                    marginVertical: Platform.OS === 'android' ? 8 : 12,
                  }}>
                  Contact
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      isCallModalVisible: false,
                    })
                  }>
                  <Image
                    style={{width: hp(2.5), height: hp(2.5), margin: 16}}
                    source={IconPack.CLOSE}
                  />
                </TouchableOpacity>
              </View>

              <CallComponent title="Phone Call" onPress={this._pressCall} />
              <CallComponent
                title="WhatsApp"
                onPress={() => {
                  Linking.openURL(
                    `whatsapp://send?phone=${917506604368}&text=${''}`,
                  );
                }}
              />
              <CallComponent
                title="Email"
                onPress={() => {
                  Linking.openURL(
                    'mailto:somethingemail@gmail.com?subject=abcdefg?body=body',
                  );
                }}
              />

              <View
                style={{
                  //marginVertical: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <ActionButtonRounded
                  title="CANCEL"
                  onButonPress={() =>
                    this.setState({
                      isCallModalVisible: false,
                    })
                  }
                  containerStyle={{marginBottom: 10}}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    );
  }
}

const ActionButtonRounded = ({title, onButonPress, containerStyle}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onButonPress();
      }}>
      <View
        style={[
          actionButtonRoundedStyle.mainContainerStyle,
          containerStyle || null,
        ]}>
        <View style={actionButtonRoundedStyle.innerContainer}>
          <Text style={actionButtonRoundedStyle.titleStyle}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const actionButtonRoundedStyle = StyleSheet.create({
  mainContainerStyle: {
    backgroundColor: '#11255a',
    height: hp(6),
    width: wp(40),
    justifyContent: 'center',
    borderRadius: 45,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: '#ffffff',
    ...Theme.ffLatoBold13,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '400',
  },
});

function mapStateToProps(state) {
  return {
    isFetching: state.homePageReducer.isFetching,
    error: state.homePageReducer.error,
    errorMsg: state.homePageReducer.errorMsg,

    successTotalCartCountVersion:
      state.homePageReducer.successTotalCartCountVersion,
    errorTotalCartCountVersion:
      state.homePageReducer.errorTotalCartCountVersion,
    totalCartCountData: state.homePageReducer.totalCartCountData,
  };
}

export default connect(
  mapStateToProps,
  {getTotalCartCount},
)(Container);
