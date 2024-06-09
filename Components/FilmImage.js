import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getImageFromApi} from '../API/TMDBApi';
import moment from 'moment';

export default function FilmImage({film}) {
  const sortie = moment(new Date(film.release_date)).format('DD/MM/YYYY');
  const [textHolder, setTextHolder] = useState(film.title);
  const [instance, setInstance] = useState(false);
  const navigation = useNavigation();

  const onLongPressButton = () => {
    if (instance === false) {
      setTextHolder('sorti le ' + sortie);
      setInstance(!instance);
    } else {
      setInstance(!instance);
      setTextHolder(film.title);
    }
  };
  const displayDetailForFilm = (idFilm) => {
    console.log('Display film ' + idFilm);
    navigation.navigate('Details', {idFilm: idFilm});
  };

  return (
    <TouchableOpacity
      onLongPress={onLongPressButton}
      style={styles.main_container}
      onPress={() => displayDetailForFilm(film.id)}>
      <View style={styles.image_container}>
        <Image
          style={styles.image}
          source={{uri: getImageFromApi(film.poster_path)}}
        />
      </View>
      <View style={styles.content_container}>
        <Text style={styles.title_text}>{textHolder}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main_container: {
    height: 110,
    margin: 7,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },
  image_container: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 5,
  },
  content_container: {
    justifyContent: 'center',
    marginLeft: 5,
  },

  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flexWrap: 'wrap',
    paddingRight: 5,
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14,
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
});
