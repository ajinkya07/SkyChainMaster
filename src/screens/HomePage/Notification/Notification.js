import React, { Component } from 'react';
import {
    View, Text, SafeAreaView, Image,
    ScrollView, FlatList, TouchableOpacity
} from 'react-native';
import _CustomHeader from '@customHeader/_CustomHeader'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import { connect } from 'react-redux';
import { color } from '@values/colors';
import IconPack from '../../OnBoarding/Login/IconPack';


const data = [
    { id: '1', title: "Your first notification", msg: 'Diwali', orderID: 50, date: '2020-07-08', image: require('../../../assets/image/insta.png') },
    { id: '2', title: "Your first notification", msg: 'Diwali', orderID: 50, date: '2020-07-08', image: require('../../../assets/image/insta.png') },
    { id: '3', title: "Your first notification", msg: 'Diwali', orderID: 50, date: '2020-07-08', image: require('../../../assets/image/insta.png') },
    { id: '4', title: "Your first notification", msg: 'Diwali', orderID: 50, date: '2020-07-08', image: require('../../../assets/image/insta.png') },


]

export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    showNotifications = (item, index) => {

        return (
            <TouchableOpacity onPress={() => alert("okok")}>
                <View style={{ paddingTop: hp(0.5), paddingBottom: hp(0.5) }}>
                    <View style={{ flexDirection: 'row', flex: 1, marginLeft: hp(1.5), marginRight: hp(0.5) }}>
                        <View style={{ flex: 0.25, justifyContent: 'flex-start', }}>
                            <Image
                                style={{
                                    height: hp(10), width: hp(10), borderRadius: 10,
                                    borderWidth: 0.4, borderColor: color.gray
                                }}
                                source={item.image}
//                                defaultSource={require('../../../assets/image/default.png')}
                                defaultSource={IconPack.APP_LOGO}

                            />
                        </View>

                        <View style={{ alignContent: 'center', justifyContent: 'center', flex: 0.75 }}>
                            <_Text numberOfLines={2} fwPrimary
                                fsMedium style={{ marginRight: hp(3) }}>
                                Title: {item.title}
                            </_Text>
                            <_Text numberOfLines={2} fsPrimary
                                style={{ marginRight: hp(3) }}>
                                Message: {item.msg}
                            </_Text>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <_Text numberOfLines={2} note
                                    style={{ marginRight: hp(3) }}>
                                    Order id: {item.orderID}
                                </_Text>
                                <_Text numberOfLines={2} note
                                    style={{ marginRight: hp(3) }}>
                                    Date:{item.date}
                                </_Text>

                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            paddingTop: hp(0.8), marginLeft: wp(22), marginRight: wp(3),
                            alignSelf: 'stretch',
                            borderBottomColor: '#D3D3D3',
                            borderBottomWidth: 1,
                        }}
                    />
                </View>
            </TouchableOpacity>
        )
    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
                <_CustomHeader
                    Title={'Notifications'}
                    RightBtnIcon2={require('../../../assets/image/BlueIcons/Search.png')}
                    LeftBtnPress={() => this.props.navigation.goBack()}
                    RightBtnPressTwo={() => this.props.navigation.navigate('SearchScreen')}
                    rightIconHeight2={hp(3.5)}
                    backgroundColor="#19af81"
                />
                <View style={{ justifyContent: 'center', width: wp(100), paddingVertical: hp(1) }}>
                    <FlatList
                        onRefresh={() => alert('inProgress')}
                        refreshing={false}
                        data={data}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => (
                            this.showNotifications(item, index)
                        )}
                    />
                </View>
            </SafeAreaView>
        );
    }
}
