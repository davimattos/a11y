import React, {useContext} from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';

import Context from '../../context/form-context';

type Props = {name: string; title: string} & TextInputProps;

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
      <Text>{props.title}</Text>
      <TextInput
        style={styles.input}
        testID={props.name}
        {...props}
        onChangeText={handleChange}
      />
      <Text testID={`${props.name}-status`} style={styles.error}>
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
    minWidth: 250,
    height: 45,
    borderColor: '#000',
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
  },
});
