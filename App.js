import {useEffect} from 'react';

import {Navigation} from 'react-native-navigation';

import Hello from './src/screens/Hello';
import Main from './src/screens/Main';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import OTP from './src/screens/OTP';
import Home from './src/screens/Home';

Navigation.registerComponent('Hello', () => Hello);
Navigation.registerComponent('Main', () => Main);
Navigation.registerComponent('Register', () => Register);
Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('OTP', () => OTP);
Navigation.registerComponent('Home', () => Home);

const App = () => {
  useEffect(() => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'Hello',
              },
            },
          ],
        },
      },
    });
  }, []);
  return null;
};

export default App;
