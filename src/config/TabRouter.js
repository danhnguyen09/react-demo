import {createRouter, StackNavigation, TabNavigation} from '@expo/ex-navigation';

import Screen1 from '../screens/Screen1';
import Screen2 from '../screens/Screen2';
import Screen3 from '../screens/Screen3';
import Screen4 from '../screens/Screen4';
import Screen5 from '../screens/Screen5';
import Screen6 from '../screens/Screen6';
import Screen7 from '../screens/Screen7';
import Screen8 from '../screens/Screen8';
import Screen9 from '../screens/Screen9';
import Screen10 from '../screens/Screen10';
import Demo from '../screens/Demo';
import Demo2 from '../screens/Demo2';
import Login from '../screens/Login';
import Home from '../screens/Home';


export const Stack1 = StackNavigation({
    screen7: {
        screen: Screen7,
    },
    screen8: {
        screen: Screen8,
    }
});

export const Stack2 = StackNavigation({
    screen5: {
        screen: Screen5,
    },
    screen6: {
        screen: Screen6,
    }
});

export const Stack3 = StackNavigation({
    screen9: {
        screen: Screen9,
    },
    screen10: {
        screen: Screen10,
    }
});

export const Tab = TabNavigation({
    tab1: {
        screen: Stack1,
    },
    tab2: {
        screen: Stack2,
    },
    tab3: {
        screen: Stack3,
    }
})