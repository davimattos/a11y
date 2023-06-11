import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

type Props = {title: string} & TouchableOpacityProps;

const Button = (props: Props) => {
  return (
    <View style={styles().wrapper}>
      <TouchableOpacity {...props} style={styles(props.disabled).button}>
        <Text style={styles().title}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = (disabled?: boolean) =>
  StyleSheet.create({
    wrapper: {
      paddingTop: 30,
    },
    button: {
      minWidth: 350,
      height: 45,
      borderRadius: 6,
      backgroundColor: '#75a',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      opacity: disabled ? 0.5 : 1,
    },
    title: {
      fontSize: 16,
      color: '#fff',
    },
  });
