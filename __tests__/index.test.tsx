import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import App from './index';

jest.mock('axios');

describe('App', () => {
  test('displays key-value pairs', async () => {
    const testData = [
      { key: 'test1', value: 'value1' },
      { key: 'test2', value: 'value2' }
    ];

    axios.get.mockResolvedValueOnce({
      data: {
        kvs: testData
      }
    });

    render(<App />);

    const keys = screen.getAllByText(/test/);

    expect(keys.length).toBe(testData.length);
    expect(keys[0]).toBeInTheDocument();
    expect(keys[1]).toBeInTheDocument();
  });

  test('handles create', async () => {
    const testData = [
      { key: 'test1', value: 'value1' },
      { key: 'test2', value: 'value2' }
    ];

    axios.get.mockResolvedValueOnce({
      data: {
        kvs: testData
      }
    });

    axios.post.mockImplementation(async (url, data) => {
      testData.push(data);
      return {
        data: data
      };
    });

    render(<App />);

    const newButton = screen.getByText(/New/);

    expect(newButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(newButton);
    });

    const saveButton = screen.getByText(/Save/);
    const keyInput = screen.getByLabelText(/Key/);
    const valueInput = screen.getByLabelText(/Value/);

    expect(saveButton).toBeInTheDocument();
    expect(keyInput).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(keyInput, { target: { value: 'test3' } });
      fireEvent.change(valueInput, { target: { value: 'value3' } });
      fireEvent.click(saveButton);
    });

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/v3/kv/put', {
      key: 'test3',
      value: 'value3'
    });
    expect(screen.getByText(/test3/)).toBeInTheDocument();
  });

  test('handles delete', async () => {
    const testData = [
      { key: 'test1', value: 'value1' },
      { key: 'test2', value: 'value2' }
    ];

    axios.get.mockResolvedValueOnce({
      data: {
        kvs: testData
      }
    });

    axios.post.mockImplementation(async (url, data) => {
      const index = testData.findIndex((item) => item.key === data.key);

      if (index >= 0) {
        testData.splice(index, 1);
      }

      return {
        data: data
      };
    });

    render(<App />);

    const deleteButton = screen.getByText(/Delete/);

    expect(deleteButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(deleteButton);
    });

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/v3/kv/delete', {
      key: testData[0].key
    });
    expect(screen.queryByText(testData[0].key)).not.toBeInTheDocument();
  });
});
