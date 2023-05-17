import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
  Button,
  Text,
} from 'react-native';

import Context from '../../context/form-context';
import Input from '../../components/input/input';
import {Authentication} from '../../../domain/protocols/authentication';
import {SaveAccessToken} from '../../../domain/protocols/save-access-token';

type Props = {
  saveAccessToken: SaveAccessToken;
  authentication: Authentication;
};

const Login: React.FC<Props> = ({saveAccessToken, authentication}: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    mainError: '',
  });

  const handleSubmit = async () => {
    try {
      if (state.isLoading) {
        return;
      }
      setState({...state, isLoading: true});
      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });
      await saveAccessToken.save(account.accessToken);
    } catch (error: any) {
      setState((old: any) => ({
        ...old,
        isLoading: false,
        mainError: error.message,
      }));
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Context.Provider value={{state, setState}}>
        <View style={styles.wrapper}>
          <Input name="email" keyboardType="email-address" />
          <Input name="password" secureTextEntry />
          <Button title="Sign In" onPress={handleSubmit} />
          <Text>{state.mainError}</Text>
        </View>
        {state.isLoading && <ActivityIndicator />}
      </Context.Provider>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
});
