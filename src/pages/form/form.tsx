import React, {memo, useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView, TextInput} from 'react-native';

const Form = ({testID}: {testID?: string}) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.wrapper} testID={testID}>
        <Text>Name</Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={value => setName(value)}
        />

        <Text>LastName</Text>

        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={value => setLastName(value)}
        />
      </View>

      <Welcome name={name} />
    </SafeAreaView>
  );
};

const Welcome = memo(({name}: {name: string}) => {
  console.log('rendering the component...');
  return <Text>{`Hello ${name}`}</Text>;
});

export default Form;

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
  input: {
    minWidth: 150,
    height: 45,
    borderColor: '#000',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
