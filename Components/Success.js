import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Animated} from 'react-native';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';

const screenHeight = Dimensions.get('window').height;

export default function Success({isActive = false}) {
  const animation = useRef(null);
  const top = new Animated.Value(0);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    if (isActive) {
      Animated.timing(top, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
      Animated.timing(opacity, {toValue: 1, useNativeDriver: false}).start();

      animation.current.play();
    } else {
      Animated.timing(top, {
        toValue: screenHeight,
        duration: 0,
        useNativeDriver: false,
      }).start();
      Animated.timing(opacity, {
        toValue: 0,
        useNativeDriver: false,
      }).start();

      animation.current.reset();
    }
  }, [isActive]);

  return (
    <AnimatedContainer style={{top: top, opacity: opacity}}>
      <LottieView
        source={require('../Images/lottie-checked-done.json')}
        autoPlay={false}
        loop={true}
        ref={animation}
      />
    </AnimatedContainer>
  );
}

const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);
