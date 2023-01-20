import { fireEvent, render, screen } from '@testing-library/react';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import { Header } from './Header';
import { setDataTableVisible } from '../../reducers/DataTableReducer';
import { useDispatch, useSelector } from 'react-redux';

jest.mock('react-redux');
const useSelectorMock = useSelector as jest.Mock;
const useDispatchMock = useDispatch as jest.Mock;

describe('Header', () => {
  it('should equal saved snapshot', () => {
    const renderer: ShallowRenderer = createRenderer();
    renderer.render(<Header />);
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });

  it('should switch logo', () => {
    render(<Header />); 
    expect(screen.queryByTestId('header-logo')).toBeTruthy();
    fireEvent.click(screen.getByLabelText('Logo'));
    expect(screen.queryByTestId('header-logo')).toBeFalsy();
  });

  it('should switch table', () => {
    const mockedDispatch = jest.fn();
    useDispatchMock.mockImplementation(() => mockedDispatch);
    useSelectorMock.mockReturnValue(true);

    render(<Header />);
    fireEvent.click(screen.getByLabelText('Tabelle'));
    expect(mockedDispatch.mock.calls.length).toEqual(1);
    expect(mockedDispatch.mock.calls[0][0]).toEqual(setDataTableVisible(false));
  });
});
