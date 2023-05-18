import React from 'react';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo from './Todo';

describe('component test on todo', () => {
  const mockTodo = {
    _id: '1235Abcd#@$5sdfk',
    text: 'This is a mock todo.',
    done: false
  }

  const mockClickDelete = jest.fn();
  const mockClickComplete = jest.fn(); 

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<Todo todo={mockTodo} onClickDelete={mockClickDelete} onClickComplete={mockClickComplete} />)
  })

  test('renders todo to screen', () => {
    const todo = screen.getByText(/This is a mock todo./);

    expect(todo).toBeDefined();
  })

  test('able to click todo buttons', async () => {
    const deleteButton = screen.getByText(/Delete/);
    const doneButton = screen.getByText(/set as done/i);

    await userEvent.click(deleteButton);
    expect(mockClickDelete.mock.calls).toHaveLength(1);

    await userEvent.click(doneButton);
    expect(mockClickComplete.mock.calls).toHaveLength(1);
    

  })
})
