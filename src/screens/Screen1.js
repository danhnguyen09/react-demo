import React, { Component } from 'react';
import { Text, Button, Platform, TouchableOpacity } from 'react-native';
import Container from '../components/Container';
import styles from './styles';
class Screen extends Component {
  static route = {
    navigationBar: {
        title: 'Screen #1',
        renderLeft: ((route, props) => <MenuButton/>)
    }
  }

  handleAlert = () => {
    this.props.navigator.showLocalAlert('Alerts are useful', {
      text: { color: '#fff' },
      container: { backgroundColor: '#F44336' },
    });
  }

  render() {
    return (
      <Container
        backgroundColor="#027c50"
        onPress={() => this.props.navigator.push('screen2')}
      >
        <Button
          title="Alert the Thing"
          onPress={this.handleAlert}
          color={Platform.OS === 'ios' ? '#fff' : null}
        />
      </Container>
    );
  }
}

class MenuButton extends React.Component {
    render() {
        return (
            <TouchableOpacity style={[styles.button,styles.menu_button]}>
                <Text>Menu</Text>
            </TouchableOpacity>
        );
    }
}
export default Screen;
