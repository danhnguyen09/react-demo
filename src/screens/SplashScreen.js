import React, {Component} from 'react';
import {StyleSheet, AsyncStorage, View, Text} from 'react-native';
import {NavigationActions} from 'react-navigation';

class SplashScreen extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        AsyncStorage.getItem('USER_EMAIL', (err, result) => {
            console.log("User storage => " + result)
            console.log("User storage error => " + err)
            if (!err) {
                if (result) {
                    this._navigateTo('home')
                } else {
                    this._navigateTo('login')
                }
            }
        })
    }


    _navigateTo = (routeName: string) => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName})]
        })
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        return (
            <View style={splashStyle.container}>

            </View>
        )
    }
}

const splashStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    splash_label: {
        color: "#FF0000",
        // fontFamily: 'Roboto-Regular',
        fontSize: 40,
        textAlign: 'center',
        margin: 50
    }
})

export default SplashScreen;