import React, {Component} from 'react';
import {View, Platform} from "react-native";
import Drawer from "../layout/Drawer";
// import Tabs from "../layout/Tabs";

class Home extends Component {

    render() {
        return (
            <View style={{flex:1}}>
                <Drawer/>
            </View>
        )
    }
}

export default Home;