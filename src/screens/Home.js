import React, {Component} from 'react';
import {View, Platform} from "react-native";
import Drawer from "../layout/Drawer";
import Tabs from "../layout/Tabs";

class Home extends Component {

    render() {
        return (
            Platform.OS === 'ios' ?<Drawer/>/*<Tabs/>*/: <Drawer/>
        )
    }
}

export default Home;