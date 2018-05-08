import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  SectionList
} from 'react-native'
import { Placeholder } from 'react-native-loading-placeholder';
import { getCharacter } from "../api/MarvelApi";
import normalize from "../functions/normalize"

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  image: {
    width: normalize(120),
    height: normalize(144)
  },
  title: {
    flex: 1,
    fontSize: normalize(24),
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: normalize(15),
    marginHorizontal: 5,
    color: 'black',
    marginVertical: 5,
  },
  sectionHeader: {
    backgroundColor : 'black',
    fontSize : normalize(15),
    padding: 5,
    color: '#fff',
  },
  sectionItem: {
    fontSize : normalize(12),
    padding: 5,
    color: '#000',
    backgroundColor : 'transparent'
  },
  separator: {
    backgroundColor: 'black',
    width: width,
    height: 1.5,
  },
  error: {
    flex: 1,
    fontSize: normalize(24),
    padding: 10,
    color: 'red',
    textAlign: 'center',
  }
});

const RenderError = () =>(
  <View style={{ flex: 1, alignItems: 'center' }} >
    <Text style={[styles.error, { flex: 1 }]}>An error has occurred. Please try again later! :(</Text>
  </View>
);

const getItems = (data) => {
  if (data.length > 0) {
    return data.map(item => item.name);
  }

  return [ 'No Information' ];
}

export default class CharacterDescription extends Component {
  constructor(props) {
    super(props)

    this.state = {
      character: null,
      error: false,
    }
  }

  componentDidMount() {
    getCharacter(this.props.characterId)
      .then((response) => {
        this.setState({ character: response.data.results[0] });
        console.log(this.state)
      })
      .catch(error => this.setState({ error: true }));
  }

  render() {
    const { error, character } = this.state;

    if (!character) {
      //TODO: Add a PlaceHolder
      return <View/>
    }

    if (error){
      return <RenderError />
    }

    const sections = [
      { title: 'Comics', data: getItems(character.comics.items) },
      { title: 'Events', data: getItems(character.events.items) },
      { title: 'Serie', data: getItems(character.series.items) },
      { title: 'Stories', data: getItems(character.stories.items) },
    ];

    return (
      <ScrollView style={{ flex: 1 }} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
          <Image style={styles.image} source={{uri: `${character.thumbnail.path}.${character.thumbnail.extension}`}} />
          <Text style={styles.title} >{character.name.toUpperCase()}</Text>
        </View>
        <View style={styles.separator} />
        <Text style={styles.subtitle} >{character.description || 'No description'}</Text>
        <SectionList
          sections={sections}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          renderItem={({item}) => <Text style={styles.sectionItem}>{item}</Text>}
          keyExtractor={(item, index) => index}
        />
      </ScrollView>

    )
  }

}
