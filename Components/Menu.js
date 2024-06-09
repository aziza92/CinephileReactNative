import React, {useEffect, useRef} from 'react';
import {Animated, Image, TouchableOpacity, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {closeMenu} from '../redux/actionsFile';
import styled from 'styled-components/native';
import MenuItem from './MenuItem';

const screenHeight = Dimensions.get('window').height;

export default function Menu() {
  const dispatch = useDispatch();
  const action = useSelector((state) => state.actions.action);
  const translateY = useRef(new Animated.Value(2000)).current;

  useEffect(() => {
    toggleMenu();
  }, [action]);

  const toggleMenu = () => {
    if (action === 'openMenu') {
      Animated.spring(translateY, {
        toValue: 19,
        useNativeDriver: true,
      }).start();
    } else if (action === 'closeMenu') {
      Animated.spring(translateY, {
        toValue: screenHeight,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleMenuClose = () => {
    dispatch(closeMenu());
  };
  return (
    <AnimatedContainer style={{transform: [{translateY}]}}>
      <Cover>
        <Photo source={require('../Images/background1.jpg')} />
        <Title>Menu</Title>
      </Cover>
      <TouchableOpacity
        onPress={handleMenuClose}
        style={{
          position: 'absolute',
          top: 120,
          left: '50%',
          marginLeft: -22,
          zIndex: 1,
        }}>
        <CloseView>
          <Image source={require('../Images/Icon.png')} size={30} />
        </CloseView>
      </TouchableOpacity>
      <Content>
        <MenuItem />
      </Content>
    </AnimatedContainer>
  );
}

const Container = styled.View`
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 142px;
  align-items: center;
  justify-content: center;
`;
const Photo = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: 600;
`;

const Content = styled.View`
  height: 900px;
  background: #f0f3f5;
  padding: 50px;
`;
const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;
