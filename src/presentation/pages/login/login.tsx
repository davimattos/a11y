/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
  Button,
  Text,
} from 'react-native';

import {Authentication} from '../../../domain/protocols/authentication';
import {SaveAccessToken} from '../../../domain/protocols/save-access-token';
import {Validation} from '../../protocols/validation';

import Context from '../../context/form-context';
import Input from '../../components/input/input';

type Props = {
  validation: Validation;
  saveAccessToken: SaveAccessToken;
  authentication: Authentication;
};

type FormFieldType = 'email' | 'password';

const Login: React.FC<Props> = ({
  saveAccessToken,
  authentication,
  validation,
}: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    mainError: '',
  });

  const validate = (field: FormFieldType): void => {
    setState((oldState: any) => ({
      ...oldState,
      [`${field}Error`]: validation.validate(field, {[field]: state[field]}),
    }));
  };

  useEffect(() => validate('email'), [state.email]);
  useEffect(() => validate('password'), [state.password]);

  const isFormInvalid = useMemo(() => {
    return !!state.emailError || !!state.passwordError;
  }, [state.emailError, state.passwordError]);

  const handleSubmit = async () => {
    try {
      if (state.isLoading || isFormInvalid) {
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
