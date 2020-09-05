
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import FloatingLabelTextInput from '@floatingInputBox/FloatingLabelTextInput';
import DatePickerComponent from './DatePickerComponent';
import DatePickerComponent1 from './DatePickerComponent1';
import DateTimePicker from 'react-native-modal-datetime-picker';
import _CustomHeader from '@customHeader/_CustomHeader';
import { Toast } from 'native-base'
import { getProfile ,getStateList, getCityList, updateUserProfile} from '@editProfile/EditProfileAction';
import { connect } from 'react-redux'
import { allParameters } from '@homepage/HomePageAction';
import { strings } from '@values/strings'



const { width } = Dimensions.get('window');

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      mobileNo: '',
      designation: '',
      companyName: '',
      panNo: '',
      gstNo: '',
      pinCode: '',
      dobSelected: '',
      anniversaryDate: '',

      countryData: [],
      isCountryModalVisible: false,
      isStateModalVisible: false,
      isCityModalVisible: false,

      stateData: [],
      cityData:[],

      successGetProfileVersion: 0,
      errorGetProfileVersion: 0,

      successUpdateProfileVersion: 0,
      errorUpdateProfileVersion: 0,

      successAllParameterVersion: 0,
      errorAllParamaterVersion: 0,

      successGetStateListVersion: 0,
      errorGetStateListVersion: 0,

      successGetCityListVersion: 0,
      errorGetCityListVersion: 0,
      cityList: [],

      selectedCountry: 'Select country',
      selectedState: 'Select state',
      selectedCity: 'Select city'

    };
    userId = global.userId;

    this.emailRef = React.createRef();
    this.mobileRef = React.createRef();
    this.designationRef = React.createRef();
    this.companyNameRef = React.createRef();
    this.gstRef = React.createRef();
    this.pinCodeRef = React.createRef();

  }

  componentDidMount = async () => {
    const data = new FormData();

    data.append('user_id', userId);

    await this.props.getProfile(data)

    await this.props.allParameters(data)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { successGetProfileVersion, errorGetProfileVersion,
      successUpdateProfileVersion, errorUpdateProfileVersion,
      successAllParameterVersion, errorAllParamaterVersion,
      successGetStateListVersion, errorGetStateListVersion,
      successGetCityListVersion, errorGetCityListVersion
    } = nextProps;

    let newState = null;

    if (successGetProfileVersion > prevState.successGetProfileVersion) {
      newState = {
        ...newState,
        successGetProfileVersion: nextProps.successGetProfileVersion,
      };
    }
    if (errorGetProfileVersion > prevState.errorGetProfileVersion) {
      newState = {
        ...newState,
        errorGetProfileVersion: nextProps.errorGetProfileVersion,
      };
    }

    if (successUpdateProfileVersion > prevState.successUpdateProfileVersion) {
      newState = {
        ...newState,
        successUpdateProfileVersion: nextProps.successUpdateProfileVersion,
      };
    }
    if (errorUpdateProfileVersion > prevState.errorUpdateProfileVersion) {
      newState = {
        ...newState,
        errorUpdateProfileVersion: nextProps.errorUpdateProfileVersion,
      };
    }

    if (successAllParameterVersion > prevState.successAllParameterVersion) {
      newState = {
        ...newState,
        successAllParameterVersion: nextProps.successAllParameterVersion,
      };
    }
    if (errorAllParamaterVersion > prevState.errorAllParamaterVersion) {
      newState = {
        ...newState,
        errorAllParamaterVersion: nextProps.errorAllParamaterVersion,
      };
    }

    
    if (successGetStateListVersion > prevState.successGetStateListVersion) {
      newState = {
        ...newState,
        successGetStateListVersion: nextProps.successGetStateListVersion,
      };
    }
    if (errorGetStateListVersion > prevState.errorGetStateListVersion) {
      newState = {
        ...newState,
        errorGetStateListVersion: nextProps.errorGetStateListVersion,
      };
    }


    
    if (successGetCityListVersion > prevState.successGetCityListVersion) {
      newState = {
        ...newState,
        successGetCityListVersion: nextProps.successGetCityListVersion,
      };
    }
    if (errorGetCityListVersion > prevState.errorGetCityListVersion) {
      newState = {
        ...newState,
        errorGetCityListVersion: nextProps.errorGetCityListVersion,
      };
    }

    return newState;
  }

  async componentDidUpdate(prevProps, prevState) {
    const { getProfileData, allParameterData, stateList,cityList,updateProfileData } = this.props;

    if (this.state.successGetProfileVersion > prevState.successGetProfileVersion) {
      this.setState({
        name: getProfileData.data.full_name ? getProfileData.data.full_name : '',
        email: getProfileData.data.email_id ? getProfileData.data.email_id : '',
        mobileNo: getProfileData.data.mobile_number ? getProfileData.data.mobile_number : '',
        designation: getProfileData.data.designation ? getProfileData.data.designation : '',
        companyName: getProfileData.data.organisation ? getProfileData.data.organisation : '',
        panNo: getProfileData.data.pan ? getProfileData.data.pan : '',
        gstNo: getProfileData.data.gst ? getProfileData.data.gst : '',
        pinCode: getProfileData.data.pincode ? getProfileData.data.pincode : '',
        dobSelected: getProfileData.data.birthday ? getProfileData.data.birthday : '',
        anniversaryDate: getProfileData.data.anniversary_date ? getProfileData.data.anniversary_date : ''
      });
    }


    if (this.state.errorGetProfileVersion > prevState.errorGetProfileVersion) {
      this.showToast(this.props.errorMsg, 'danger');
    }
    if (this.state.successUpdateProfileVersion > prevState.successUpdateProfileVersion) {

      this.showToast(this.props.errorMsg, 'success');

      // this.setState({
      //   name: '',
      //   email: '',
      //   mobileNo: '',
      //   designation: '',
      //   companyName: '',
      //   panNo: '',
      //   gstNo: '',
      //   pinCode: '',
      //   dobSelected: '',
      //   anniversaryDate: '',
      // });
    }
    if (this.state.errorUpdateProfileVersion > prevState.errorUpdateProfileVersion) {
      this.showToast(this.props.errorMsg, 'danger');
    }

    if (this.state.successAllParameterVersion > prevState.successAllParameterVersion) {
      this.setState({
        countryData: allParameterData.country_data
      })
    }
    if (this.state.errorAllParamaterVersion > prevState.errorAllParamaterVersion) {

    }
    if (this.state.successGetStateListVersion > prevState.successGetStateListVersion) {
      this.setState({
        stateData: stateList.states
      })
    }
    if (this.state.successGetCityListVersion > prevState.successGetCityListVersion) {
      this.setState({
        cityData: cityList.cities
      })
    }

  }

  showToast = (msg, type, duration) => {
    Toast.show({
      text: msg ? msg : strings.serverFailedMsg,
      type: type ? type : 'danger',
      duration: duration ? duration : 2500,
    });
  };



  toggleCountryModal = () => {
    this.setState({ isCountryModalVisible: !this.state.isCountryModalVisible });
  };

  toggleStateModal = () => {
    this.setState({ isStateModalVisible: !this.state.isStateModalVisible });
  };
  toggleCityModal = () => {
    this.setState({ isCityModalVisible: !this.state.isCityModalVisible });
  };

  handleNameChange = newText =>
    this.setState({
      name: newText,
    });
  resetFieldName = () =>
    this.setState({
      name: '',
    });
  handleEmailChange = newText =>
    this.setState({
      email: newText,
    });
  resetFieldEmail = () =>
    this.setState({
      email: '',
    });
  handleMobileNoChange = newText =>
    this.setState({
      email: newText,
    });
  resetFieldMobileNo = () =>
    this.setState({
      email: '',
    });
  handleDesignationChange = newText =>
    this.setState({
      designation: newText,
    });
  resetFieldDesignation = () =>
    this.setState({
      designation: '',
    });
  handleCompanyNameChange = newText =>
    this.setState({
      companyName: newText,
    });
  resetFieldCompanyName = () =>
    this.setState({
      companyName: '',
    });
  handlePanNoChange = newText =>
    this.setState({
      panNo: newText,
    });
  resetFieldPanNo = () =>
    this.setState({
      panNo: '',
    });
  handleGSTNoChange = newText =>
    this.setState({
      gstNo: newText,
    });
  resetFieldGSTNo = () =>
    this.setState({
      gstNo: '',
    });
  handlePinCodeChange = newText =>
    this.setState({
      pinCode: newText,
    });
  resetFieldPinCode = () =>
    this.setState({
      pinCode: '',
    });


  setDOB = (date) => {
    this.setState({
      dobSelected: date
    })
  }

  setAnniversaryDate = (date) => {
    this.setState({
      anniversaryDate: date
    })
  }

  setSelecedCountry = (index) => {
    const { countryData } = this.state

    let country  = countryData.filter(i => i.id == index)
    let name = country[0].name
    let id = country[0].id


    const s = new FormData()
    s.append('country_id', index)
    this.props.getStateList(s)

    this.setState({ isCountryModalVisible: false, selectedCountry: name,selectedCountryId:id })

  }

  setSelecedState = (index) => {
    const { stateData } = this.state

    let state  = stateData.filter(i => i.id == index)
    let stateName = state[0].name
    let stateId = state[0].id


    const c = new FormData()
    c.append('state_id', index)
    this.props.getCityList(c)

    this.setState({ isStateModalVisible: false,selectedState:stateName, selectedStateId:stateId })
  }

  setSelecedCity = (index) => {
    const { cityData } = this.state

    let city  = cityData.filter(i => i.id == index)
    let cityName = city[0].name
    let cityId= city[0].id


    this.setState({ isCityModalVisible: false, selectedCity:cityName, selectedCityId: cityId })
  }


  updateProfile = () =>{
    const {
      name,email,mobileNo,
      designation,companyName, panNo,gstNo,pinCode,
      dobSelected,anniversaryDate,
      selectedCountryId,selectedStateId ,selectedCityId} = this.state

      const updateData = new FormData()

      updateData.append('user_id',userId)
      updateData.append('delivery_mode','Cash')
      updateData.append('payment_terms','Return')
      updateData.append('pan',panNo)
      updateData.append('designation',designation)
      updateData.append('birthday',dobSelected)
      updateData.append('anniversary_date',anniversaryDate)
      updateData.append('full_name',name)
      updateData.append('organization',companyName)
      updateData.append('gst',gstNo)
      updateData.append('country_id',selectedCountryId)
      updateData.append('state_id',selectedStateId)
      updateData.append('city_id',selectedCityId)
      updateData.append('pincode',pinCode)

        this.props.updateUserProfile(updateData)

  }

  render() {

    const{allParameterData} = this.props
    const{countryData, selectedCountry, selectedState, selectedCity} = this.state

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <>

          <_CustomHeader
            Title="Edit Profile"
            LeftBtnPress={() => this.props.navigation.goBack()}
            backgroundColor="#19af81"
          />

          <View style={styles.container}>
            {/* <View
              style={{
                backgroundColor: '#fbcb84',
                width: '100%',
                height: hp('8%'),
                width: wp('100%'),
                borderBottomRightRadius: 24,
                borderBottomLeftRadius: 24,
              }}></View> */}
            {/* <Image
              source={require('../../../assets/image/ProfilePic.png')}
              style={{
                width: 42,
                height: 42,
                resizeMode: 'cover',
                position: 'absolute',
                top: Platform.OS === 'ios' ? hp(4.8) : 35,
                bottom: 0,
              }}
            /> */}
            <View
              style={{
                flex: 1,
                width: '94%',
                marginTop: Platform.OS === 'ios' ? hp(2.5) : hp(3.5),
                marginBottom: Platform.OS === 'ios' ? hp(2.5) : hp(3.5),
                borderRadius: 10,
                backgroundColor: '#ffffff',
                shadowColor: '#000000',
                shadowOpacity: 0.2,
                shadowRadius: 2,
                shadowOffset: { height: 1, width: 1, },
                elevation: 1,
              }}>
              <View
                style={{
                  height: hp(3.5),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../../../assets/image/ProfilePic.png')}
                  style={{
                    width: hp(6),
                    height: hp(6),
                    resizeMode: 'cover',
                    position: 'absolute',
                    bottom: 0,
                  }}
                />
                {/* <Text style={{ fontSize: 20, color: '#11255a' }}>PROFILE</Text> */}

              </View>

              <ScrollView keyboardShouldPersistTaps={'always'}>
                <View
                  style={{
                    marginHorizontal: 20,
                    marginTop: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <FloatingLabelTextInput
                    label="Full Name"
                    value={this.state.name}
                    onChangeText={this.handleNameChange}
                    resetValue={this.resetFieldName}
                    imageIcon="profile"
                    selectTextOnFocus={false}
                    width="95%"
                    style={10}
                    editable={false}

                  />
                  <FloatingLabelTextInput
                    label="Email"
                    value={this.state.email}
                    onChangeText={this.handleEmailChange}
                    resetValue={this.resetFieldEmail}
                    imageIcon="email"
                    keyboardType="numeric"
                    editable={false}
                    width="95%"
                    style={10}
                  />
                  <FloatingLabelTextInput
                    label="Mobile No."
                    value={this.state.mobileNo}
                    onChangeText={this.handleMobileNoChange}
                    resetValue={this.resetFieldMobileNo}
                    imageIcon="Mobile"
                    keyboardType="numeric"
                    editable={false}
                    width="95%"
                    style={10}
                  />
                  <FloatingLabelTextInput
                    label="Designation"
                    value={this.state.designation}
                    onChangeText={this.handleDesignationChange}
                    resetValue={this.resetFieldDesignation}
                    imageIcon="profile"
                    selectTextOnFocus={false}
                    width="95%"
                    style={10}
                    onSubmitEditing={() => this.companyNameRef.current.focus()}

                  />

                  <FloatingLabelTextInput
                    label="Company Name"
                    value={this.state.companyName}
                    onChangeText={this.handleCompanyNameChange}
                    resetValue={this.resetFieldCompanyName}
                    imageIcon="profile"
                    selectTextOnFocus={false}
                    width="95%"
                    style={10}
                    textInputRef={this.companyNameRef}
                    onSubmitEditing={() => this.gstRef.current.focus()}
                  />
                  <FloatingLabelTextInput
                    label="GST No"
                    value={this.state.gstNo}
                    onChangeText={this.handleGSTNoChange}
                    resetValue={this.resetFieldGSTNo}
                    imageIcon="profile"
                    selectTextOnFocus={false}
                    width="95%"
                    style={10}
                    textInputRef={this.gstRef}
                    onSubmitEditing={() => this.pinCodeRef.current.focus()}
                  />
                  <FloatingLabelTextInput
                    label="Pincode"
                    value={this.state.pinCode}
                    onChangeText={this.handlePinCodeChange}
                    resetValue={this.resetFieldPinCode}
                    imageIcon="Mobile"
                    keyboardType="numeric"
                    width="95%"
                    style={10}
                    textInputRef={this.pinCodeRef}
                  />
                  <DatePickerComponent
                    dateLabel="DOB (optional)"
                    setDOB={(d) => this.setDOB(d)}
                    dob={this.state.dobSelected}
                  />
                  <DatePickerComponent1
                    dateLabel="Aniversary Date(optional)"
                    setAnniversaryDate={(d) => this.setAnniversaryDate(d)}
                    anniversaryDate={this.state.anniversaryDate}

                  />
                </View>

                {/* COUNTRY DD */}
                <TouchableOpacity onPress={() => this.toggleCountryModal()}>
                  <View
                    style={{
                      marginHorizontal: 20,
                      marginTop: hp(4),
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{ fontSize: 16, color: '#000000' }}>{selectedCountry}</Text>
                    <Image
                      source={require('../../../assets/image/DownArrow.png')}
                      style={{
                        width: wp(2.5),
                        height: hp(1.5),
                        resizeMode: 'cover',
                      }}
                    />
                  </View>
                </TouchableOpacity>

                {/* STATE DD */}
                <TouchableOpacity onPress={() => this.toggleStateModal()}>
                  <View
                    style={{
                      marginHorizontal: 20,
                      marginTop: hp(4),
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{ fontSize: 16, color: '#000000' }}>{selectedState}</Text>
                    <Image
                      source={require('../../../assets/image/DownArrow.png')}
                      style={{
                        width: wp(2.5),
                        height: hp(1.5),
                        resizeMode: 'cover',
                      }}
                    />
                  </View>
                </TouchableOpacity>

                {/* CITY DD */}
                <TouchableOpacity onPress={() => this.toggleCityModal()}>
                  <View
                    style={{
                      marginHorizontal: 20,
                      marginTop: hp(4),
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{ fontSize: 16, color: '#000000' }}>{selectedCity}</Text>
                    <Image
                      source={require('../../../assets/image/DownArrow.png')}
                      style={{
                        width: wp(2.5),
                        height: hp(1.5),
                        resizeMode: 'cover',
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                  <ActionButtonRounded
                    title="UPDATE PROFILE"
                    onButonPress={() => this.updateProfile()}
                    containerStyle={styles.buttonStyle}
                  />
                </View>
              </ScrollView>
            </View>
          </View>

          {/* country modal */}
          <Modal
            isVisible={this.state.isCountryModalVisible}
            transparent={true}
            onRequestClose={() => this.setState({ isCountryModalVisible: false })}
            style={{}}>
            <View style={{ backgroundColor: '#ffffff', paddingHorizontal: 20, marginVertical: hp(11) }}>
              <TouchableWithoutFeedback
                style={{ flex: 1 }}
                onPress={() => this.setState({ isCountryModalVisible: false, })}>
                <>
                  <View>
                    <Text style={{ fontSize: 20, color: '#000000', marginTop: 15, textAlign: 'center' }}>
                      Select Country
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: hp(2.5), backgroundColor: '', marginBottom: 5,
                        height: hp(5), marginHorizontal: 10,
                      }}>

                      <TextInput
                        style={{ height: 45 }}
                        onChangeText={() => null}
                        placeholder="search country"

                        style={{
                          borderBottomWidth: 1.0,
                          borderColor: '#d7d7d7',
                          color: 'gray',
                          width: '95%',
                        }}
                      />

                      <View
                        style={{
                          alignItems: 'center', justifyContent: 'center',
                        }}>
                        <Image
                          source={require('../../../assets/image/Cross.png')}
                          style={{
                            width: 20,
                            height: 20, resizeMode: 'cover', marginRight: 15,
                          }}
                        />
                      </View>
                    </View>
                  </View>

                  {this.state.countryData && this.state.countryData.length > 0 &&
                    <FlatList
                      data={countryData}
                      keyExtractor={item => item.id}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity 
                        onPress={()=>this.setSelecedCountry(item.id)}>
                          <View
                            style={{
                              marginVertical: hp(1), borderBottomWidth: 0.9,
                              borderBottomColor: '#d7d7d7', height: hp(5),
                            }}>
                            <Text
                              style={{
                                fontSize: 16, color: '#000000', paddingLeft: 10,
                              }}>
                              {item.name}
                            </Text>
                          </View>
                        </TouchableOpacity>

                      )}
                    />
                  }
                  <View
                    style={{
                      alignItems: 'flex-end',
                      marginHorizontal: 20,
                      height: hp(8),
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => this.setState({ isCountryModalVisible: false })}>
                      <Text
                        style={{ fontSize: 14, color: '#000000', }}>
                        Close
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              </TouchableWithoutFeedback>
            </View>
          </Modal>


          {/* state modal */}
          <Modal
            isVisible={this.state.isStateModalVisible}
            transparent={true}
            onRequestClose={() => this.setState({ isStateModalVisible: false })}
            style={{}}>
            <View style={{ backgroundColor: '#ffffff', paddingHorizontal: 20, marginVertical: hp(11) }}>
              <TouchableWithoutFeedback
                style={{ flex: 1 }}
                onPress={() => this.setState({ isStateModalVisible: false, })}>
                <>
                  <View>
                    <Text style={{ fontSize: 20, color: '#000000', marginTop: 15, textAlign: 'center' }}>
                      Select State
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: hp(2.5), backgroundColor: '', marginBottom: 5,
                        height: hp(5), marginHorizontal: 10,
                      }}>

                      <TextInput
                        style={{ height: 45 }}
                        onChangeText={() => null}
                        placeholder="search state"
                        style={{
                          borderBottomWidth: 1.0,
                          borderColor: '#d7d7d7',
                          color: 'gray',
                          width: '95%',
                        }}
                      />

                      <View
                        style={{
                          alignItems: 'center', justifyContent: 'center',
                        }}>
                        <Image
                          source={require('../../../assets/image/Cross.png')}
                          style={{
                            width: 20,
                            height: 20, resizeMode: 'cover', marginRight: 15,
                          }}
                        />
                      </View>
                    </View>
                  </View>

                  {this.state.stateData && this.state.stateData.length > 0 &&
                    <FlatList
                      data={this.state.stateData && this.state.stateData}
                      keyExtractor={item => item.id}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => this.setSelecedState(item.id)}>
                          <View
                            style={{
                              marginVertical: hp(1), borderBottomWidth: 0.9,
                              borderBottomColor: '#d7d7d7', height: hp(5),
                            }}>
                            <Text
                              style={{
                                fontSize: 16, color: '#000000', paddingLeft: 10,
                              }}>
                              {item.name}
                            </Text>
                          </View>
                        </TouchableOpacity>

                      )}
                    />
                  }


                  <View
                    style={{
                      alignItems: 'flex-end',
                      marginHorizontal: 20,
                      height: hp(8),
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => this.setState({ isStateModalVisible: false })}>
                      <Text
                        style={{ fontSize: 14, color: '#000000', }}>
                        Close
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              </TouchableWithoutFeedback>
            </View>
          </Modal> 

          {/* city modal */}
           <Modal
            isVisible={this.state.isCityModalVisible}
            transparent={true}
            onRequestClose={() => this.setState({ isCityModalVisible: false })}
            style={{}}>
            <View style={{ backgroundColor: '#ffffff', paddingHorizontal: 20, marginVertical: hp(11) }}>
              <TouchableWithoutFeedback
                style={{ flex: 1 }}
                onPress={() => this.setState({ isCityModalVisible: false, })}>
                <>
                  <View>
                    <Text style={{ fontSize: 20, color: '#000000', marginTop: 15, textAlign: 'center' }}>
                      Select City
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: hp(2.5), backgroundColor: '', marginBottom: 5,
                        height: hp(5), marginHorizontal: 10,
                      }}>

                      <TextInput
                        style={{ height: 45 }}
                        onChangeText={() => null}
                        placeholder="search city"

                        style={{
                          borderBottomWidth: 1.0,
                          borderColor: '#d7d7d7',
                          color: 'gray',
                          width: '95%',
                        }}
                      />

                      <View
                        style={{
                          alignItems: 'center', justifyContent: 'center',
                        }}>
                        <Image
                          source={require('../../../assets/image/Cross.png')}
                          style={{
                            width: 20,
                            height: 20, resizeMode: 'cover', marginRight: 15,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  
                  {this.state.cityData && this.state.cityData.length > 0 &&
                  <FlatList
                    data={this.state.cityData && this.state.cityData}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity onPress={() => this.setSelecedCity(item.id)}>
                      <View
                        style={{
                          marginVertical: hp(1), borderBottomWidth: 0.9,
                          borderBottomColor: '#d7d7d7', height: hp(5),
                        }}>
                        <Text
                          style={{
                            fontSize: 16, color: '#000000', paddingLeft: 10,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    )}
                    />
                  }

                  <View
                    style={{
                      alignItems: 'flex-end',
                      marginHorizontal: 20,
                      height: hp(8),
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => this.setState({ isCityModalVisible: false })}>
                      <Text
                        style={{ fontSize: 14, color: '#000000', }}>
                        Close
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              </TouchableWithoutFeedback>
            </View>
          </Modal> 

        </>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonStyle: {
    marginTop: hp(5),
    marginBottom: hp(1),
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',

  },
});


function mapStateToProps(state) {
  return {
    isFetching: state.editProfileReducer.isFetching,
    error: state.editProfileReducer.error,
    errorMsg: state.editProfileReducer.errorMsg,
    successGetProfileVersion: state.editProfileReducer.successGetProfileVersion,
    errorGetProfileVersion: state.editProfileReducer.errorGetProfileVersion,
    getProfileData: state.editProfileReducer.getProfileData,

    allParameterData: state.homePageReducer.allParameterData,
    successAllParameterVersion: state.homePageReducer.successAllParameterVersion,
    errorAllParamaterVersion: state.homePageReducer.errorAllParamaterVersion,

    successGetStateListVersion: state.editProfileReducer.successGetStateListVersion,
    errorGetStateListVersion: state.editProfileReducer.errorGetStateListVersion,
    stateList: state.editProfileReducer.stateList,

    
    successGetCityListVersion: state.editProfileReducer.successGetCityListVersion,
    errorGetCityListVersion: state.editProfileReducer.errorGetCityListVersion,
    cityList: state.editProfileReducer.cityList,

    successUpdateProfileVersion: state.editProfileReducer.successUpdateProfileVersion,
    errorUpdateProfileVersion: state.editProfileReducer.errorUpdateProfileVersion,
    updateProfileData: state.editProfileReducer.updateProfileData,



  };
}

export default connect(mapStateToProps, { getProfile, allParameters,getStateList,
   getCityList, updateUserProfile })(EditProfile);



///--------------------------------ActionButton------------------
const ActionButtonRounded = ({ title, onButonPress, containerStyle }) => {
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
    height: 44,
    width: width - 170,
    justifyContent: 'center',
    borderRadius: 40,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: '#fbcb84',
    fontSize: 14,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '400',
  },
});


