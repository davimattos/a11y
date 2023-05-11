import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import Counter from './counter';

import '@testing-library/jest-native/extend-expect';

describe('Counter', () => {
  test('Should start with the intial state', () => {
    const {getByLabelText, getByTestId} = render(<Counter testID="counter" />);
    const countText = getByLabelText(/count value/i);
    const counter = getByTestId('counter');

    expect(counter.children.length).toBe(3);
    expect(countText.children[0]).toBe('0');
  });

  test('Should increment of the count', () => {
    const {getByRole, getByLabelText} = render(<Counter />);
    const countText = getByLabelText(/count value/i);

    const incrementButton = getByRole('button', {name: /increment/i});
    expect(incrementButton).not.toBeDisabled();
    fireEvent.press(incrementButton);
    expect(countText.children[0]).toBe('1');
  });

  test('Should disabled when count is equal zero', () => {
    const {getByRole} = render(<Counter />);

    const decrementButton = getByRole('button', {name: /decrement/i});
    fireEvent.press(decrementButton);
    expect(decrementButton).toHaveAccessibilityState({disabled: true});
    expect(decrementButton).toBeDisabled();
  });

  test('Should incrementButton has the accessibles parameters', () => {
    const {getByRole} = render(<Counter />);

    const decrementButton = getByRole('button', {name: /increment/i});
    expect(decrementButton.props.accessibilityLabel).toBe('Count increment');
    expect(decrementButton.props.accessibilityHint).toBe(
      'Press to increment this counter',
    );
  });
});
