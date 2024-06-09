import React, {useState, useEffect, useRef} from 'react';
import {
  PanResponder,
  Animated,
  StyleSheet,
  ActivityIndicator,
  View,
  Alert,
} from 'react-native';
import {getNewFilmFromApi} from '../API/TMDBApi';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import Project from './Project';

export default function Card() {
  const action = useSelector((state) => state.actions.action);
  const [projects, setProjects] = useState([
    {title: '', date: '', image: ''},
    {title: '', date: '', image: ''},
    {title: '', date: '', image: ''},
    {title: '', date: '', image: ''},
    {title: '', date: '', image: ''},
  ]);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const translateY = useRef(new Animated.Value(44)).current;
  const thirdScale = useRef(new Animated.Value(0.8)).current;
  const thirdTranslateY = useRef(new Animated.Value(-50)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const LENGTH = 5;

  const getNextIndex = (index) => {
    var nextIndex = index + 1;
    if (nextIndex > LENGTH - 1) {
      return 0;
    }
    return nextIndex;
  };

  const _panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        if (gestureState.dx === 0 && gestureState.dy === 0) {
          return false;
        } else {
          if (action === 'openCard') {
            return false;
          } else {
            return true;
          }
        }
      },
      onPanResponderGrant: () => {
        Animated.spring(scale, {toValue: 1, useNativeDriver: true}).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.spring(thirdScale, {
          toValue: 0.9,
          useNativeDriver: true,
        }).start();
        Animated.spring(thirdTranslateY, {
          toValue: 44,
          useNativeDriver: true,
        }).start();
        Animated.timing(opacity, {toValue: 1, useNativeDriver: true}).start();
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),

      onPanResponderRelease: () => {
        const positionX = pan.x.__getValue();
        const positionY = pan.y.__getValue();

        Animated.timing(opacity, {
          toValue: 0,
          useNativeDriver: true,
        }).start();

        if (Math.abs(positionX) > 200) {
          // Swiped left or right
          const newX = positionX > 0 ? 1000 : -1000;
          Animated.timing(pan, {
            toValue: {x: newX, y: 0},
            useNativeDriver: true,
          }).start(({finished}) => {
            if (finished) {
              pan.setValue({x: 0, y: 0});
              scale.setValue(0.9);
              translateY.setValue(44);
              thirdScale.setValue(0.8);
              thirdTranslateY.setValue(-50);

              setIndex((currentIndex) => {
                const nextIndex = getNextIndex(currentIndex);
                return nextIndex;
              });
            }
          });
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: true,
          }).start();
          Animated.spring(scale, {toValue: 0.9, useNativeDriver: true}).start();
          Animated.spring(translateY, {
            toValue: 44,
            useNativeDriver: true,
          }).start();
          Animated.spring(thirdScale, {
            toValue: 0.8,
            useNativeDriver: true,
          }).start();
          Animated.spring(thirdTranslateY, {
            toValue: -50,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const handleResponse = (data) => {
    
    if (data && data.results) {
      const newProjects = data.results.slice(0, 5).map(film => ({
        title: film.title,
        image: film.poster_path,
        date: film.release_date,
        desc: film.overview,
      }));

      setProjects(newProjects);
    } else {
      Alert.alert("Erreur", "Aucun résultat trouvé.");
    }
  };

    // Handle error
    const handleError = (err) => {
      Alert.alert(err.message);
    };
  
    useEffect(() => {
      setIsLoading(true);
      getNewFilmFromApi()
        .then((data) => {
          handleResponse(data);
          setIsLoading(false);
          //console.log(data)
        })
        .catch((error) => {
          handleError(error);
          setIsLoading(false);
        });
    }, []);

  const displayLoading = () => {
    if (isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  };

  return (
    <Container>
      {displayLoading()}
      <AnimatedMask style={{opacity}} />
      <Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        }}
        {..._panResponder.panHandlers}>
        <Project
          title={projects[index].title}
          image={projects[index].image}
          date={projects[index].date}
          desc={projects[index].desc}
          canOpen={true}
        />
      </Animated.View>

      <Animated.View
        style={{
          top: 230,
          left: 0,
          zIndex: -1,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{scale: scale}, {translateY: translateY}],
        }}>
        <Project
          title={projects[(index + 1) % projects.length].title}
          image={projects[(index + 1) % projects.length].image}
          date={projects[(index + 1) % projects.length].date}
          desc={projects[(index + 1) % projects.length].desc}
          canOpen={false}
        />
      </Animated.View>

      <Animated.View
        style={{
          top: 240,
          left: 0,
          zIndex: -2,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{scale: thirdScale}, {translateY: thirdTranslateY}],
        }}>
        <Project
          title={projects[(index + 2) % projects.length].title}
          image={projects[(index + 2) % projects.length].image}
          date={projects[(index + 2) % projects.length].date}
          desc={projects[(index + 2) % projects.length].desc}
          canOpen={false}
        />
      </Animated.View>
      <Animated.View
        style={{
          top: 240,
          left: 0,
          zIndex: -3,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{scale: thirdScale}, {translateY: thirdTranslateY}],
        }}>
        <Project
          title={projects[(index + 3) % projects.length].title}
          image={projects[(index + 3) % projects.length].image}
          date={projects[(index + 3) % projects.length].date}
          desc={projects[(index + 3) % projects.length].desc}
          canOpen={false}
        />
      </Animated.View>
      <Animated.View
        style={{
          top: 250,
          left: 0,
          zIndex: -4,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{scale: thirdScale}, {translateY: thirdTranslateY}],
        }}>
        <Project
          title={projects[(index + 4) % projects.length].title}
          image={projects[(index + 4) % projects.length].image}
          date={projects[(index + 4) % projects.length].date}
          desc={projects[(index + 4) % projects.length].desc}
          canOpen={false}
        />
      </Animated.View>
    </Container>
  );
}

const Mask = styled.View`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: -3;
`;

const AnimatedMask = Animated.createAnimatedComponent(Mask);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #f0f3f5;
  margin-top: 40px;
`;

const styles = StyleSheet.create({
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
