/*import React, { Component } from 'react';
import { StyleSheet, View, Text, ViewPropTypes,TouchableOpacity, ListView } from 'react-native';
import GridView from 'react-native-super-grid';
import PropTypes from 'prop-types';

var items = [
    { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
    { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
    { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
    { name: 'NEPHRITIS', code: '#27ae60' }, { name: 'BELIZE HOLE', code: '#2980b9' },
    { name: 'WISTERIA', code: '#8e44ad' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
    { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' },
    { name: 'ALIZARIN', code: '#e74c3c' }, { name: 'CLOUDS', code: '#ecf0f1' },
    { name: 'CONCRETE', code: '#95a5a6' }, { name: 'ORANGE', code: '#f39c12' },
    { name: 'PUMPKIN', code: '#d35400' }, { name: 'POMEGRANATE', code: '#c0392b' },
    { name: 'SILVER', code: '#bdc3c7' }, { name: 'ASBESTOS', code: '#7f8c8d' },
];

export default class GridViewExample extends Component {

    constructor(props){
        super(props);
        // var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        // this.state = {
        //     ds:items,
        //     dataSource:ds,
        // }
    }

    _onPressRow(item) {
        console.log('Test press' + item.name);
        items[0] = { name: 'Chinh', code: '#1abc9c' }
    }

    render() {
        // Taken from https://flatuicolors.com/


        return (
            <GridView
                itemWidth={130}
                // horizontal={}
                // pagingEnabled={true}
                items={items}
                style={styles.gridView}
                // dataSource = {this.state.dataSource}
                renderItem={item => (
                    <TouchableOpacity onPress={() => { this._onPressRow(item) }}>
                        <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemCode}>{item.code}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        );
    }
}


GridView.propTypes = {
    renderItem: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
    itemWidth: PropTypes.number,
    fixed: PropTypes.bool,
    spacing: PropTypes.number,
    style: ViewPropTypes.style,
    staticWidth: PropTypes.number,
    horizontal: PropTypes.bool,
    pagingEnabled: PropTypes.bool,
    dataSource: PropTypes.any.isRequired,

};

const styles = StyleSheet.create({

    gridView: {
        paddingTop: 5,
        flex: 1,
        //paddingBottom: 10,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },

});*/

var items = [
    { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
    { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
    { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
    { name: 'NEPHRITIS', code: '#27ae60' }, { name: 'BELIZE HOLE', code: '#2980b9' },
    { name: 'WISTERIA', code: '#8e44ad' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
    { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' },
    { name: 'ALIZARIN', code: '#e74c3c' }, { name: 'CLOUDS', code: '#ecf0f1' },
    { name: 'CONCRETE', code: '#95a5a6' }, { name: 'ORANGE', code: '#f39c12' },
    { name: 'PUMPKIN', code: '#d35400' }, { name: 'POMEGRANATE', code: '#c0392b' },
    { name: 'SILVER', code: '#bdc3c7' }, { name: 'ASBESTOS', code: '#7f8c8d' },
];

export function chunkArray(array, size) {
    return array.reduce((acc, val) => {
        if (acc.length === 0) acc.push([]);
        const last = acc[acc.length - 1];
        if (last.length < size) {
            last.push(val);
        } else {
            acc.push([val]);
        }
        return acc;
    }, []);
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ListView, Dimensions, ViewPropTypes, StyleSheet, TouchableOpacity } from 'react-native';
// import { chunkArray } from './utils';

export default class GridViewExample extends Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.onLayout = this.onLayout.bind(this);
        this.getDimensions = this.getDimensions.bind(this);
        this.state = this.getDimensions();
        const { items } = this.props;
        const { itemsPerRow } = this.state;
        const rows = chunkArray(items, itemsPerRow);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            ds:items,
            dataSource:ds.cloneWithRows(rows),
        }
    }

    onLayout(e) {
        if (!this.props.staticWidth) {
            const { width } = e.nativeEvent.layout || {};

            this.setState({
                ...this.getDimensions(width),
            });
        }

    }

    getDimensions(lvWidth) {
        const { itemWidth, spacing, fixed, staticWidth } = this.props;
        const totalWidth = lvWidth || staticWidth || Dimensions.get('window').width;
        const itemTotalWidth = itemWidth + spacing;
        const availableWidth = totalWidth - spacing; // One spacing extra
        const itemsPerRow = Math.floor(availableWidth / itemTotalWidth);
        const containerWidth = availableWidth / itemsPerRow;

        return {
            itemWidth,
            spacing,
            itemsPerRow,
            containerWidth,
            fixed,
        };
    }

    renderRow(data, sectionId, rowId) {
        const { itemWidth, spacing, containerWidth, fixed } = this.state;

        const rowStyle = {
            flexDirection: 'row',
            paddingLeft: spacing,
            paddingBottom: spacing,
        };
        const columnStyle = {
            flexDirection: 'column',
            justifyContent: 'center',
            width: containerWidth,
            paddingRight: spacing,
        };
        let itemStyle = {};
        if (fixed) {
            itemStyle = {
                width: itemWidth,
                alignSelf: 'center',
            };
        }

        return (
            <View style={rowStyle}>
                {(data || []).map((item, i) => (
                    <View key={`${rowId}_${i}`} style={columnStyle}>
                        <View style={itemStyle}>
                            {
                                this._renderItem(item, rowId, i)
                            }
                        </View>
                    </View>
                ))}
            </View>
        );
    }

    _renderItem(item, rowId, colum){
        return(
            <TouchableOpacity onPress={() => { this._onPressRow(rowId, colum) }}>
                <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemCode}>{item.code}</Text>
                </View>
            </TouchableOpacity>
            )
    }

    _onPressRow(rowId,colum) {
        // console.log('Test press' + item.name);
        var newDs = [];
        newDs = this.state.ds.slice();
        newDs[((parseInt(rowId) * 2) + parseInt(colum))].name = 'Chinh Pressed'
        // console.log('Test press ' + newDs[((parseInt(rowId) * 2) + parseInt(colum))].name);


        // const items_edit = [
        //     { name: 'CHINH', code: '#1abc9c' }, { name: 'TRAN', code: '#2ecc71' }];
        //
        const { itemsPerRow } = this.state;
        const rows = chunkArray(newDs, itemsPerRow);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
            dataSource: ds.cloneWithRows(rows)
        })
    }


    render() {
        const { style, spacing, ...props } = this.props;
        return (
            <ListView
                style={[{ paddingTop: spacing }, style]}
                onLayout={this.onLayout}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                {...props}
            />
        );
    }
}

const styles = StyleSheet.create({

    gridView: {
        paddingTop: 5,
        flex: 1,
        //paddingBottom: 10,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },

});

/*GridViewExample.propTypes = {
    // renderItem: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
    itemWidth: PropTypes.number,
    fixed: PropTypes.bool,
    spacing: PropTypes.number,
    style: ViewPropTypes.style,
    staticWidth: PropTypes.number,
};*/

GridViewExample.defaultProps = {
    fixed: false,
    itemWidth: 120,
    spacing: 10,
    style: styles.gridView,
    staticWidth: undefined,
    items: items,
    itemWidth: 130
};

