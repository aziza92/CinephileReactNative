import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import styled from 'styled-components/native';

export default function ChatPage() {
  const [pseudo, setPseudo] = useState('');
  const [user, setUser] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const messagesRef = database().ref('/messages');
  const incompletMsg = !inputText;

  // Get User
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        setUser(userId);
        database()
          .ref(`/users/${userId}/username`)
          .once('value', (snapshot) => {
            const data = snapshot.val();
            setPseudo(data);
          });
      }
    });

    return () => {
      messagesRef.off();
    };
  }, []);

  useEffect(() => {
    const loadMessages = () => {
      return messagesRef
        .orderByChild('createdAt')
        .limitToLast(15)
        .on('child_added', (snapshot) => {
          const message = snapshot.val();
          const newMessage = {
            _id: snapshot.key,
            text: message.text,
            createdAt: new Date(message.createdAt),
            user: {
              _id: message.user._id,
              name: message.user.name,
            },
          };
          //setMessages((previousMessages) => [newMessage, ...previousMessages]);
          setMessages((previousMessages) => [...previousMessages, newMessage]);
        });
    };

    const unsubscribe = loadMessages();

    return () => {
      messagesRef.off('child_added', unsubscribe);
    };
  }, []);

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      const timestamp = new Date().toISOString();
      const newMessage = {
        _id: messagesRef.push().key,
        text: inputText,
        createdAt: new Date(),

        user: {
          _id: user,
          name: pseudo,
        },
      };

      messagesRef.child(newMessage._id).set({
        text: newMessage.text,
        user: newMessage.user,
        createdAt: timestamp,
      });

      setInputText('');
    }
  };

  const tapBackground = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={10}>
        {/*  Messages*/}
        <TouchableWithoutFeedback onPress={tapBackground}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={messages}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({item, index}) =>
              item.user._id === user ? (
                <SenderMessage key={item._id.toString()} message={item} />
              ) : (
                <ReceiverMessage key={item._id.toString()} message={item} />
              )
            }
          />
        </TouchableWithoutFeedback>
        {/*  Messages*/}

        {/* Send a Message*/}
        <TextAreaContainer>
          <Input
            multiline={true}
            numberOfLines={5}
            underlineColorAndroid="transparent"
            textAlignVertical="center"
            placeholder="Rédiger un message..."
            placeholderTextColor="#3c4560"
            defaultValue={inputText}
            onChangeText={setInputText}
            onSubmitEditing={sendMessage}
          />

          <TouchableOpacity style={styles.sendMessage} onPress={sendMessage}>
            <Text style={{color: incompletMsg ? '#3c4560' : '#1E90FF'}}>
              Envoyer
            </Text>
          </TouchableOpacity>
        </TextAreaContainer>
        {/* End of Send a Message*/}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function ReceiverMessage({message}) {
  return (
    <Container>
      <Message>{message.text}</Message>
      <Text style={styles.text}>~{message.user.name}</Text>
    </Container>
  );
}
function SenderMessage({message}) {
  return (
    <ContainerSender>
      <MessageSender>{message.text}</MessageSender>
    </ContainerSender>
  );
}

const styles = StyleSheet.create({
  sendMessage: {
    margin: 5,
  },
  text: {
    color: 'gray',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

const TextAreaContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin: 15px;
  border-radius: 15px;
  border: 2px;
  padding: 5px;
  border-color: #f2f2f2;
`;

const Input = styled.TextInput`
  flex: 2;
  padding-left: 10px;
`;

const ContainerSender = styled.View`
  background-color: #1e90ff;
  padding: 5px;
  align-self: flex-start;
  margin-left: auto;
  margin-right: 10px;
  margin-top: 5px;
  border-top-right-radius: 0px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const MessageSender = styled.Text`
  color: white;
  font-size: 17px;
  font-weight: 300;
  font-style: italic;
`;
const Container = styled.View`
  background-color: #ebebeb;
  padding: 5px;
  align-self: flex-start;
  margin-right: auto;
  margin-left: 10px;
  margin-top: 5px;
  border-top-right-radius: 10px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Message = styled.Text`
  color: #3c4560;
  font-size: 17px;
  font-weight: 300;
  font-style: italic;
`;
const Avatar = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 80px;
  background-color: red;
`;
