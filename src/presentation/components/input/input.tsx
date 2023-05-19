import React, {useContext} from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';

import Context from '../../context/form-context';

type Props = {name: string} & TextInputProps;

const Input = (props: Props) => {
  const {state, setState} = useContext(Context);
  const error = state[`${props.name}Error`];

  const handleChange = (value: string): void => {
    setState({
      ...state,
      [props.name]: value,
    });
  };

  return (
    <View style={styles.wrapper}>
      <Text>{props.name}</Text>
      <TextInput
        style={styles.input}
        testID={props.name}
        {...props}
        onChangeText={handleChange}
      />
      <Text testID='"main-error"' style={styles.error}>
        {error}
      </Text>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 10,
  },
  input: {
    minWidth: 150,
    height: 45,
    borderColor: '#000',
    borderWidth: StyleSheet.hairlineWidth,
  },
  error: {
    color: 'red',
  },
});
