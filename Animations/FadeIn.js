import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions} from 'react-native';

export default function FadeIn({children}) {
  const positionTop = useRef(
    new Animated.Value(Dimensions.get('window').width),
  ).current;

  useEffect(() => {
    Animated.spring(positionTop, {
      toValue: 0,
      duration: 20000,
      useNativeDriver: true,
    }).start();
  }, [positionTop]);

  return (
    <Animated.View style={{transform: [{translateY: positionTop}]}}>
      {children}
    </Animated.View>
  );
}
