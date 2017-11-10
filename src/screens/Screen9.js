import React, { Component } from 'react';
import { Text } from 'react-native';
import Container from '../components/Container';

class Screen extends Component {
  render() {
    return (
      <Container
        backgroundColor="#028e15"
        onPress={() => this.props.navigation.navigate('screen10')}
      />
    );
  }
}

export default Screen;
