import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getImageFromApi} from '../API/TMDBApi';
import FadeIn from '../Animations/FadeIn';
import moment from 'moment';

export default function FilmItem({film, isFilmFavorite}) {
  const navigation = useNavigation();

  const displayDetailForFilm = (idFilm) => {
    navigation.navigate('Details', {idFilm: idFilm});
  };

  const displayFavoriteImage = () => {
    if (isFilmFavorite) {
      // If isFilmFavorite is true, display the 🖤
      return (
        <Image
          style={styles.favorite_image}
          source={require('../Images/ic_favorite.png')}
        />
      );
    }
  };

  return (
    <FadeIn>
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => displayDetailForFilm(film.id)}>
        {film.backdrop_path ? (
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.backdrop_path)}}
          />
        ) : (
          <Image
            style={styles.image}
            source={require('../Images/Film-Affiche.png')}
          />
        )}
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            {displayFavoriteImage()}
            <Text style={styles.title_text}>{film.title}</Text>
            <View style={styles.circle}>
            <Text style={styles.vote_text}>{film.vote_average.toString().substring(0, 3)}</Text>
            </View>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={6}>
              {film.overview}
            </Text>
          </View>
          <View style={styles.date_container}>
            {film.release_date ? (
              <Text style={styles.date_text}>
                Sorti le{' '}
                {moment(new Date(film.release_date)).format('DD/MM/YYYY')}
              </Text>
            ) : (
              <Text style={styles.date_text}>Date de sortie inconnue</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row',
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
  },
  content_container: {
    flex: 1,
    margin: 5,
  },
  header_container: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_text: {
    fontFamily: 'fantasy',
    fontWeight: 'bold',
    flexWrap: 'wrap',
    paddingRight: 5,
    fontSize: 18,
    flex: 1,
  },
  circle: {
    width: 40, 
    height: 40, 
    borderRadius: 30, 
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 1, // élévation pour les ombres sur Android
  },

  vote_text: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#666666',
  },
  description_container: {
    flex: 7,
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
  },
  date_container: {
    flex: 1,
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14,
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
});
