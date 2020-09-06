import React, {Component} from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';
import Theme from '../../../values/Theme';
import IconPack from '../../OnBoarding/Login/IconPack';
import FloatingLabelTextInput from '@floatingInputBox/FloatingLabelTextInput';
const {width} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default class SearchModal extends Component {
  state = {
    isModalVisible: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  handleSearchChange = newText =>
    this.setState({
      searchText: newText,
    });

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.flex}>
          <Button title="Show modal" onPress={this.toggleModal} />
          <Modal isVisible={this.state.isModalVisible} style={{margin: 30}}>
            <View style={styles.container}>
              <View style={styles.topContainer}>
                <Text style={styles.title}>Search By Code</Text>
              </View>
              <View style={styles.bottomConatiner}>
                <View style={styles.flexRow}>
                  <View style={styles.searchImgView}>
                    <Image
                      style={{height: hp(3.2), width: hp(3.2)}}
                      source={IconPack.SEARCH_WHITE}
                    />
                  </View>

                  <View style={{marginRight: 15, flex: 1}}>
                    <FloatingLabelTextInput
                      label="Search"
                      value={this.state.searchText}
                      onChangeText={this.handleSearchChange}
                      resetValue=""
                      width="100%"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <ActionButtonRounded
                  title="CONTINUE"
                  onButonPress={() => null}
                  containerStyle={styles.buttonStyle}
                />
              </View>

              <TouchableOpacity style={styles.imageView}>
                <Image
                  source={IconPack.WHITE_CLOSE}
                  style={styles.imageStyle}
                />
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    borderRadius: 15,
  },
  topContainer: {
    flex: 1,
    backgroundColor: '#19af81',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomConatiner: {
    flex: 3,
    backgroundColor: '#FFFFFF',
    width: '100%',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    color: '#FFFFFF',
    ...Theme.ffLatoRegular20,
  },
  imageStyle: {
    width: hp(2.5),
    height: hp(2.5),
    resizeMode: 'contain',
  },
  imageView: {
    position: 'absolute',
    top: 16,
    right: 14,
  },
  buttonStyle: {
    marginTop: 20,
    marginBottom: 10,
  },
  flexRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  searchImgView: {
    marginHorizontal: 10,
    marginTop: 8,
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
    backgroundColor: '#19af81',
    height: 44,
    width: width - 255,
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
    color: '#FFFFFF',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    ...Theme.ffLatoBold14,
    letterSpacing: 0.7,
  },
});
