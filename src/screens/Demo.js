import {Text, View, Platform, TextInput, StyleSheet, ListView, Image, TouchableOpacity} from 'react-native'
import React, {Component} from 'react'
import {NavigationActions} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Alert} from "react-native";
import APIService from '../config/api';
import * as API from '../config/api/config';

class Demo extends Component {
    static route = {
        navigationBar: {
            title: 'Demo List',
            backgroundColor: 'green',
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});
        console.log("Run get photo")
        return fetch(API.getPhoto())
            .then((response) => response.json())
            .then((responseJson) => {
                if (this.state.dataSource) {
                    console.log("dataSource not null")
                } else {
                    console.log("dataSource null")
                }
                this.setState({
                    isLoading: false,
                    dataSource: this.state.dataSource.cloneWithRows(responseJson),
                });
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    isLoading: false,
                });
                console.log(error)
            });
    }

    render() {
        const {isLoading} = this.state;
        let contentView = (
            <View style={stylesList.container}>
                {isLoading
                    ? <View style={stylesList.loading}><Text>Loading...</Text></View>
                    : <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(photos) => <Row key={photos.id} {...photos}/>}
                    />
                }
            </View>
        );
        return (contentView);
    }
}

const stylesList = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollSpinner: {
        marginVertical: 20,
    },
    row: {
        padding: 10,
    }
});

const stylesRow = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 10,
        marginRight: 30,
        fontSize: 16,
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#8E8E8E',
    },
});
const Row = (photos) => (
    <View style={stylesRow.container}>
        <Image source={{uri: photos.thumbnailUrl}} style={stylesRow.photo}/>
        <Text style={stylesRow.text} onPress={() => {
            Alert.alert("Information", "Click at id: " + photos.id + "\n" + photos.title)
        }}>
            {photos.title}
        </Text>
    </View>

);


export default Demo;