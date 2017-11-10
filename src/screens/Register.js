import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity, Text, Button, Alert, ActivityIndicator} from 'react-native';
import {NavigationActions} from 'react-navigation';
import styles from './styles';
import * as API from '../config/api/config';

class Register extends Component{

    constructor(props){
        super(props)

    }

    render(){
        return (
            <view style={styles.container}></view>
        );
    }
}