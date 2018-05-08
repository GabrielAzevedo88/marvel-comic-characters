import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from 'react-native'

import EasyListView from 'react-native-easy-listview-gridview'
import LinearGradient from 'react-native-linear-gradient';
import { getCharacters } from '../api/MarvelApi';
import normalize from '../functions/normalize'

const {width} = Dimensions.get('window');
const ROW_HEIGHT = width / 2;
let page = 1;
let totalData = 0;

const styles = StyleSheet.create({
  image: {
    width: width / 3,
    height: ROW_HEIGHT
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: normalize(14)
  },
});

const Character = ({ data, navigate }) => (
  <TouchableOpacity onPress={() => navigate('CharacterDescription', { characterId: data.id })}>
    <ImageBackground
      style={styles.image}
      source={{uri: `${data.thumbnail.path}.${data.thumbnail.extension}`}}
    >
      <LinearGradient
        style={{flexDirection: 'row', flex: 1}}
        colors={['transparent', 'rgba(0,0,0,0.6)']}
      >
        <View style={{alignSelf: 'flex-end', padding: 5}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.text}>{data.name}</Text>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  </TouchableOpacity>
)

export default class CharactersList extends Component {
  static defaultProps = {
    emptyContentText: 'No character found',
    dataSizePerPage: 21,
    numColumn: 3,
  }

  constructor(props) {
    super(props)

    this.renderGridItem = this._renderGridItem.bind(this)
    this.onFetch = this._onFetch.bind(this)
  }

  _onFetch(pageNo, success, failure) {
    const { dataSizePerPage } = this.props;

    getCharacters(page, dataSizePerPage)
      .then((response) => {
        const { data } = response;

        if (data) {
          if (totalData === 0) {
            totalData = data.total;
          }

          if (page > Math.ceil(totalData / dataSizePerPage)) {
            success([])
          } else {
            page++;
            success(data.results);
          }
        } else {
          success([])
        }
      })
      .catch( error=> failure(error.message));
  }

  _renderGridItem(index, rowData) {
    const {navigate} = this.props.navigation;

    return <Character data={rowData} navigate={navigate} />
  }

  render() {
    return (
      <EasyListView
        emptyContent={this.props.emptyContentText}
        dataSizePerPage={this.props.dataSizePerPage}
        column={this.props.numColumn}
        rowHeight={ROW_HEIGHT}
        renderItem={this.renderGridItem}
        refreshHandler={this.onFetch}
        loadMoreHandler={this.onFetch}
      />
    )
  }
}
