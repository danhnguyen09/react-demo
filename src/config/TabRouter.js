import React from 'react';
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';
// import {createRouter, StackNavigation, TabNavigation} from '@expo/ex-navigation';

import Screen1 from '../screens/Screen1';
import Screen2 from '../screens/Screen2';
import Screen3 from '../screens/Screen3';
import Screen4 from '../screens/Screen4';
import Screen5 from '../screens/Screen5';
import Screen6 from '../screens/Screen6';
import Screen7 from '../screens/Screen7';
import Screen8 from '../screens/Screen8';
import Screen9 from '../screens/Screen9';
import Screen10 from '../screens/Screen10';
import Demo from '../screens/Demo';
import Demo2 from '../screens/Demo2';
import Login from '../screens/Login';
import {Image, TouchableOpacity} from "react-native";
// import Home from '../screens/Home';

const StackDemo = StackNavigator({
    demo: {
        screen: Demo,
        navigationOptions: ({navigation}) => ({
            title: 'HomeDemo',  // Title to appear in status bar
            headerLeft: <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
                <Image
                       source={require('../images/ic_menu_white_24dp_2x.png')} style={
                    {
                        margin: 10
                    }
                }/>
            </TouchableOpacity>,
            headerStyle: {
                        backgroundColor: 'green'
                    }
        })
    },

    demo2: {screen: Demo2},
})
const Stack1 = StackNavigator({
    screen7: {
        screen: Screen7,
    },
    screen8: {
        screen: Screen8,
    }
});

const Stack2 = StackNavigator({
    screen5: {
        screen: Screen5,
    },
    screen6: {
        screen: Screen6,
    }
});

const Stack3 = StackNavigator({
    screen9: {
        screen: Screen9,
    },
    screen10: {
        screen: Screen10,
    }
});

const TabItems = TabNavigator({
    tab1: {
        screen: Stack1,
    },
    tab2: {
        screen: Stack2,
    },
    tab3: {
        screen: Stack3,
    }
}, {
    initialRouteName: 'tab1'
})

const Drawers = DrawerNavigator({
    demoScreen: {screen: StackDemo}
})

const RootNavigator = StackNavigator({
    login: {screen: Login},
    home: {screen: Drawers}
}, {
    initialRouteName: 'login',
    headerMode: 'none'
})

export default RootNavigator;