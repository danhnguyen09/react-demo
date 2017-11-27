import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ListView,
    StyleSheet,
    Image,
} from 'react-native';
import SearchBar from 'react-native-searchbar';
import { Throttle, Debounce } from 'react-throttle';
const items = [
    1337,
    'janeway',
    {
        lots: 'of',
        different: {
            types: 0,
            data: false,
            that: {
                can: {
                    be: {
                        quite: {
                            complex: {
                                hidden: [ 'gold!' ],
                            },
                        },
                    },
                },
            },
        },
    },
    [ 4, 2, 'tree' ],
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //margin: 20
    },
    thumb: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    textContainer: {
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#48BBEC'
    },
    title: {
        fontSize: 20,
        color: '#656565'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
});

function urlForQueryAndPage(key, value, pageNumber) {
    const data = {
        country: 'uk',
        pretty: '1',
        encoding: 'json',
        listing_type: 'buy',
        action: 'search_listings',
        page: pageNumber,
    };
    data[key] = value;

    const querystring = Object.keys(data)
        .map(key => key + '=' + encodeURIComponent(data[key]))
        .join('&');

    return 'https://api.nestoria.co.uk/api?' + querystring;
};

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class SearchBarExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items,
            results: [],
            isLoading: true,
            empty: false,
            rawData: [],
            note: '',
            error: '',
            searchText: '',
            dataSource: ds.cloneWithRows([{title:'',price_formatted: '',img_url: ''}]),
        };
    }

    fetchData(query) {

        console.log(query);
        this.setState({ isLoading: true });
        fetch(query)
            .then(response => response.json())
            .then(json => this._handleResponse(json.response))
            .catch(error => {
                    console.log(error);
                    this.setState({
                        empty: true,
                        isLoading: false,
                    });
                }
            );
    }

    _handleResponse = (response) => {
        if (response.application_response_code.substr(0, 1) === '1') {
            console.log(response.listings)
            this.setState({
                dataSource: ds.cloneWithRows(response.listings),
                isLoading: false,
                empty: false,
            });
        } else {
            this.setState({
                dataSource: ds.cloneWithRows([{title:'',price_formatted: '',img_url: ''}]),
            });
            console.log('Location not recognized; please try again.');
        }
    };


    renderRow(rowData) {
        return (
            <View>
                <View style={styles.rowContainer}>
                    <Image style={styles.thumb} source={{ uri: rowData.img_url }} />
                    <View style={styles.textContainer}>
                        <Text style={styles.price}>{rowData.price_formatted.split(' ')[0]}</Text>
                        <Text style={styles.title}
                              numberOfLines={1}>{rowData.title}</Text>
                    </View>
                </View>
                <View style={styles.separator}/>
            </View>
        )
    }

    render() {

        return (
            <View style={styles.container}>
                <Throttle time="500" handler="handleChangeText">
                    <SearchBar
                        ref={(ref) => this.searchBar = ref}
                        data={items}
                        hideBack={true}
                        handleResults={console.log('test')/*this._handleResults*/}
                        // handleSearch={(text_search) => console.log(text_search)}
                        handleChangeText = { (text_search) =>
                        {
                            console.log(text_search);
                            const query = urlForQueryAndPage('place_name', text_search, 1);
                            this.fetchData(query);
                        }
                        }
                        showOnLoad
                    />
                </Throttle>
                <ListView style = {
                    {marginTop:80}
                }
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)} />
            </View>
        );
    }
}