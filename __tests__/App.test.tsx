/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test('shows splash then main app', async () => {
  let tree: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(() => {
    tree = ReactTestRenderer.create(<App />);
  });

  expect(tree!.toJSON()).toBeTruthy();

  await ReactTestRenderer.act(() => {
    jest.advanceTimersByTime(3000);
  });

  expect(tree!.toJSON()).toBeTruthy();
});
