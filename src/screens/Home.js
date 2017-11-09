import React, {Component} from 'react';
import {View, Platform} from "react-native";
import Drawer from "../layout/Drawer";
import Tabs from "../layout/Tabs";
import Tab from "../config/TabRouter";

class Home extends Component {

    render() {
        return (
            Platform.OS === 'ios' ? <Tabs/> : <Tab/>
        )
    }
}

export default Home;