import React, {useContext} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';

import Context from '../../../../context/form-context';

const FormStatus: React.FC = () => {
  const {state} = useContext<any>(Context);

  return (
    <View testID="error-wrapper">
      {state.isLoading && (
        <ActivityIndicator role="spinbutton" testID="spinbutton" />
      )}
      {state.mainError && <Text testID="main-error">{state.mainError}</Text>}
    </View>
  );
};

export default FormStatus;
