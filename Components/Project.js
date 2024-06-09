import React, {useState} from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {openCard, closeCard} from '../redux/actionsFile';
import {getImageFromApi} from '../API/TMDBApi';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const tabBarHeight = 83;

export default function Project(props) {
  const dispatch = useDispatch();
  const [cardWidth] = useState(new Animated.Value(315));
  const [cardHeight] = useState(new Animated.Value(460));

  const [titleTop] = useState(new Animated.Value(20));
  const [opacity] = useState(new Animated.Value(0));
  const [textHeight] = useState(new Animated.Value(132));

  const openCardFunction = () => {
    if (!props.canOpen) return;

    Animated.timing(cardWidth, {
      toValue: screenWidth,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(cardHeight, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(titleTop, {
      toValue: 40,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(textHeight, {
      toValue: 1000,
      duration: 300,
      useNativeDriver: false,
    }).start();

    StatusBar.setHidden(true);
    dispatch(openCard());
  };



  const closeCardFunction = () => {
    Animated.timing(cardWidth, {
      toValue: 315,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(cardHeight, {
      toValue: 460,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(titleTop, {
      toValue: 20,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(textHeight, {
      toValue: 132,
      duration: 300,
      useNativeDriver: false,
    }).start();
  
    StatusBar.setHidden(false);
    dispatch(closeCard());
  };

  return (
    <TouchableWithoutFeedback style={{flex: 1}} onPress={openCardFunction}>
      <AnimatedContainer
        style={{
          width: cardWidth,
          height: cardHeight,
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 2,
          elevation: 20,
        }}>
        <Cover>
          <Image source={{uri: getImageFromApi(props.image)}} />
          <AnimatedTitle style={{top: titleTop}}>{props.title}</AnimatedTitle>
          <Date>{props.date}</Date>
        </Cover>
        <ScrollView>
          <AnimatedText style={{height: textHeight}}>{props.desc}</AnimatedText>
        </ScrollView>

        <TouchableOpacity
          onPress={closeCardFunction}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            padding: 10, // Add padding to increase touchable area

          }}>
          <AnimatedCloseView style={{opacity: opacity}}>
            <Icon source={require('../Images/cancel.png')} />
          </AnimatedCloseView>
        </TouchableOpacity>
      </AnimatedContainer>
    </TouchableWithoutFeedback>
  );
}

const Icon = styled.Image`
  width: 35px;
  height: 35px;
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

const AnimatedCloseView = Animated.createAnimatedComponent(CloseView);

const Container = styled.View`
  width: 315px;
  height: 460px;
  border-radius: 14px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  border-color: black;
  border-width: 0.5px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 290px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 290px;
`;

const Title = styled.Text`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  width: 300px;
  font-family: fantasy;
`;
const AnimatedTitle = Animated.createAnimatedComponent(Title);

const Date = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Text = styled.Text`
  font-size: 17px;
  margin: 20px;
  line-height: 22px;
  color: #3c4560;
  font-family: fantasy;
  text-align: justify;
`;
const AnimatedText = Animated.createAnimatedComponent(Text);
