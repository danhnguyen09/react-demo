import React, {Component} from 'react'
import {Text, View, Platform, TextInput, TouchableOpacity, Image, Button} from 'react-native'
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class Demo2 extends Component {
    static route = {
        navigationBar: {
            title: 'Demo2',
            backgroundColor: 'green',
            color: 'white',
            textAlign: 'center'
        }
    }


    constructor(props) {
        super(props);
        this.state = {
            value: null,
            result: null
        }
    }

    _onButton1Click() {
        const value = this.state.value;
        this.setState({
            result: !isNaN(value) ? parseFloat(value) + 5 : 'NaN'
        })
    }

    _onButton2Click() {
        const value = this.state.value;
        this.setState({
            result: !isNaN(value) ? parseFloat(value) - 5 : 'NaN'
        })
    }

    _onSendButtonClick() {
        // this.props.navigator.resetTo({screen: Demo, value: this.state.value})
    }

    render() {
        let contentView = (
            <View style={styles.container}>
                <View style={{margin: 20}}>
                    <TextInput style={styles.input_login_field}
                               placeholder="Input number"
                               autoCorrect={false}
                               returnKeyType="done"
                               onChangeText={(input) => {
                                   this.setState({
                                       value: input
                                   })
                               }}/>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={{
                            width: 80, height: 40, margin: 10, backgroundColor: 'green',
                            justifyContent: 'center'
                        }}
                                          onPress={this._onButton1Click.bind(this)}>
                            <Text style={{textAlign: 'center'}}>+5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: 80,
                            height: 40,
                            margin: 10,
                            backgroundColor: 'blue',
                            justifyContent: 'center'
                        }} onPress={this._onButton2Click.bind(this)}>
                            <Text style={{textAlign: 'center'}}>-5</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{marginTop: 100}}>Result: {this.state.result}</Text>
                </View>

            </View>);
        return (contentView)
    }
}

export default Demo2;
