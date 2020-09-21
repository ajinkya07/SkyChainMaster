import 'react-native-gesture-handler';
import * as React from 'react';
import Scene from '@navigation/Scene';
import {Root} from 'native-base';
import {View, Platform} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from '@redux/store';
import SplashScreen from 'react-native-splash-screen'

 import firebase from 'react-native-firebase';
 import { Notification, NotificationOpen } from 'react-native-firebase';


const store = configureStore();

class App extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount =async () => {
    console.disableYellowBox = true;
     SplashScreen.hide()

     await this.checkPermission();

    // this.createNotificationListeners();
    // firebase.notifications().setBadge(0)
    // firebase.notifications().removeAllDeliveredNotifications()

  };

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getFcmToken();
    } else {
      this.requestPermission();
    }
  }


  getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.warn("fcmToken", fcmToken);
    } else {
    }
  }


  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
  }

  // messageListener = async () => {
  //   this.notificationListener = firebase.notifications().onNotification((notification) => {
  //     const { title, body } = notification;
  //   });

  //   this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
  //     const { title, body } = notificationOpen.notification;
  //   });

  //   const notificationOpen = await firebase.notifications().getInitialNotification();
  //   if (notificationOpen) {
  //     const { title, body } = notificationOpen.notification;
  //   }

  //   this.messageListener = firebase.messaging().onMessage((message) => {
  //     console.warn(JSON.stringify(message));
  //   });
  // }


//   createNotificationListeners = async () =>{
//     this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {

//     });

//     this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
//       if (Platform.OS === "android") {
//         this.androidNotificationHandle(notification);
//       } else {
//         this.iosNotificationHandle(notification);
//       }
//     });
  
//  /*
//   * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
//   * */
//     this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
//       const { data, notificationId} = notificationOpen.notification;
//       // const actionType = getNextScreen(data)
//       // this.redirectToNextScreenAndMarkAsRead(data.gsNotificationId, actionType,  data.payloadID  )
//     });

//  /*
//   * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
//   * */
//     const notificationOpen = await firebase.notifications().getInitialNotification();
//     if (notificationOpen) {
//       const notification: Notification = notificationOpen.notification;  
//       const { data, notificationId} = notification;
//       // const actionType = getNextScreen(data)
//       // this.redirectToNextScreenAndMarkAsRead(data.gsNotificationId, actionType,  data.payloadID )
      
//     }
//   }
  
  // redirectToNextScreenAndMarkAsRead = (notificationId, actionType, payloadID) =>{
  //   store.dispatch({ 
  //     type: "NOTIFICATIONS_REDIRECT_TO_NEXT_SCREEN",
  //     payload: {notificationId, actionType , reqFrom :'NOTIFICATIONS_TRAY' , isRead:false, payloadID }
  //   });
  // }
  
    //android notification setting e.g icon color sound

  // androidNotificationHandle = notification => {
  //   const { title, body, data} = notification;
  //   // Build a channel(android only)
  //   const channel = new firebase.notifications.Android.Channel('test-channel', 'test-channel', firebase.notifications.Android.Importance.Max)
  //   .setDescription('My apps test channel');
  //   firebase.notifications().android.createChannel(channel);
  //   notification
  //     .setNotificationId(data.gsNotificationId)
  //     // .setTitle(title)
  //     // .setBody(body)
  //     // .setSound('default')
  //     .android.setChannelId("test-channel")
  //     .android.setAutoCancel(true)
  //     //.android.setPriority(firebase.notifications.Android.Priority.Max)
  //     //.android.setClickAction(notification.android.clickAction)
  //     .android.setSmallIcon("ic_notification") // create this icon in Android Studio
  //     .android.setColor(themeStyle.PRIMARY_COLOR_BLUE)
  //   firebase.notifications().displayNotification(notification);

  //   firebase.notifications().setBadge(parseInt(data.badge))
  // };
  

  // //ios notification setting e.g icon color sound
  // iosNotificationHandle = notification => {
  //   const { title, body, data} = notification;
  //   notification
  //   .setNotificationId(data.gsNotificationId)
  //   .setTitle(title)
  //   .setBody(body)
  //   .setSound('default')
  //   .ios.setBadge(parseInt(data.badge));
  //   firebase.notifications().displayNotification(notification);
  // };
  
  // componentWillUnmount() {
  //   this.notificationDisplayedListener();
  //   this.notificationListener();
  //   this.notificationOpenedListener();
  // }






  render() {
    return (
      <View style={{flex: 1}}>
        <Root>
          <Provider store={store}>
            <Scene />
          </Provider>
        </Root>
      </View>
    );
  }
}

export default App;
