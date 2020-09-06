import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import CheckBox from '@react-native-community/checkbox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Theme from '../../../values/Theme';


export default class SelectKaratModal extends Component {
  state = {
    isModalVisible: false,
    search: '',
    toggleCheckBox: true,
  };
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  filterList(list) {
    return list.filter(listItem =>
      listItem.toLowerCase().includes(this.state.search.toLowerCase()),
    );
  }
  setToggleCheckBox = val => {
    this.setState({
      toggleCheckBox: val,
    });
  };
  
  render() {
    const list = ['22k', '18k'];
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
                <Text style={styles.titleText}>Select Karat</Text>
              </View>
              <TextInput
                onChangeText={search => this.setState({search})}
                style={styles.searchBar}
                placeholder="Find Karat"
                placeholderTextColor="#757575"
              />
              {this.filterList(list).length !== 0 ? (
                this.filterList(list).map((listItem, index) => (
                  <View style={styles.dataContainer}>
                    <Text key={index} style={styles.itemText}>
                      {listItem}
                    </Text>

                    <View style={{marginRight: 10}}>
                      <CheckBox
                        disabled={false}
                        value={this.state.toggleCheckBox}
                        onValueChange={newValue =>
                          this.setToggleCheckBox(newValue)
                        }
                        onFillColor="#FFFFFF"
                      />
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.noContainView}>
                  <Text style={styles.noFoundText}>Not Data found!</Text>
                </View>
              )}
              <View style={styles.bottomView}>
                <TouchableOpacity onPress={() => alert('SelectAll')}>
                  <Text style={styles.bottomTxt}>SELECT ALL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert('Ok')}>
                  <Text style={styles.bottomTxt} onPress={() => alert('Ok')}>
                    OK
                  </Text>
                </TouchableOpacity>
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
    marginLeft: 10,
  },
  titleText: {
    ...Theme.ffLatoBold20,
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
  },
  spaceHorizontal: {
    marginHorizontal: 18,
    marginTop: 15,
  },
  searchBar: {
    ...Theme.ffLatoRegular14,
    margin: 10,
    height: 38,
    backgroundColor: 'white',
    borderColor: '#d2d2d2',
    borderWidth: 1,
    marginLeft: 5,
  },
  itemText: {
    margin: 1,
    color: '#FFFFFF',
    ...Theme.ffLatoBold15,
    //backgroundColor: '#657fd6',
    height: 45,
    padding: 12,
  },
  bottomView: {
    height: 45,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  bottomTxt: {
    ...Theme.ffLatoRegular13,
    color: '#000000',
  },
  dataContainer: {
    marginHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#657fd6',
    borderBottomColor: '#d2d2d2',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  noContainView: {
    height: 35,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noFoundText: {
    ...Theme.ffLatoRegular18,
    color: 'red',
    letterSpacing: 0.7,
  },
});
