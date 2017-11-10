import React, {Component} from 'react';
import {Text} from 'react-native';
import Container from '../components/Container';

class Screen extends Component {
    render() {
        return (
            <Container
                backgroundColor="#067a46"
                onPress={() => this.props.navigation.navigate('screen6')}
            />
        );
    }
}

export default Screen;
