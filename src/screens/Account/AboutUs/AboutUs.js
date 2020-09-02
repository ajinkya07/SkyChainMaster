import React from 'react';
import {
    View, Text,
    ScrollView, StyleSheet,
    TouchableOpacity, Image,
    SafeAreaView,
} from 'react-native';
import {
    Body, Container,
    Content, Header,
    Left, Right,
    Toast,
} from 'native-base';
import _CustomHeader from '@customHeader/_CustomHeader'

export default class AboutUs extends React.Component {
    render() {
        return (
            <Container style={styles.flex}>
                <_CustomHeader
                    Title='About Us'
                    LeftBtnPress={() => this.props.navigation.goBack()}
                />
                <Content>
                    <SafeAreaView style={styles.viewContainer}>
                        <Text style={styles.HeadingText}>SAR</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>
                            A Royal Chains Brand Leading Jewellery Manufacturer
                         </Text>
                        <Text
                            style={{
                                marginTop: 21,
                                fontWeight: '700',
                                marginBottom: 18,
                                fontSize: 18,
                            }}>
                            Company Overview
          </Text>
                        <View>
                            <Text style={{ fontSize: 18, color: '#808080', marginBottom: 12 }}>
                                SAR is the root & essence ofRoyal Group, Established in 1987, it
                                started its business as a traditional gold chain producer,since
                                years it has evolved with the touch of modern technology &
                                experienced a total reformation in product
                                variety,technology,management & marketing structure.
            </Text>
                            <Text style={{ fontSize: 18, color: '#808080', marginBottom: 12 }}>
                                SAR is the root & essence ofRoyal Group, Established in 1987, it
                                started its business as a traditional gold chain producer,since
                                years it has evolved with the touch of modern technology &
                                experienced a total reformation in product
                                variety,technology,management & marketing structure.
            </Text>
                            <Text style={{ fontSize: 18, color: '#808080', marginBottom: 12 }}>
                                SAR is the root & essence ofRoyal Group, Established in 1987, it
                                started its business as a traditional gold chain producer,since
                                years it has evolved with the touch of modern technology &
                                experienced a total reformation in product
                                variety,technology,management & marketing structure.
            </Text>
                            <Text style={{ fontSize: 18, color: '#808080', marginBottom: 12 }}>
                                SAR is the root & essence ofRoyal Group, Established in 1987, it
                                started its business as a traditional gold chain producer,since
                                years it has evolved with the touch of modern technology &
                                experienced a total reformation in product
                                variety,technology,management & marketing structure.
            </Text>
                            <Text style={{ fontSize: 18, color: '#808080', marginBottom: 12 }}>
                                SAR is the root & essence ofRoyal Group, Established in 1987, it
                                started its business as a traditional gold chain producer,since
                                years it has evolved with the touch of modern technology &
                                experienced a total reformation in product
                                variety,technology,management & marketing structure.
            </Text>
                            <Text style={{ fontSize: 18, color: '#808080', marginBottom: 12 }}>
                                SAR is the root & essence ofRoyal Group, Established in 1987, it
                                started its business as a traditional gold chain producer,since
                                years it has evolved with the touch of modern technology &
                                experienced a total reformation in product
                                variety,technology,management & marketing structure.
            </Text>
                            <Text style={{ color: '#808080', marginBottom: 12 }}>
                                SAR is the root & essence ofRoyal Group, Established in 1987, it
                                started its business as a traditional gold chain producer,since
                                years it has evolved with the touch of modern technology &
                                experienced a total reformation in product
                                variety,technology,management & marketing structure.
            </Text>
                            <Text style={{ color: '#808080', marginBottom: 12 }}>
                                SAR is the root & essence ofRoyal Group, Established in 1987, it
                                started its business as a traditional gold chain producer,since
                                years it has evolved with the touch of modern technology &
                                experienced a total reformation in product
                                variety,technology,management & marketing structure.
            </Text>
                            <Text style={{ fontSize: 18, color: '#808080', marginBottom: 12 }}>
                                SAR is the root & essence ofRoyal Group, Established in 1987, it
                                started its business as a traditional gold chain producer,since
                                years it has evolved with the touch of modern technology &
                                experienced a total reformation in product
                                variety,technology,management & marketing structure.
            </Text>
                            <Text style={{ fontSize: 18, color: '#808080', marginBottom: 12 }}>
                                SAR is the root & essence ofRoyal Group, Established in 1987, it
                                started its business as a traditional gold chain producer,since
                                years it has evolved with the touch of modern technology &
                                experienced a total reformation in product
                                variety,technology,management & marketing structure.
            </Text>
                        </View>
                    </SafeAreaView>
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    viewContainer: {
        marginHorizontal: 10,
    },
    HeadingText: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        marginTop: 18,
    },
    headerStyle: {
        backgroundColor: 'transparent',
        elevation: 0,
        borderBottomWidth: 0,
    },
    backImage: {
        width: 14,
        height: 26,
        marginLeft: 20,
    },
});