import React, {Component} from 'react';
import {StatusBar, Dimensions} from 'react-native';
import AppConstant from '../screens/AppConstant';
import {
    StackNavigation,
    DrawerNavigation,
    DrawerNavigationItem,
} from '@expo/ex-navigation';

import DrawerRow from '../components/DrawerRow';

class DrawerApp extends Component {
    render() {
        return (
            <DrawerNavigation
                id='main'
                initialItem='home'
                drawerWidth={Dimensions.get('window').width * 0.75}
            >
                <DrawerNavigationItem
                    id='home'
                    renderTitle={isSelected => <DrawerRow title="Home" isSelected={isSelected}/>}
                >
                    <StackNavigation
                        id='home'
                        initialRoute="tabbar"
                        defaultRouteConfig={{
                            navigationBar: {
                                tintColor: '#181819',
                            }
                        }}
                    />
                </DrawerNavigationItem>
                <DrawerNavigationItem
                    id='demo2'
                    renderTitle={isSelected => <DrawerRow title="Demo2" isSelected={isSelected}/>}
                >
                    <StackNavigation
                        id='demo2'
                        initialRoute="demo2"
                        defaultRouteConfig={{
                            navigationBar: {
                                tintColor: '#181819',
                            }
                        }}
                    />
                </DrawerNavigationItem>
                <DrawerNavigationItem
                    id='camera'
                    renderTitle={isSelected => <DrawerRow title="Camera" isSelected={isSelected}/>}
                >
                    <StackNavigation
                        id='camera'
                        initialRoute="screen4"
                        defaultRouteConfig={{
                            navigationBar: {
                                tintColor: '#181819',
                            }
                        }}
                    />
                </DrawerNavigationItem>

                <DrawerNavigationItem
                    id='analytics'
                    renderTitle={isSelected => <DrawerRow title="Analytics" isSelected={isSelected}/>}
                >
                    <StackNavigation
                        id='analytics'
                        initialRoute="screen8"
                        defaultRouteConfig={{
                            navigationBar: {
                                tintColor: '#181819',
                            }
                        }}
                    />
                </DrawerNavigationItem>
            </DrawerNavigation>
        );
    }
}

export default DrawerApp;
