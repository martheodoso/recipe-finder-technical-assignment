import { render, screen, fireEvent } from '@testing-library/react';
import Tag from './Tag';

describe('Tag Component', () => {
  it('renders tag with correct title', () => {
    render(<Tag title="Test Tag" />);
    expect(screen.getByText('Test Tag')).toBeInTheDocument();
  });

  it('calls handleTagClick when close button is clicked', () => {
    const mockHandleClick = jest.fn();
    render(<Tag title="Test Tag" handleTagClick={mockHandleClick} />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(mockHandleClick).toHaveBeenCalled();
  });

  it('renders close button with correct attributes', () => {
    render(<Tag title="Test Tag" />);

    const closeButton = screen.getByRole('button');
    expect(closeButton).toHaveAttribute('type', 'submit');
    expect(closeButton).toHaveAttribute('formAction', '/api/remove-filters?removeTag=Test Tag');
  });

});