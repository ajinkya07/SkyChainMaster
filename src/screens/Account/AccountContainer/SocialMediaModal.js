import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import IconPack from '../../OnBoarding/Login/IconPack';
const {width} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Theme from '../../../values/Theme';

const RowData = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={{marginBottom: 14}}>
        <Text style={styles.subTitleStyle}>{title}</Text>
        <View style={styles.borderStyle} />
      </View>
    </TouchableOpacity>
  );
};

export default class SocialMediaModal extends Component {
  state = {
    isModalVisible: false,
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  render() {
    return (
      <>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Button title="Show modal" onPress={this.toggleModal} />
        </View>
        <Modal
          isVisible={this.state.isModalVisible}
          transparent={true}
          onRequestClose={() => alert('Close')}
          style={{margin: 0}}>
          <TouchableWithoutFeedback style={styles.flex} onPress={() => null}>
            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Social Media</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      isModalVisible: false,
                    })
                  }>
                  <Image style={styles.closeIcon} source={IconPack.CLOSE} />
                </TouchableOpacity>
              </View>

              <View style={styles.spaceHorizontal}>
                <RowData title="Facebook" onPress={() => alert('FaceBook')} />
                <RowData title="Instagram" onPress={() => alert('Instagram')} />
              </View>
              <View style={styles.buttonContainer}>
                <ActionButtonRounded
                  title="CANCEL"
                  onButonPress={() =>
                    this.setState({
                      isModalVisible: false,
                    })
                  }
                  containerStyle={styles.buttonStyle}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </>
    );
  }
}
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    height: 60,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    alignItems: 'center',
  },
  closeIcon: {
    width: wp(4),
    height: hp(3.2),
    resizeMode: 'cover',
    marginTop: 10,
    marginRight: 20,
  },
  buttonStyle: {
    marginBottom: 10,
  },
  titleText: {
    ...Theme.ffLatoMedium18,
    color: '#000000',
    marginLeft: 10,
    marginTop: Platform.OS === 'android' ? 8 : 12,
  },
  borderStyle: {
    borderBottomColor: '#d2d2d2',
    borderBottomWidth: 1,
  },
  subTitleStyle: {
    ...Theme.ffLatoRegular16,
    color: '#757575',
    marginVertical: 5,
  },
  container: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 14,
  },
  spaceHorizontal: {
    marginHorizontal: 18,
    marginTop: 15,
  },
});
///--------------------------------ActionButton------------------
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
    height: 44,
    width: width - 250,
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
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '400',
  },
});
