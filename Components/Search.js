import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {
  getFilmsFromApiWithSearchedText,
  getFilmsSortedByGenreActionFromApi,
  getFilmsSortedByGenreHorrorFromApi,
} from '../API/TMDBApi';
import {
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import FilmList from './FilmList';

export default function Search({navigation}) {
  const [searchedText, setSearchedText] = useState('');
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uri, setUri] = useState(require('../Images/action.png'));
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [press, setPress] = useState(false);
  const incompletSearch = !searchedText;

  useEffect(() => {
    loadFilms();
  }, []);

  const loadFilms = () => {
    if (searchedText.length > 0) {
      setIsLoading(true);
      getFilmsFromApiWithSearchedText(searchedText, page + 1).then((data) => {
        setPage(data.page);
        setTotalPages(data.total_pages);
        setFilms((prevFilms) => [...prevFilms, ...data.results]);
        setIsLoading(false);
      });
    }
  };

  const searchTextInputChanged = (text) => {
    setSearchedText(text);
  };

  const searchFilms = () => {
    setPage(0);
    setTotalPages(0);
    setFilms([]);
    loadFilms();
    Keyboard.dismiss();
  };

  // const displayDetailForFilm = (idFilm) => {
  //   //console.log('Display film with id ' + idFilm);
  //   navigation.navigate('Detail', {idFilm: idFilm});
  // };

  const displayLoading = () => {
    if (isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  };

  const actionGenre = () => {
    getFilmsSortedByGenreActionFromApi(page + 1).then((data) => {
      setPage(data.page);
      setTotalPages(data.total_pages);
      setFilms((prevFilms) => [...prevFilms, ...data.results]);
    });
  };

  const horrorGenre = () => {
    getFilmsSortedByGenreHorrorFromApi(page + 1).then((data) => {
      setPage(data.page);
      setTotalPages(data.total_pages);
      setFilms((prevFilms) => [...prevFilms, ...data.results]);
    });
  };

  const onPressImage = () => {
    if (press === false) {
      setFilms([]);
      setUri(require('../Images/horror.png'));
      setPress(true);
      horrorGenre();
    } else {
      setFilms([]);
      setUri(require('../Images/action.png'));
      setPress(false);
      actionGenre();
    }
  };

  return (
    <SafeAreaView style={styles.main_container}>
      <View style={styles.main}>
        <TextAreaContainer>
          <Input
            placeholder="Titre du film"
            placeholderTextColor="#3c4560"
            underlineColorAndroid="transparent"
            onChangeText={searchTextInputChanged}
            onSubmitEditing={searchFilms}
          />
          <TouchableOpacity onPress={searchFilms} style={{margin: 5}}>
            <Text style={{color: incompletSearch ? '#3c4560' : '#1E90FF'}}>
              Rechercher
            </Text>
          </TouchableOpacity>
        </TextAreaContainer>

        <TouchableOpacity onPress={onPressImage}>
          <Image style={styles.image} source={uri} />
        </TouchableOpacity>
      </View>

      <FilmList
        films={films}
        navigation={navigation}
        loadFilms={loadFilms}
        actionGenre={actionGenre}
        horrorGenre={horrorGenre}
        page={page}
        totalPages={totalPages}
        favoriteList={false}
      />
      {displayLoading()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: 'white',
  },

  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flexDirection: 'row',
    margin: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main_text: {
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
  },
  images: {
    width: 35,
    height: 35,
    marginTop: 10,
  },

  buttonStyle: {
    backgroundColor: 'blue',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 15,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
});

const TextAreaContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin: 5px;
  border-radius: 15px;
  border: 2px;
  padding: 5px;
  border-color: #f2f2f2;
`;
const Input = styled.TextInput`
  flex: 2;
  padding-left: 10px;
`;
