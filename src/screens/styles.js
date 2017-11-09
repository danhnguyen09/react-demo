import {Platform} from "react-native";

export default {
    container: {
        flex: 1,
        margin: 20
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
        height: 48,
        fontSize: 16,
        padding: 10,
        borderBottomWidth: Platform.OS =="ios"? 0.5 : 0,
        borderBottomColor: 'black'
        // fontFamily: 'Roboto-Regular',
    },
    login_button: {
        color: "#FFFFFF",
        // fontFamily: 'Roboto-Regular',
        fontSize: 16,
    },

    button: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFA000",
        // fontFamily: 'Roboto-Regular',
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

}
