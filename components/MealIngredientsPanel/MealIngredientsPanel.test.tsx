import { render, screen } from '@testing-library/react';
import MealIngredientsPanel from './MealIngredientsPanel';

describe('MealIngredientsPanel', () => {
  const mockIngredients = [
    { ingredient: 'Chicken', measure: '200g' },
    { ingredient: 'Rice', measure: '100g' },
  ];

  it('renders ingredients heading', () => {
    render(<MealIngredientsPanel ingredients={mockIngredients} />);
    expect(screen.getByText('Ingredients:')).toBeInTheDocument();
  });

  it('renders list of ingredients with measurements', () => {
    render(<MealIngredientsPanel ingredients={mockIngredients} />);
    expect(screen.getByText('Chicken - 200g')).toBeInTheDocument();
    expect(screen.getByText('Rice - 100g')).toBeInTheDocument();
  });

  it('renders empty list when no ingredients provided', () => {
    render(<MealIngredientsPanel ingredients={[]} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});