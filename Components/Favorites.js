import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import FilmList from './FilmList';
import {useDispatch, useSelector} from 'react-redux';
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi';

export default function Favorites({navigation}) {
  const dispatch = useDispatch();
  const favoritesFilm = useSelector((state) => state.favorisFilm);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(0);

  const favFilm = () => {
    getFilmsFromApiWithSearchedText(search, page + 1).then((data) => {
      setPage(data.page);
      setTotalPages(data.total_pages);
      setFilms((prevFilms) => [...prevFilms, ...data.results]);
    });
  };

  useEffect(() => {
    favFilm();
  }, []);

  return (
    <SafeAreaView style={styles.main_container}>
      <View style={styles.main}>
        <Text style={styles.text}> Mes films préférés ❤️ </Text>
      </View>

      <FilmList
        data={films}
        films={favoritesFilm}
        navigation={navigation}
        favFilm={favFilm}
        favoriteList={true}
        page={page}
        totalPages={totalPages}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: 'white',
  },
  main: {
    alignSelf: 'center',
    margin: 12,
  },
  text: {
    fontSize: 17,
    fontWeight: '400',
    fontStyle: 'italic',
  },
  image: {
    width: 35,
    height: 35,
    marginTop: 10,
  },
});
