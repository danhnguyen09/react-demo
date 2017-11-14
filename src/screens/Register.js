import React, {Component} from 'react';
import {
    View, AsyncStorage, TextInput, TouchableOpacity, Text, Button, Alert, ActivityIndicator,
    ScrollView
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import styles from './styles';
import * as API from '../config/api/config';

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fullname: null,
            username: null,
            password: null,
            isShowValidError: false,
            movedPage: false,
            user: null,
            error: null,
            isLoading: false

        }
    }

    _doRegister() {
        console.log("call login")
        if (validateText(this.state.fullname) && validateEmail(this.state.username) && validatePassword(this.state.password)) {
            this.setState({
                isShowValidError: false,
                isLoading: true
            })
            this._register(this.state.fullname, this.state.username, this.state.password);

        } else {
            this.setState({
                isShowValidError: true
            })
        }
    }

    _register(fullname, email, password) {
        var formData = new FormData();
        formData.append('name', fullname)
        formData.append('email', email);
        formData.append('password', password);
        // console.log("Fullname==>" + fullname)
        // console.log("Email==>" + email)
        // console.log("Password==>" + password)

        return fetch(API.register(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)

                this.setState({
                    isLoading: false
                })
                if (responseJson.error) {
                    Alert.alert("Register", "Register fail\n" + responseJson.error_msg)
                    return;
                }
                AsyncStorage.setItem('USER_JSON', responseJson, () => {
                    let resetNav = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({routeName: 'home'})
                        ]
                    })
                    this.props.navigation.dispatch(resetNav);
                });
            })
            .catch((error) => {
                console.log(error)
                this.setState({
                    user: null,
                    error: error,
                    isLoading: false
                })
                Alert.alert("Register", "Register fail\n" + error)
            });
    }

    render() {
        const {isLoading} = this.state;

        return (<ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
                <View>
                    <Text style={styles.login_label}>REGISTER</Text>
                    <TextInput style={styles.input_login_field}
                               placeholder="Fullname"
                               autoCorrect={false}
                               returnKeyType="next"
                               onChangeText={(input) => {
                                   this.setState({
                                       isShowValidError: false,
                                       fullname: input
                                   })
                               }}/>
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
                    }}>{this.state.isShowValidError ? "Error! Please check your info again!" : ' '}</Text>
                    <TouchableOpacity style={
                        [styles.button, isLoading ? styles.disable_bgBtnColor : styles.active_bgBtnColor]
                    }

                                      onPress={this._doRegister.bind(this)}
                                      disabled={isLoading}

                    >
                        <Text style={styles.login_button}>Register</Text>
                    </TouchableOpacity>

                    {isLoading && (<ActivityIndicator
                        style={styles.loading_indicator}
                        color="#C00"
                        size="large"
                    />)
                    }

                </View>
            </ScrollView>

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

function validateText(text) {
    return text && text.length > 0;
}

export default Register;