import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  Platform,
  UIManager,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import database from '@react-native-firebase/database';
import PostDesign from './PostDesign';
import firebase from '../firebase/Firebase';
import moment from 'moment';
import _ from 'lodash';

export default function GetPosts({identifier}) {
  const [posts, setPosts] = useState([]);
  const [postsCount, setPostsCount] = useState(0);

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const fetchPosts = () => {
      database()
        .ref('/posts/')
        .orderByKey()
        .on('value', (snapshot) => {
          const postsData = [];
          snapshot.forEach((el) => {
            if (el.val().film_id == identifier) {
              postsData.push({
                email: el.val().email,
                puid: el.val().puid,
                username: el.val().username,
                time: el.val().time,
                text: el.val().text,
              });
            }
          });

          const uniquePostsData = _.uniqBy(postsData, 'puid');
          setPosts(uniquePostsData);
          setPostsCount(uniquePostsData.length);
        });
    };

    fetchPosts();

    return () => {
      database().ref('/posts/').off();
    };
  }, [identifier]);

  const handleDelete = (puid) => {
    const user = firebase.auth().currentUser;
    if (user) {
      const email = firebase.auth().currentUser.email;
      let user_email = database().ref('/posts');

      user_email.once('value').then((snapshot) => {
        snapshot.forEach((el) => {
          if (email === el.val().email && puid === el.val().puid) {
            Alert.alert(
              'Supprimer le message',
              'Are you sure to delete the post?',
              [
                {text: 'Oui', onPress: () => deleteConfirmed(puid)},
                {text: 'Non'},
              ],
            );
          }
        });
      });
    }
  };

  const deleteConfirmed = (puid) => {
    const uid = firebase.auth().currentUser.uid;
    database()
      .ref('/posts/' + uid + puid)
      .remove();
    setPosts((prevPosts) => prevPosts.filter((post) => post.puid !== puid));
  };

  const renderPosts = () => {
    const postArray = [];
    _.forEach(posts, (value, index) => {
      const time = value.time;
      const timeString = moment(time).fromNow();
      postArray.push(
        <TouchableOpacity
          onLongPress={() => handleDelete(value.puid)}
          key={index}>
          <PostDesign
            posterName={value.username}
            postTime={timeString}
            postContent={value.text}
          />
        </TouchableOpacity>,
      );
    });
    _.reverse(postArray);
    return postArray;
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileInfoContainer}>
        <View style={styles.profileNameContainer}>
          {posts ? (
            <Text style={styles.profileName}>{posts.username}</Text>
          ) : null}
        </View>
        <View style={styles.profileCountsContainer}>
          <Text style={styles.profileCounts}>{postsCount}</Text>
          <Text style={styles.countsName}>POSTS</Text>
        </View>
      </View>
      <ScrollView styles={styles.container}>{renderPosts()}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    height: 65,
    borderRadius: 20,
  },
  profileNameContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  profileName: {
    marginLeft: 20,

    fontSize: 20,
    color: '#ffffff',
  },
  profileCountsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCounts: {
    fontSize: 25,
    color: 'gray',
  },
  countsName: {
    fontSize: 12,
    color: 'gray',
  },
});
