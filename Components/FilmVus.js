import React from 'react';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import FilmImage from './FilmImage';

export default function FilmVus() {
  const vusFilm = useSelector((state) => state.filmVus.vusFilm);

  return (
    <SafeAreaView style={styles.list}>
      <View style={styles.main}>
        <Text style={styles.text}> Mes films Vus 👁️ </Text>
      </View>

      <FlatList
        data={vusFilm}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <FilmImage
            film={item}
            isFilmvus={
              vusFilm.findIndex((film) => film.id === item.id) !== -1
                ? true
                : false
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
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
});
