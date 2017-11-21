import React, {Component} from 'react';
import {View, AsyncStorage, TextInput, TouchableOpacity, Text, Button, Alert, ActivityIndicator, Dimensions} from 'react-native';
import {NavigationActions} from 'react-navigation';
import styles from './styles';
import * as API from '../config/api/config';
import PopupDialog, {
    DialogTitle,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
    FadeAnimation,
} from 'react-native-popup-dialog';
const window = Dimensions.get('window');
// const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
const scaleAnimation = new ScaleAnimation();
// const fadeAnimation = new FadeAnimation({ animationDuration: 150 });

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            isShowValidError: false,
            movedPage: false,
            user: null,
            error: null,
            isLoading: false,
            dialogShow: false,
        };
    }

    showScaleAnimationDialog() {
        this.scaleAnimationDialog.show();
    }

    // showSlideAnimationDialog() {
    //     this.slideAnimationDialog.show();
    // }
    //
    // showFadeAnimationDialog() {
    //     this.fadeAnimationDialog.show();
    // }

    _doLogin() {
        console.log("call login")
        if (validateEmail(this.state.username) && validatePassword(this.state.password)) {
            this.setState({
                isShowValidError: false,
                isLoading: true
            })
            this._login(this.state.username, this.state.password);

        } else {
            this.setState({
                isShowValidError: true
            })
        }
    }

    _login(email, password) {
        var formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);


        console.log("Email==>" + email)
        console.log("Password==>" + password)
        return fetch(API.login(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false
                })
                console.log(responseJson)
                if (responseJson.error) {
                    Alert.alert("Login", "Login fail\n" + responseJson.error_msg)
                    return;
                }
                AsyncStorage.setItem('USER_EMAIL', JSON.stringify(responseJson.user.email))
                let resetNav = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'home'})
                    ]
                })
                this.props.navigation.dispatch(resetNav);
            })
            .catch((error) => {
                console.log(error)
                this.setState({
                    user: null,
                    error: error,
                    isLoading: false
                })
                Alert.alert("Login", "Login fail\n" + error)
            });
    }

    render() {
        const {isLoading} = this.state;

        return (<View style={styles.container}>
                <PopupDialog
                    width={window.width * 0.85}
                    ref={(popupDialog) => {
                        this.scaleAnimationDialog = popupDialog;
                    }}
                    dialogAnimation={scaleAnimation}
                    dialogTitle={<DialogTitle title="Confirm!!" />}
                    actions={[
                        <DialogButton
                            text="DISMISS"
                            onPress={() => {
                                this.scaleAnimationDialog.dismiss();
                                //this._doLogin.bind(this);
                            }}
                            key="button-1"
                        />,
                    ]}
                >
                    <View style={styles.dialogContentView}>
                        <Text style={
                            {color: "#FF0000",
                                // fontFamily: 'Roboto-Regular',
                                fontSize: 20,
                                textAlign: 'center',
                                // textStyle: 'bold',
                                margin: 10} }>Login with {this.state.username}!</Text>
                    </View>
                </PopupDialog>
                <Text style={styles.login_label}>LOGIN</Text>
                <TextInput style={styles.input_login_field}
                           placeholder="Email"
                           autoCorrect={false}
                           keyboardType='email-address'
                           returnKeyType="next"
                           onChangeText={(input) => {
                               this.setState({
                                   isShowValidError: false,
                                   username: input
                               })
                           }}/>

                <TextInput style={styles.input_login_field}
                           placeholder="Password"
                           secureTextEntry={true}
                           returnKeyType="go"
                           onChangeText={(input) => {
                               this.setState({
                                   isShowValidError: false,
                                   password: input
                               })
                           }}/>

                <Text style={{
                    color: "#FF0000",
                    margin: 20,
                    textAlign: 'center'
                }}>{this.state.isShowValidError ? "Email or password is wrong format!" : ' '}</Text>
                <TouchableOpacity style={
                    [styles.button, isLoading ? styles.disable_bgBtnColor : styles.active_bgBtnColor]
                }

                                  onPress={
                                      // this._doLogin.bind(this)
                                      this.showScaleAnimationDialog.bind(this)
                                  }
                                  disabled={isLoading}

                >
                    <Text style={styles.login_button}>Login</Text>
                </TouchableOpacity>

                {isLoading && (<ActivityIndicator
                    style={styles.loading_indicator}
                    color="#C00"
                    size="large"
                />)
                }

                <TouchableOpacity style={{
                    marginTop: 20,
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                }} onPress={() => {
                    this.props.navigation.navigate('grid_view'/*'register'*/)
                }}>
                    <Text>Register Account</Text>
                </TouchableOpacity>
            </View>

        );
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePassword(password) {
    return password && password.length > 0;
}

export default Login;