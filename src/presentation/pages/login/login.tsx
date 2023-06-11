/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';

import {SaveAccessToken} from '../../../domain/protocols/save-access-token';
import {Validation} from '../../protocols/validation';

import {Input, Button} from '../../components';
import {FormStatus} from './components';

import Context from '../../context/form-context';
import axiosHttp from '../../../infrastructure/http/http-client';

type Props = {
  validation: Validation;
  saveAccessToken: SaveAccessToken;
};

type FormFieldType = 'email' | 'password';

const Login: React.FC<Props> = ({saveAccessToken, validation}: Props) => {
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
      await axiosHttp({
        url: '/login',
        method: 'post',
      }).then(async (res: any) => {
        await saveAccessToken.save(res.data.accessToken);
      });
      //TODO: go to next page
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
      <View style={styles.header}>
        <Text style={styles.title}>Login</Text>
      </View>
      <Context.Provider value={{state, setState}}>
        <View style={styles.wrapper}>
          <Input title="Your email" name="email" keyboardType="email-address" />
          <Input title="Type password" name="password" secureTextEntry />
          <Button
            testID="button"
            title="Sign In"
            onPress={handleSubmit}
            disabled={isFormInvalid}
          />
        </View>
        <FormStatus />
      </Context.Provider>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
});
