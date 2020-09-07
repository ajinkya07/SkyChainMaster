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
import WebViewComponent from './WebViewComponent'


export default class AboutUs extends React.Component {
    render() {
        return (
            <Container style={styles.flex}>
                <_CustomHeader
                    Title='About Us'
                    LeftBtnPress={() => this.props.navigation.goBack()}
                    backgroundColor="#19af81"

                />
                <Content>
                    
                    <WebViewComponent />
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