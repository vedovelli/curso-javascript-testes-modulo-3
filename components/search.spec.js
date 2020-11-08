import Search from './search';
import { render, screen } from '@testing-library/react';

describe('Search', () => {
  it('should render Search component', () => {
    render(<Search />);

    expect(screen.getByTestId('search')).toBeInTheDocument();
  });
});
