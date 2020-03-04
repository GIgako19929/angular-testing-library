import { ReactiveFormsModule } from '@angular/forms';
import { render, screen } from '@testing-library/angular';

import { MaterialModule } from '../material.module';
import { MaterialFormsComponent } from './04-forms-with-material';

test('is possible to fill in a form and verify error messages (with the help of jest-dom https://testing-library.com/docs/ecosystem-jest-dom)', async () => {
  const { type, selectOptions, fixture } = await render(MaterialFormsComponent, {
    imports: [ReactiveFormsModule, MaterialModule],
  });

  const nameControl = screen.getByPlaceholderText('Name');
  const scoreControl = screen.getByPlaceholderText(/score/i);
  const colorControl = screen.getByPlaceholderText('color', { exact: false });
  const errors = screen.getByRole('alert');

  expect(errors).toContainElement(screen.queryByText('name is required'));
  expect(errors).toContainElement(screen.queryByText('score must be greater than 1'));
  expect(errors).toContainElement(screen.queryByText('color is required'));

  type(nameControl, 'Tim');
  type(scoreControl, 12);
  selectOptions(colorControl, 'Green');

  expect(screen.queryByText('name is required')).not.toBeInTheDocument();
  expect(screen.queryByText('score must be lesser than 10')).toBeInTheDocument();
  expect(screen.queryByText('color is required')).not.toBeInTheDocument();

  expect(scoreControl).toBeInvalid();
  type(scoreControl, 7);
  expect(scoreControl).toBeValid();

  expect(errors).not.toBeInTheDocument();

  expect(nameControl).toHaveValue('Tim');
  expect(scoreControl).toHaveValue(7);

  const form = screen.getByTestId('my-form');
  expect(form).toHaveFormValues({
    name: 'Tim',
    score: 7,
  });

  // not added to the form?
  expect((fixture.componentInstance as MaterialFormsComponent).form.get('color').value).toBe('G');
});
