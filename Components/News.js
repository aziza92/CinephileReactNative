import {
  getBestFilmsFromApi,
  getFilmsSortedByDescRatingFromApi,
  getFilmsSortedByAscTitleFromApi,
} from '../API/TMDBApi';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import FilmList from './FilmList';

export default function News({navigation}) {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stateButton, setStateButton] = useState(false);
  const [uri, setUri] = useState(require('../Images/sort_nom.png'));
  const [title, setTitle] = useState('Trier par nom');

  const loadFilms = () => {
    setIsLoading(true);
    getBestFilmsFromApi(page + 1).then((data) => {
      setPage(data.page);
      setTotalPages(data.total_pages);
      setFilms((prevFilms) => [...prevFilms, ...data.results]);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    loadFilms();
  }, []);

  const sortByRating = () => {
    getFilmsSortedByDescRatingFromApi(page + 1).then((data) => {
      setPage(data.page);
      setTotalPages(data.total_pages);
      setFilms((prevFilms) => [...prevFilms, ...data.results]);
      setUri(require('../Images/evaluation.png')); // Update the uri
      setTitle('Trier par Note');
    });
  };

  const sortByNom = () => {
    getFilmsSortedByAscTitleFromApi(page + 1).then((data) => {
      setPage(data.page);
      setTotalPages(data.total_pages);
      setFilms((prevFilms) => [...prevFilms, ...data.results]);
    });
  };
  const sortByBest = () => {
    getBestFilmsFromApi(page + 1).then((data) => {
      setPage(data.page);
      setTotalPages(data.total_pages);
      setFilms((prevFilms) => [...prevFilms, ...data.results]);
    });
  };

  const onPressButton = () => {
    setFilms([]);
    if (!stateButton) {
      setUri(require('../Images/evaluation.png'));
      setStateButton(true);
      sortByRating();
      setTitle('Trier par Note');
    } else {
      if (uri === require('../Images/evaluation.png')) {
        setUri(require('../Images/sort_fav.png'));
        sortByBest();
        setTitle('Trier par meilleur film');
      } else {
        setUri(require('../Images/sort_nom.png'));
        setTitle('Trier par nom');
        setStateButton(false);
        sortByNom();
        loadFilms();
      }
    }
  };

  return (
    <View style={styles.main_container}>
      <View style={styles.rowView}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onPressButton}>
          <Image style={styles.image} source={uri} />
        </TouchableOpacity>
      </View>

      <FilmList
        films={films}
        navigation={navigation}
        loadFilms={loadFilms}
        sortFav={sortByRating}
        sortNom={sortByNom}
        page={page}
        totalPages={totalPages}
        favoriteList={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rowView: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  main: {
    flexDirection: 'row-reverse',
    margin: 10,
  },

  image: {
    width: 35,
    height: 35,
  },
  title: {
    fontFamily: 'fantasy',
    fontSize: 18,
    marginLeft: 5,
  },
});
