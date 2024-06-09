import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Share,
  Platform,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {getFilmDetailFromApi, getImageFromApi} from '../API/TMDBApi';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {favFilm} from '../redux/favoritesFilmSlice';
import {vus} from '../redux/vusSlice';
import GetPosts from './GetPosts';
import NewPost from './NewPost';
import numeral from 'numeral';
import moment from 'moment';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function FilmDetail({route}) {
  /* Redux */
  const vusFilm = useSelector((state) => state.filmVus.vusFilm);
  const favoris = useSelector((state) => state.favorisFilm);
  const dispatch = useDispatch();
  /* State */
  const [isLoading, setIsLoading] = useState(false);
  const [iconFav, setIconFav] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [film, setFilm] = useState([]);
  const navigation = useNavigation();

  /* Get Data Film */
  useEffect(() => {
    const {idFilm} = route.params;
    setIsLoading(true);
    getFilmDetailFromApi(idFilm)
      .then((data) => {
        setFilm(data);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [route.params]);

  /* ShareFilm with other */
  const share = () => {
    const shareFilm = () => {
      if (film) {
        Share.share({title: film.title, message: film.overview});
      }
    };

    if (film && Platform.OS === 'ios') {
      return (
        <TouchableOpacity
          style={styles.share_touchable_headerrightbutton}
          onPress={shareFilm}>
          <Image
            style={styles.share_image}
            source={require('../Images/ic_share.ios.png')}
          />
        </TouchableOpacity>
      );
    } else if (film && Platform.OS === 'android') {
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={shareFilm}>
          <Image
            style={styles.share_image}
            source={require('../Images/ic_share.android.png')}
          />
        </TouchableOpacity>
      );
    }
  };

  /* Display Animation Loading */
  const displayLoading = () => {
    if (isLoading) {
      return (
        <View style={styles.Loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  };

  /* Dispatch Film Favories */
  const toggleFavorite = () => {
    dispatch(favFilm(film));
  };

  /* Display Favorite with Heart  */
  const displayFavoriteImage = () => {
    let sourceImage = require('../Images/ic_favorite_border.png');

    const favoriteFilmIndex = favoris.findIndex((item) => item.id === film.id);
    if (favoriteFilmIndex !== -1) {
      sourceImage = require('../Images/ic_favorite.png');
    }

    return (
      <View>
        <Image style={styles.favorite_image} source={sourceImage} />
      </View>
    );
  };

  /* Dispatch Film Vus */
  const buttomVus = () => {
    dispatch(vus(film));
    setToggle(!toggle);
  };

  /* Display Text Film Vu */
  const displayButtonVu = () => {
    //let vu = ' Non vu';
    let sourceImage = require('../Images/oeil.png');

    const vuIndex = vusFilm.findIndex((item) => item.id === film.id);
    if (vuIndex !== -1) {
      //vu = 'Déjà Vu';
      sourceImage = require('../Images/oeil_cacher.png');
    }

    return (
      <View>
        <Image style={styles.favorite_image} source={sourceImage} />
      </View>
    );
  };

  const displayFilm = () => {
    if (film) {
      return (
        <ScrollView style={styles.scrollview_container}>
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
          <TouchableOpacity
            style={{
              position: 'absolute',
              margin: 10,
              backgroundColor: 'black',
              borderRadius: 20,
            }}
            onPress={() => navigation.goBack()}>
            <Image
              style={{tintColor: 'white'}}
              source={require('../Images/fleche-gauche.png')}
            />
          </TouchableOpacity>

          <Text style={styles.title_text}>{film.title}</Text>
          <View style={{flexDirection: 'row', alignSelf: 'center', margin: 4}}>
            <TouchableOpacity
              style={styles.favorite_container}
              onPress={buttomVus}>
              {displayButtonVu()}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.favorite_container}
              onPress={toggleFavorite}>
              {displayFavoriteImage()}
            </TouchableOpacity>
          </View>

          <Text style={styles.description_text}>{film.overview}</Text>

          {film.release_date ? (
            <Text style={styles.default_text}>
              Sorti le {moment(film.release_date).format('DD/MM/YYYY')}
            </Text>
          ) : (
            <Text style={styles.default_text}>Date de sortie inconnue</Text>
          )}

          <Text style={styles.default_text}>
            Note : {film.vote_average} / 10
          </Text>
          <Text style={styles.default_text}>
            Nombre de votes : {film.vote_count}
          </Text>
          <Text style={styles.default_text}>
            Budget : {numeral(film.budget).format('0,0[.]00 $')}
          </Text>
          {film.genres && film.genres.length > 0 && (
            <Text style={styles.default_text}>
              Genre(s): {film.genres.map((genre) => genre.name).join(' / ')}
            </Text>
          )}
          {film.production_companies &&
            film.production_companies.length > 0 && (
              <Text style={styles.default_text}>
                Companie(s):{' '}
                {film.production_companies
                  .map((company) => company.name)
                  .join(' / ')}
              </Text>
            )}
          <GetPosts identifier={route.params.idFilm} />
          {share()}
        </ScrollView>
      );
    }
  };

  return (
    <View style={styles.main_container}>
      {displayFilm()}
      {displayLoading()}

      <View>
        <NewPost idFilm={route.params.idFilm} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: 'white',
    flex: 1,
  },

  Loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollview_container: {
    flex: 1,
  },
  image: {
    height: 169,
    margin: 5,
  },
  title_text: {
    flex: 1,
    fontFamily: 'fantasy',
    textAlign: 'center',
    fontWeight: 'bold',
    flexWrap: 'wrap',
    fontSize: 30,
    marginBottom: 10,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
    color: '#000000',
  },
  description_text: {
    fontStyle: 'italic',
    fontFamily: 'fantasy',
    textAlign: 'justify',
    lineHeight: 22,
    fontSize: 15,
    color: '#666666',
    margin: 5,
    marginBottom: 15,
    padding: 5,
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    fontFamily: 'fantasy',
    lineHeight: 22,
    paddingLeft: 5,
  },
  favorite_container: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  favorite_image: {
    width: 45,
    height: 45,
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    right: 10,
    top: 12,
    //bottom: 30,
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: 'dodgerblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  share_image: {
    width: 30,
    height: 30,
  },
  share_touchable_headerrightbutton: {
    marginRight: 8,
  },
  Buttom: {
    padding: '2%',
    backgroundColor: 'black',
    maxWidth: 270,
    alignSelf: 'center',
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 19,
    color: 'white',
  },
});
