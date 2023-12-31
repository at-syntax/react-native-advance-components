const path = require('path');
const pak = require('../package.json');

module.exports = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
    [pak.name]: {
      root: path.join(__dirname, '..'),
    },
  },
};
