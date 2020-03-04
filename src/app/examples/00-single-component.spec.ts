import { render, screen } from '@testing-library/angular';

import { SingleComponent } from './00-single-component';

test('renders the current value and can increment and decrement', async () => {
  const { click } = await render(SingleComponent);

  const incrementControl = screen.getByText('Increment');
  const decrementControl = screen.getByText('Decrement');
  const valueControl = screen.getByTestId('value');

  expect(valueControl.textContent).toBe('0');

  click(incrementControl);
  click(incrementControl);
  expect(valueControl.textContent).toBe('2');

  click(decrementControl);
  expect(valueControl.textContent).toBe('1');
});
