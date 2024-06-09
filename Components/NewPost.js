import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  UIManager,
} from 'react-native';
import firebase from '../firebase/Firebase';
import database from '@react-native-firebase/database';

export default function NewPost({idFilm}) {
  const [postStatus, setPostStatus] = useState(null);
  const [postText, setPostText] = useState('');
  const [pseudo, setPseudo] = useState('');

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const onUsernameValueChange = (snapshot) => {
      let data = snapshot.val();
      setPseudo(data);
    };

    const user = firebase.auth().currentUser;
    if (user) {
      const uid = user.uid;
      const usernameRef = database()
        .ref('users/' + uid)
        .child('username');
      usernameRef.on('value', onUsernameValueChange);

      return () => {
        usernameRef.off('value', onUsernameValueChange);
      };
    }
  }, []);

  const handleNewPost = () => {
    setPostStatus('Posting...');

    const user = firebase.auth().currentUser;
    if (user) {
      if (postText.length > 15) {
        const time = Date.now();
        const uid = firebase.auth().currentUser.uid;
        const name = pseudo;
        // var value = value;

        const newPostKey = database().ref().child('posts').push().key;

        const postData = {
          film_id: idFilm,
          username: name,
          email: firebase.auth().currentUser.email,
          time: time,
          text: postText,
          puid: newPostKey,
        };
        let updates = {};
        updates['/posts/' + uid + newPostKey] = postData;

        database()
          .ref()
          .update(updates)
          .then(() => {
            setPostStatus('Posté! Merci.');
            setPostText('');
          })
          .catch(() => {
            setPostStatus("Une erreur s'est produite. Veuillez réessayer!!");
          });
      } else {
        setPostStatus('Vous devez poster au moins 15 caractères.');
      }
    } else {
      setPostStatus('Vous devez vous connecter!');
    }

    setTimeout(() => {
      setPostStatus(null);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          multiline={true}
          style={styles.inputField}
          underlineColorAndroid="transparent"
          placeholder="Votre commentaire..."
          placeholderTextColor="#3c4560"
          value={postText}
          onChangeText={setPostText}
        />
      </View>

      <TouchableOpacity style={styles.butnContainer} onPress={handleNewPost}>
        <Text style={styles.butnText}>Envoyer</Text>
      </TouchableOpacity>
      <Text style={styles.message}>{postStatus}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  message: {
    textAlign: 'left',
    paddingBottom: 0,
    color: '#FF6A6A',
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,.6)',

    margin: 5,
    borderColor: '#e2e2e2',
    borderRadius: 15,
    borderWidth: 1,
  },
  inputField: {
    padding: 8,
    textAlignVertical: 'top',
  },
  butnContainer: {
    width: 80,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignSelf: 'flex-end',
  },
  butnText: {
    color: 'dodgerblue',
    fontSize: 12,
    top: 3,
  },
});
