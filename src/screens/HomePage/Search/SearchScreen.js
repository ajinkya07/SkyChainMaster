import React, { Component } from 'react';
import {
    Text, View,
    StyleSheet, Button,
    TouchableWithoutFeedback,
    TextInput, ScrollView,
    TouchableOpacity, Alert,
    Image, Platform, SafeAreaView,
    Dimensions, FlatList,
} from 'react-native';
import {
    DatePicker, Footer
} from "native-base";

import _CustomHeader from '@customHeader/_CustomHeader'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import { connect } from 'react-redux';
import { color } from '@values/colors';
import Modal from 'react-native-modal';
import IconPack from '@login/IconPack';
import CheckBox from '@react-native-community/checkbox';
const { width } = Dimensions.get('window');



export default class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gwFrom: '',
            gwTo: '',
            nwFrom: '',
            nwTo: '',
            fromDate: new Date(),
            toDate: new Date(),
            isModalVisible: false,
            check: {},

        };
    }

    toggleModal = () => {
        this.setState({ isModalVisible: true });
    };
    closeModal = () => {
        this.setState({ isModalVisible: false });
    };

    checkBox_Test = id => {
        const checkCopy = { ...this.state.check };
        if (checkCopy[id]) checkCopy[id] = false;
        else checkCopy[id] = true;
        this.setState({ check: checkCopy });
    };


    setToDate(newDate) {
        this.setState({ toDate: newDate });
    }

    setFromDate(newDate) {
        this.setState({ fromDate: newDate });
    }


    onTextChanged = (inputKey, value) => {
        this.setState({
            [inputKey]: value,
        });
    }


    grossWeight = () => {
        const { gwFrom, gwTo, nwFrom, nwTo } = this.state

        return (
            <View style={{ marginHorizontal: wp(3) }}>
                <_Text fsHeading>Gross Weight</_Text>
                <View style={{ marginTop: hp(1), flexDirection: 'row', width: wp(100), justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', width: wp(40) }}>
                        <TextInput
                            style={styles.textInputStyle}
                            onChangeText={(gwFrom) => this.onTextChanged('gwFrom', gwFrom)}
                            value={gwFrom}
                            placeholder="From"
                            maxLength={10}
                            placeholderTextColor="gray"
                            keyboardType={'numeric'}
                        />
                    </View>
                    <_Text fsMedium style={{ marginTop: hp(2) }}>AND   </_Text>

                    <View style={{ flexDirection: 'row', width: wp(40) }}>
                        <TextInput
                            style={styles.textInputStyle}
                            onChangeText={(gwTo) => this.onTextChanged('gwTo', gwTo)}
                            value={gwTo}
                            maxLength={10}
                            placeholder="To"
                            placeholderTextColor="gray"
                            keyboardType={'numeric'}
                        />
                    </View>
                </View>
            </View>
        )
    }

    netWeight = () => {
        const { gwFrom, gwTo, nwFrom, nwTo } = this.state
        return (
            <View style={{ marginHorizontal: wp(3) }}>
                <_Text fsHeading>Net Weight</_Text>
                <View style={{ marginTop: hp(1), flexDirection: 'row', width: wp(100), justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', width: wp(40) }}>
                        <TextInput
                            style={styles.textInputStyle}
                            onChangeText={(nwFrom) => this.onTextChanged('nwFrom', nwFrom)}
                            value={nwFrom}
                            maxLength={10}
                            placeholder="From"
                            placeholderTextColor="gray"
                            keyboardType={'numeric'}
                        />
                    </View>
                    <_Text fsMedium style={{ marginTop: hp(2) }}>AND   </_Text>

                    <View style={{ flexDirection: 'row', width: wp(40) }}>
                        <TextInput
                            style={styles.textInputStyle}
                            onChangeText={(nwTo) => this.onTextChanged('nwTo', nwTo)}
                            value={nwTo}
                            maxLength={10}
                            placeholder="To"
                            placeholderTextColor="gray"
                            keyboardType={'numeric'}
                        />
                    </View>
                </View>
            </View>
        )
    }

    productReleaseDate = () => {
        return (
            <View style={{ marginHorizontal: wp(3) }}>
                <_Text fsHeading>Product Release Between:</_Text>
                <View style={{ marginTop: hp(0.5), flexDirection: 'row', width: wp(100), justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', width: wp(40) }}>
                        <DatePicker
                            defaultDate={new Date()}
                            // minimumDate={new Date(2018, 1, 1)}
                            //maximumDate={new Date(2018, 12, 31)}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="From Date"
                            textStyle={{ marginTop: hp(0.5), fontSize: 20 }}
                            placeHolderTextStyle={{ color: "gray", fontSize: 20 }}
                            onDateChange={() => this.setFromDate()}
                        />

                    </View>
                    <_Text fsMedium style={{ marginTop: hp(1.5) }}>AND   </_Text>

                    <View style={{ flexDirection: 'row', width: wp(40) }}>
                        <DatePicker
                            defaultDate={new Date()}
                            // minimumDate={new Date(2018, 1, 1)}
                            //maximumDate={new Date(2018, 12, 31)}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="To Date"
                            textStyle={{ marginTop: hp(0.5), fontSize: 20 }}
                            placeHolderTextStyle={{ color: "gray", fontSize: 20 }}
                            onDateChange={() => this.setToDate()}
                        />
                    </View>
                </View>
            </View>
        )
    }


    selectKarat = () => {
        return (
            <View style={{ marginHorizontal: wp(3) }}>
                <_Text fsHeading>Karat:</_Text>
                <TouchableOpacity onPress={null}>
                    <View style={{
                        marginTop: hp(1), flexDirection: 'row',
                        justifyContent: 'space-between', width: wp(90),
                    }}>
                        <_Text fsHeading textColor={'gray'} style={{ marginLeft: wp(3) }}>Select Karat:</_Text>
                        <Image
                            style={{ height: hp(2.5), width: hp(2.5), marginTop: hp(0.5) }}
                            source={require('../../../assets/image/DownArrow.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    selectCategories = () => {
        return (
            <View style={{ marginHorizontal: wp(3), }}>
                <_Text fsHeading>Select Categories:</_Text>

                <View style={{ marginHorizontal: wp(3), justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.toggleModal()}>
                        <View style={styles.roundedButton}>
                            <View style={styles.buttonText}>
                                <_Text fsHeading bold>SELECT CATEGORIES</_Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }

    searchButton = () => {
        return (
            <View style={{ marginBottom: hp(4), marginHorizontal: wp(3), justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={null}>
                    <View style={styles.roundedButtonSearch}>
                        <View style={styles.buttonText}>
                            <_Text fsHeading bold textColor={'#fbcb84'}>SEARCH</_Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
                <_CustomHeader
                    Title={'Search'}
                    RightBtnIcon2={require('../../../assets/image/BlueIcons/Notification.png')}
                    LeftBtnPress={() => this.props.navigation.goBack()}
                    RightBtnPressTwo={() => this.props.navigation.navigate('Notification')}
                    rightIconHeight2={hp(3.5)}
                />
                <ScrollView>

                    <View style={{ paddingVertical: hp(1.5), justifyContent: 'center', alignItems: 'center' }}>
                        <_Text fsHeading>Code Search:</_Text>
                        <TouchableOpacity>
                            <View style={styles.roundedButton}>
                                <View style={styles.buttonText}>
                                    <_Text fsHeading bold>SEARCH BY CODE</_Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.border} />

                    <_Text fsHeading style={{ textAlign: 'center', marginTop: hp(1.5) }}>Advanced Search:</_Text>

                    <View style={{ paddingVertical: hp(1.5), }}>
                        {this.grossWeight()}
                    </View>
                    <View style={{ paddingVertical: hp(1.5), }}>
                        {this.netWeight()}
                    </View>

                    <View style={{ paddingVertical: hp(1.5), }}>
                        {this.productReleaseDate()}
                    </View>

                    <View style={{ paddingVertical: hp(0.5), }}>
                        {this.selectKarat()}
                    </View>

                    <View style={{ paddingVertical: 0, }}>
                        {this.selectCategories()}
                    </View>
                     
                    <View style={{ paddingVertical: hp(0.5), }}>
                        {this.searchButton()}
                    </View> 

                </ScrollView>

                <Modal
                    isVisible={this.state.isModalVisible}
                    transparent={true}
                    onRequestClose={() => this.closeModal()}
                    style={{ margin: 28 }}>
                    <TouchableWithoutFeedback
                        style={{ flex: 1 }}
                        onPress={() =>
                            this.setState({
                                isModalVisible: false,
                            })
                        }>
                        <>
                            <View style={styles.flex}>
                                <View style={styles.selectCategoriesContainer}>
                                    <Text style={styles.selectCategoryText}>
                                        Select Categories
                                  </Text>
                                </View>

                                <FlatList
                                    style={{ backgroundColor: '#ffffff' }}
                                    showsVerticalScrollIndicator={false}
                                    data={[
                                        { id: 1, categoryTitle: 'Choco Chains' },
                                        { id: 2, categoryTitle: 'Mens Italian Chains' },
                                        { id: 3, categoryTitle: 'IMP ASSEMBLE' },
                                        { id: 4, categoryTitle: 'IMP FANCY CHAINS' },
                                        { id: 5, categoryTitle: 'IMP HALF SETS' },
                                        { id: 6, categoryTitle: 'IMP LONG MALA' },
                                        { id: 7, categoryTitle: 'Mens bracelet' },
                                        { id: 8, categoryTitle: 'Assemble Dokiya Chains' },
                                    ]}
                                    renderItem={({ item }) => (
                                        <View style={styles.categoryContainer}>
                                            <Text style={styles.categoryText}>
                                                {item.categoryTitle}
                                            </Text>
                                            <CheckBox
                                                style={styles.checkBox}
                                                tintColors={{ true: '#11255a', false: 'gray' }}
                                                value={this.state.check[item.id]}
                                                onChange={() => this.checkBox_Test(item.id)}
                                                boxType="square"
                                                onFillColor="#11255a"
                                                onTintColor="gray"
                                                onCheckColor="#ffffff"
                                            />
                                        </View>
                                    )}
                                />
                                <View style={styles.buttonContainer}>
                                    <ActionButtonRounded
                                        title="CONTINUE"
                                        onButonPress={() => Alert.alert('Continue')}
                                        containerStyle={styles.buttonStyle}
                                    />
                                </View>
                            </View>
                            <View style={styles.closeIconView}>
                                <TouchableOpacity
                                    onPress={() =>
                                        this.setState({
                                            isModalVisible: false,
                                        })
                                    }>
                                    <Image style={styles.closeIcon} source={IconPack.CLOSE} />
                                </TouchableOpacity>
                            </View>
                        </>
                    </TouchableWithoutFeedback>
                </Modal>


            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    border: {
        borderColor: '#DDDDDD',
        borderBottomWidth: 0.8,
        marginTop: hp(1)
    },
    textInputStyle: {
        height: 45,
        width: wp(35),
        borderColor: 'gray',
        borderBottomWidth: 1,
        fontSize: 20
    },
    roundedButton: {
        marginTop: hp(1.5),
        backgroundColor: 'white', height: 50, alignItems: 'center',
        width: wp(85), justifyContent: 'center', borderRadius: 40,
        borderColor: '#fbcb84', borderWidth: 2,
    },
    roundedButtonSearch: {
        marginTop: hp(1.5),
        backgroundColor: '#11255a', height: 50, alignItems: 'center',
        width: wp(85), justifyContent: 'center', borderRadius: 40,
    },
    buttonText: {
        width: wp(100), height: hp(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {},
    closeIcon: {
        width: 20,
        height: 20,
    },
    flex: {
        flex: 1,
    },
    selectCategoriesContainer: {
        height: 50,
        backgroundColor: '#11255a',
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectCategoryText: {
        fontSize: 21,
        fontFamily: 'Helvetica',
        color: '#fbcb84',
    },
    scrollView: {
        backgroundColor: '#ffffff',
    },
    buttonContainer: {
        justifyContent: 'flex-end',
        height: 54,
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeIconView: {
        position: 'absolute',
        top: 14,
        right: 10,
        bottom: 0,
    },
    categoryContainer: {
        backgroundColor: '#D3D3D3',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        marginTop: 2,
        marginBottom: 2,
    },
    categoryText: {
        marginLeft: 32,
        fontFamily: 'Helvetica',
        fontSize: 16,
    },
    checkBox: {
        marginRight: 12,
    },
});

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
        color: '#fbcb84',
        fontSize: 14,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '400',
    },
});
