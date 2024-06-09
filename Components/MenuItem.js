import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity, Alert, View} from 'react-native';
import {closeMenu, updateName} from '../redux/actionsFile';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import firebase from '../firebase/Firebase';

export default function MenuItem() {
  const dispatch = useDispatch();

  const handleMenu = () => {
    var user = firebase.auth().currentUser;
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
        Alert.alert('Error', error.message);
      });

    dispatch(closeMenu());
    dispatch(updateName());

    AsyncStorage.clear();
  };

  return (
    <View>
      <Container>
        <IconAcount source={require('../Images/account.png')} />
        <Wrapper>
          <Title>Account</Title>
          <Text>Settings</Text>
        </Wrapper>
      </Container>
      <TouchableOpacity onPress={handleMenu}>
        <Container>
          <Icon source={require('../Images/Logout.png')} />
          <Wrapper>
            <Title> Log out</Title>
            <Text> See you soon!</Text>
          </Wrapper>
        </Container>
      </TouchableOpacity>
    </View>
  );
}

const Container = styled.View`
  flex-direction: row;
  margin: 20px 0;
  margin-top: 40px;
  height: 30px;
  align-items: center;
`;

const Wrapper = styled.View`
  height: 100px;
  padding: 10px;
  margin-top: 10px;
`;

const Icon = styled.Image`
  width: 35px;
  height: 35px;
  color: #546bfb;
  margin-left: 5px;
`;
const IconAcount = styled.Image`
  width: 37px;
  height: 37px;
  color: #546bfb;
  margin-right: 5px;
`;

const Title = styled.Text`
  color: #3c4560;
  font-size: 24px;
  font-weight: 600;
`;

const Text = styled.Text`
  color: #3c4560;
  font-weight: 600;
  opacity: 0.6;
  margin-top: 5px;
`;
