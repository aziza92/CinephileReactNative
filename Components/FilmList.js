import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import FilmItem from './FilmItem';

export default function FilmList({loadFilms, films, page, totalPages}) {
  const favoris = useSelector((state) => state.favorisFilm);

  return (
    <FlatList
      style={styles.list}
      data={films}
      extraData={favoris}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <FilmItem
          film={item}
          isFilmFavorite={
            favoris.findIndex((film) => film.id === item.id) !== -1
              ? true
              : false
          }
        />
      )}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (page < totalPages) {
          loadFilms();
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
