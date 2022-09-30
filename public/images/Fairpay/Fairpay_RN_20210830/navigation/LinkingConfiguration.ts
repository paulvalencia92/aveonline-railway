// import * as Linking from 'expo-linking';

export default {
  // prefixes: [Linking.('/')],
  config: {
    screens: {
      Auth: {
        screens: {
          Login: 'login',
          Profile: 'profile',
        },
      },
      Main: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
