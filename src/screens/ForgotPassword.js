import React, {Component} from 'react';
import {
    View, AsyncStorage, TextInput, TouchableOpacity, Text, Button, Alert, ActivityIndicator,
    ScrollView
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import styles from './styles';
import * as API from '../config/api/config';
import {validateEmail, validatePassword, validateText} from "./Register";

class ForgotPassword extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`
    });

    constructor(props) {
        super(props)
        this.state = {
            username: null,
            isShowValidError: false,
            movedPage: false,
            user: null,
            error: null,
            isLoading: false,
        }

        props.navigation.setParams({title: "Forgot Password"});

    }

    _doRegister() {
        console.log("call login")
        if (validateEmail(this.state.username)) {
            this.setState({
                isShowValidError: false,
                isLoading: true
            })
            this._register(this.state.username);

        } else {
            this.setState({
                isShowValidError: true
            })
        }
    }

    _register(email) {
        var formData = new FormData();
        // formData.append('name', fullname)
        formData.append('email', email);
        // formData.append('password', password);
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
                    Alert.alert("Change Password", "Request fail\n" + responseJson.error_msg)
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
                Alert.alert("Change Password", "Request fail\n" + error)
            });
    }

    render() {
        const {isLoading} = this.state;

        return (
                <View>
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
                    <Text style={{
                        color: "#FF0000",
                        margin: 20,
                        textAlign: 'center'
                    }}>{this.state.isShowValidError ? "Error! Please check your email again!" : ' '}</Text>
                    <TouchableOpacity style={
                        [styles.button, isLoading ? styles.disable_bgBtnColor : styles.active_bgBtnColor]
                    }
                                      onPress={this._doRegister.bind(this)}
                                      disabled={isLoading}
                    >
                        <Text style={styles.login_button}>Submit</Text>
                    </TouchableOpacity>

                    {isLoading && (<ActivityIndicator
                        style={styles.loading_indicator}
                        color="#C00"
                        size="large"
                    />)
                    }
                </View>
        );
    }
}

export default ForgotPassword;