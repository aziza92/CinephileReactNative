import React, {useState, useEffect} from 'react';
import {Animated} from 'react-native';

const EnlargeShrink = ({shouldEnlarge, children}) => {
  const [viewSize, setViewSize] = useState(new Animated.Value(_getSize()));

  useEffect(() => {
    Animated.spring(viewSize, {
      toValue: _getSize(),
      useNativeDriver: false,
    }).start();
  }, [shouldEnlarge]);

  function _getSize() {
    if (shouldEnlarge) {
      return 80;
    }
    return 40;
  }

  return (
    <Animated.View style={{width: viewSize, height: viewSize}}>
      {children}
    </Animated.View>
  );
};

export default EnlargeShrink;
