import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity, Text, Button, Alert, ActivityIndicator} from 'react-native';
import {NavigationActions} from 'react-navigation';
import styles from './styles';
import * as API from '../config/api/config';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "demo@gmail.com",
            password: "123456",
            isShowValidError: false,
            movedPage: false,
            user: null,
            error: null,
            isLoading : false
        }

        let user = {id: '', name: ''};
        user.phone = 578676
    }

    _doLogin() {
        console.log("call login")
        if (validateEmail(this.state.username) && validatePassword(this.state.password)) {
            this.setState({
                isShowValidError: false,
                isLoading: true
            })

            this._login(this.state.email, this.state.password);

        } else {
            this.setState({
                isShowValidError: true
            })
        }
    }

    // _navigateToMain = () => {
    //     const resetAction = NavigationActions.reset({
    //         index: 0,
    //         actions: [
    //             NavigationActions.navigate({type: 'NAVI_DEMO', routeName: 'MainPage'})
    //         ]
    //     });
    //     store.dispatch(resetAction)
    // }

    componentWillReceiveProps(loginProps) {
        this.setState({
            isLoading: false,
        })
        if(this.state.user) {
            Alert.alert("Login result", "Login success")
        } else {
            Alert.alert("Login result", "Login fail")
        }
        // if (loginProps.state.isLoginSuccess && !loginProps.state.isWaitingLogin && !this.state.movedPage) {
        //     this.setState({
        //         movedPage: true
        //     })
        //    this.props.navigator.push('demo')
        //     console.log("Login success! ")
        // } else {
        //     console.log(" Login fail! ")
        // }

    }

    _login(email, password) {
        this.props.navigator.push('home')
        /*return fetch(API.login(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                this.props.navigator.push('home')
            // console.log(responseJson)
            //     this.props.navigator.push('home')
            //     this.setState({
            //         isLoading: false
            //     })
            //     // this.setState({
            //     //     user: responseJson.error ? null : responseJson,
            //     //     error: responseJson.error ? responseJson : null
            //     // })
            // })
            // .catch((error) => {
            //     console.log(error)
            //     this.props.navigator.push('home')
            //     this.setState({
            //         user: null,
            //         error: error,
            //         isLoading: false
            //     })
             });
             */
    }

    render() {
        const {isLoading} = this.state;
        return (<View style={styles.container}>
                <Text style={styles.login_label}>LOGIN</Text>
                <TextInput style={styles.input_login_field}
                           placeholder="Email"
                           autoCorrect={false}
                           keyboardType='email-address'
                           returnKeyType="next"
                           value="demo@gmail.com"
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
                           value="123456"
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
                <TouchableOpacity style={[styles.button, {backgroundColor: isLoading ? "#d3d3d3" : "#FFA000"}]
                    /*{height: 48,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: isLoading ? "#d3d3d3" : "#FFA000"}*/

                }

                                  onPress={this._doLogin.bind(this)}
                                  disabled={isLoading}

                >
                    <Text style={styles.login_button}>Login</Text>
                </TouchableOpacity>


                {isLoading && (<ActivityIndicator
                    style={styles.loading}
                    color="#C00"
                    size="large"
                />)
                }

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