import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Linking,
} from 'react-native';
import {Container, Content, Icon, Toast} from 'native-base';
import IconPack from '../../OnBoarding/Login/IconPack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import {strings} from '@values/strings';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import {color} from '@values/colors';

import {version} from '../../../../package.json';
import Theme from '../../../values/Theme';
const {width} = Dimensions.get('window');
import Share from 'react-native-share';

var fullName = '';

const AccountRow = ({icon, title, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.accountRowViewContainer}>
        <Image style={styles.imageStyle} source={icon} />
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.view}>
          <Image style={styles.forwardIconStyle} source={IconPack.FORWARD} />
        </View>
      </View>
      <View style={styles.border} />
    </TouchableOpacity>
  );
};

export default class AccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountEmailModal: false,
      isCallModalVisible: false,
    };
  }

  // componentDidMount() {
  // fullName =   this.getItem();
  // }

  async getItem() {
    let value = await AsyncStorage.getItem('fullName');
    console.warn(value, '00000');

    if (value) {
      let parsed = JSON.parse(value);
      console.warn('parsed', parsed);
      if (parsed) {
        return parsed;
      }
    }
  }

  setLogout = () => {
    Alert.alert(
      'Do you want to logout',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'LOG OUT',
          onPress: () => {
            this.setLoginData();
            this.props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'SignIn'}],
              }),
            );
          },
        },
      ],
      {cancelable: false},
    );
  };

  setLoginData() {
    global.userId = '';
    AsyncStorage.setItem('userId', '');
  }

  showAppVersion = () => {
    Toast.show({
      text: 'App version:  ' + version,
      // buttonText: "Okay",
      // textStyle: { color: "fbcb84" },
      // buttonTextStyle: { color: "#fbcb84" },
      // buttonStyle: { backgroundColor: "#FFFFFF" },
      duration: 5000,
    });
  };

  showCallEmailModal = () => {
    this.setState({accountEmailModal: true});
  };

  hideCallEmailModal = () => {
    this.setState({accountEmailModal: false});
  };
  showCallPopup = () => {
    this.setState({isCallModalVisible: true});
  };

  hideCallPopup = () => {
    this.setState({isCallModalVisible: false});
  };
  async myCustomShare() {
    console.log('sharecalled');
    const shareOptions = {
      message:
        'https://play.google.com/store/apps/details?id=com.project.jewelmart.royalchains',
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log('Error =>', error);
    }
  }
  _pressCall = () => {
    const url = 'tel:+123456789';
    //TODO ios
    //const url = 'tel://+123456789';
    Linking.openURL(url);
  };
  render() {
    return (
      <View style={{flex: 1, width: wp(100)}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground source={IconPack.LOGIN_BG} style={styles.bgImage}>
            <View style={styles.topViewContainer}>
              <Image
                style={styles.profileImageStyle}
                source={IconPack.PROFILE}
              />
              <Text style={styles.profileName}>Aziz Khan</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfile')}>
                <Text style={styles.editProfileText}>EDIT PROFILE</Text>
              </TouchableOpacity>
            </View>
            <AccountRow
              title="Order History"
              icon={IconPack.ORDER_HISTORY}
              onPress={() => this.props.navigation.navigate('OrderHistory')}
            />
            <AccountRow
              title="Custom Order"
              icon={IconPack.CUSTOM_ORDER}
              onPress={() => this.props.navigation.navigate('CustomOrder')}
            />
            <AccountRow
              title="Exclusive"
              icon={IconPack.EXCLUSIVE}
              onPress={() => alert('Todo')}
            />
            <AccountRow
              title="About Us"
              icon={IconPack.ABOUT}
              onPress={() => this.props.navigation.navigate('AboutUs')}
            />
            <AccountRow
              title="Call / Email Us"
              icon={IconPack.EMAIL}
              onPress={() => this.showCallEmailModal()}
            />
            <AccountRow
              title="Social Media"
              icon={IconPack.PROFILE}
              onPress={() => alert('Todo')}
            />
            <AccountRow
              title="WhatsApp"
              icon={IconPack.WHATS_UP}
              onPress={() => {
                Linking.openURL(
                  `whatsapp://send?phone=${917506604368}&text=${''}`,
                );
              }}
            />
            <AccountRow
              title="Share App"
              icon={IconPack.SHARE}
              onPress={() => this.myCustomShare()}
            />
            <AccountRow
              title="Rate App"
              icon={IconPack.RATE}
              onPress={() => this.myCustomShare()}
            />
            <AccountRow
              title="Version"
              icon={IconPack.VERSION}
              onPress={() => this.showAppVersion()}
            />
            <AccountRow
              title="Logout"
              icon={IconPack.LOGOUT}
              onPress={() => this.setLogout()}
            />
          </ImageBackground>

          {/* CALL / EMAIL MODAL */}
          <Modal
            isVisible={this.state.accountEmailModal}
            transparent={true}
            onRequestClose={() => this.hideCallEmailModal()}
            onBackdropPress={() => this.hideCallEmailModal()}
            onBackButtonPress={() => this.hideCallEmailModal()}
            style={{margin: 0}}>
            <TouchableWithoutFeedback style={{flex: 1}} onPress={() => null}>
              <>
                <View style={styles.mainContainer}>
                  <View style={styles.content}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.title}>Call / Email Us</Text>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            accountEmailModal: false,
                          })
                        }>
                        <Image
                          style={styles.closeIcon}
                          source={IconPack.CLOSE}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.border}></View>
                    <View style={styles.cityContainer}>
                      <View style={styles.circleContainer}>
                        <Text style={styles.circleText}>M</Text>
                      </View>
                      <View style={styles.location}>
                        <Text style={styles.locationText}>Mumbai</Text>
                      </View>
                    </View>

                    <View style={styles.addressContainer}>
                      <Text style={styles.addressText}>
                        Address : Zaveri Bazar
                      </Text>
                      <Text style={styles.emailText}>
                        Email : orders@royalchains.com
                      </Text>
                    </View>
                    <View style={styles.bottomContainer}>
                      <TouchableOpacity onPress={() => this.showCallPopup()}>
                        <Text style={styles.bottomText}>CALL</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => Alert.alert('email')}>
                        <Text style={styles.bottomText}>EMAIL</Text>
                      </TouchableOpacity>
                    </View>
                    <SafeAreaView />
                  </View>
                </View>
              </>
            </TouchableWithoutFeedback>

            <Modal
              isVisible={this.state.isCallModalVisible}
              transparent={true}
              onRequestClose={() => this.hideCallPopup()}
              onBackdropPress={() => this.hideCallPopup()}
              onBackButtonPress={() => this.hideCallPopup()}
              style={{margin: 0}}>
              <TouchableWithoutFeedback
                style={{flex: 1}}
                onPress={this._pressCall}>
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
                      Contacts
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          isCallModalVisible: false,
                        })
                      }>
                      <Image style={styles.closeIcon} source={IconPack.CLOSE} />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      marginHorizontal: 18,
                      borderBottomWidth: 0.8,
                      borderColor: '#D3D3D3',
                      marginBottom: 12,
                    }}>
                    <Text
                      style={{fontSize: 15, color: '#A9A9A9', marginBottom: 7}}>
                      Contact : 8100000000
                    </Text>
                    <Text
                      style={{fontSize: 15, color: '#A9A9A9', marginBottom: 7}}>
                      Description : Orders
                    </Text>
                  </View>
                  <View style={styles.buttonContainer}>
                    <ActionButtonRounded
                      title="CANCEL"
                      onButonPress={() =>
                        this.setState({
                          isCallModalVisible: false,
                        })
                      }
                      containerStyle={styles.buttonStyle}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </Modal>

          {/* CALL POPUP */}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    height: hp(100),
    width: wp(100),
  },
  imageStyle: {
    width: hp(3),
    height: hp(3),
  },
  forwardIconStyle: {
    width: hp(2),
    height: hp(2),
  },
  profileImageStyle: {
    width: hp(11),
    height: hp(11),
    borderRadius: hp(5),
    overflow: 'hidden',
    alignSelf:'center'
  },
  editProfileText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: hp(2),
    textDecorationLine: 'underline',
    textAlign:'center'

  },
  profileName: {
    color: '#FFFFFF',
    paddingTop: 8,
    paddingBottom: 10,
    fontSize: hp(3),
    textAlign:'center'
  },
  topViewContainer: {
    marginBottom: 50,
   // marginLeft: 16,
    marginTop: hp(2),
    alignSelf:'center',
    
  },
  accountRowViewContainer: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    marginHorizontal: 32,
    alignItems: 'center',
    padding: 12,
  },
  titleText: {
    fontSize: hp(2.2),
    color: '#FFFFFF',
    fontFamily: 'Lato-Regular',
  },
  titleView: {
    flex: 1,
    marginLeft: 50,
  },
  border: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.6,
    marginHorizontal: 16,
  },
  view: {
    marginLeft: 80,
  },
  closeIcon: {
    width: hp(2),
    height: hp(2),
    margin: 16,
  },
  mainContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  content: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    color: color.brandColor,
    fontSize: 18,
    margin: Platform.OS === 'android' ? 16 : 20,
  },
  border: {
    borderBottomWidth: 0.7,
    borderColor: '#D3D3D3',
  },
  cityContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 16,
  },
  circleContainer: {
    backgroundColor: '#d774ed',
    width: 38,
    height: 38,
    borderRadius: 19,
    alignContent: 'center',
    justifyContent: 'center',
  },
  circleText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'Helvetica',
  },
  location: {
    alignItems: 'flex-start',
    marginTop: 4,
    flex: 3,
    marginLeft: 12,
    height: 25,
    borderBottomWidth: 0.7,
    borderColor: '#D3D3D3',
  },
  locationText: {
    // color: '#A9A9A9',
    fontSize: 16,
  },
  addressContainer: {
    marginHorizontal: 16,
  },
  addressText: {
    color: '#A9A9A9',
    fontSize: 15,
    paddingBottom: 6,
  },
  emailText: {
    color: '#A9A9A9',
    fontSize: 15,
  },
  bottomContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bottomText: {
    fontSize: 16,
    color: color.brandColor,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    height: hp(8),
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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
    fontSize: 16,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '400',
  },
});
