import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const App = ({testID}: {testID?: string}) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    if (count === 10) {
      return;
    }
    setCount(count + 1);
  };

  const decrement = () => {
    if (count === 0) {
      return;
    }
    setCount(count - 1);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.wrapper} testID={testID}>
        <Text
          accessibilityLabel="Count value"
          accessibilityHint="The value of the count">
          {count}
        </Text>

        <TouchableOpacity
          accessible
          style={{width: 100, height: 40, borderColor: 'black', borderWidth: 1}}
          accessibilityState={{disabled: count === 10 ? true : false}}
          accessibilityRole="button"
          accessibilityLabel="Count increment"
          accessibilityHint="Press to increment this counter"
          onPress={() => increment()}>
          <Text>Increment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessible
          disabled={true}
          accessibilityState={{disabled: count === 0 ? true : false}}
          accessibilityLabel="Count decrement"
          accessibilityHint="Press to decrement this counter"
          accessibilityRole="button"
          onPress={() => decrement()}>
          <Text>Decrement</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;

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
