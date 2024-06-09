import React, {useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import {Animated, TouchableOpacity, Dimensions} from 'react-native';
import {closeNotif} from '../redux/actionsFile';
import {useDispatch, useSelector} from 'react-redux';
import ChatPage from './ChatPage';

let screenWidth = Dimensions.get('window').width;

export default function Notifications() {
  const translateY = useRef(new Animated.Value(3000)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  // const top = useRef(new Animated.Value(3000)).current;

  const action = useSelector((state) => state.actions.action);
  const dispatch = useDispatch();

  const toggleNotif = () => {
    if (action === 'openNotif') {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }

    if (action === 'closeNotif') {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 30,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 3000,
          duration: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  useEffect(() => {
    toggleNotif();
  }, [action]);

  const handleCloseNotif = () => {
    dispatch(closeNotif());
  };

  return (
    <AnimatedContainer style={{transform: [{translateY}]}}>
      <TouchableOpacity
        onPress={handleCloseNotif}
        style={{
          position: 'absolute',
          top: 40,
          left: '50%',
          marginLeft: -22,
          zIndex: 100,
        }}>
        <CloseButton
          style={{
            shadowColor: 'black',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            elevation: 20,
          }}>
          <Icon source={require('../Images/cancel.png')} />
        </CloseButton>
      </TouchableOpacity>

      <ChatPage />
    </AnimatedContainer>
  );
}

const Container = styled.View`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: #f0f3f5;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);
const CloseButton = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;
const Icon = styled.Image`
  width: 34px;
  height: 34px;
`;
