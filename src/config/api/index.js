
import React, {Component} from 'react';
import * as Config from './config';

export default class APIService extends Component {
    static async get(url) {
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': Config.HEADER_TYPE,
                // 'Cookie': await AppData.getCookie(),
                // 'X-CSRFToken': await AppData.getToken()
            }
        });
    }

    static async post(url, body) {
        console.log(JSON.stringify(body));
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Cookie': await AppData.getCookie(),
                // 'X-CSRFToken': await AppData.getToken()
            },
            body: JSON.stringify(body)
        });
    }
}