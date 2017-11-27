import {Platform, Dimensions} from "react-native";
export const constant = {
    main_color : '#FFA000',
};

export default {
    container: {
        flex: 1,
        //margin: 20
    },
    input_group: {
        borderColor: "#999999",
        marginBottom: 10
    },
    input: {
        fontSize: 16,
        paddingBottom: -5,
        paddingLeft: -1,
        // fontFamily: 'Roboto-Regular',
    },
    login_label: {
        color: "#FF0000",
        // fontFamily: 'Roboto-Regular',
        fontSize: 30,
        textAlign: 'center',
        // textStyle: 'bold',
        margin: 50
    },

    input_login_field: {
        margin: 20,
        height: 48,
        fontSize: 16,
        padding: 10,
        borderBottomWidth: Platform.OS == "ios" ? 0.5 : 0,
        borderBottomColor: 'black'
        // fontFamily: 'Roboto-Regular',
    },
    login_button: {
        color: "#FFFFFF",
        // fontFamily: 'Roboto-Regular',
        fontSize: 16,
    },

    button: {
        margin:20,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: constant.main_color,
        // fontFamily: 'Roboto-Regular',
    },

    button_height:{
        height: 40,
    },

    button_height:{
        height: 40,
    },

    button_margin_right:{
        marginRight:20,
    },

    button_margin_left:{
        marginLeft:20,
    },

    logout_button: {
        height: 48,
        alignItems: 'center',
        marginTop: 60,
        backgroundColor: "#FFA000",
        justifyContent: 'center',
    },

    disable_bgBtnColor: {
        backgroundColor: "#d3d3d3"
    },
    active_bgBtnColor: {
        backgroundColor: "#FFA000"
    },

    button_back: {
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffffff",
        width: 25,
        height: 25,
    },

    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },

    loading_indicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

    contentDialog: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: 200,
        height: 100
    },
}
