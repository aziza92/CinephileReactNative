import React, {useEffect, useRef} from 'react';
import {TouchableOpacity, Animated, Easing, Alert} from 'react-native';
import {openMenu, openLogin, openNotif} from '../redux/actionsFile';
import {SafeAreaView} from 'react-native-safe-area-context';
import NotificationButton from './NotificationButton';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import Notifications from './Notifications';
import ModalLogin from './ModalLogin';
import Card from './Card';
import Menu from './Menu';

export default function HomeScreen() {
  const action = useSelector((state) => state.actions.action);
  const name = useSelector((state) => state.actions.name);
  const dispatch = useDispatch();
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const toggleMenu = () => {
    if (action === 'openMenu') {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 300,
          easing: Easing.in(),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (action === 'closeMenu') {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  useEffect(() => {
    toggleMenu();
  }, [action]);

  const handleAvatar = () => {
    if (name) {
      dispatch(openMenu());
    } else {
      dispatch(openLogin());
    }
  };

  const handleNotif = () => {
    dispatch(openNotif());
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {action === 'openMenu' && <Menu />}

      {action === 'openNotif' && <Notifications />}

      <AnimatedContainer>
        <TitleBar>
          {/*Avatar */}
          <TouchableOpacity
            onPress={handleAvatar}
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
            }}>
            <Avatar source={require('../Images/avatar.jpg')} />
          </TouchableOpacity>

          <Title> Bonjour ! </Title>
          <Text>{name}</Text>
          {/*Avatar */}

          {/*Chat */}
          <TouchableOpacity
            onPress={() => {
              if (name) {
                return handleNotif();
              } else {
                Alert.alert("Veuillez vous connecter afin d'accéder au chat !");
              }
            }}
            style={{position: 'absolute', right: 20, top: 5}}>
            <NotificationButton />
          </TouchableOpacity>
          {/*Chat */}
        </TitleBar>

        <Animated.View>
          <Card />
        </Animated.View>
      </AnimatedContainer>
      {action === 'openLogin' && <ModalLogin />}
    </SafeAreaView>
  );
}

const Container = styled.View``;
const AnimatedContainer = Animated.createAnimatedComponent(Container);
const TitleBar = styled.View`
  width: 100%;
  margin-top: 15px;
  padding-left: 80px;
`;
const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 22px;
  margin-left: 20px;
  position: relative;
  top: 0;
  left: 0;
`;
const Title = styled.Text`
  font-size: 16px;
  top: 7px;
  color: #b8bece;
  font-weight: 500;
`;

const Text = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
  top: 7px;
`;
