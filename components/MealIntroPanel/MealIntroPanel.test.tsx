import { render, screen } from '@testing-library/react';
import MealIntro from './MealIntroPanel';

describe('MealIntro component', () => {
  const mockMealData = {
    imageSrc: '/test-image.jpg',
    title: 'Test Meal',
    category: 'Test Category',
    area: 'Test Area'
  };

  it('renders meal data correctly', () => {
    const { container } = render(<MealIntro mealData={mockMealData} />);
    expect(container).toMatchSnapshot();
  });

  it('renders without category when not provided', () => {
    const mealDataNoCategory = {
      imageSrc: '/test-image.jpg',
      title: 'Test Meal',
      area: 'Test Area'
    };
    render(<MealIntro mealData={mealDataNoCategory} />);
    expect(screen.getByText('Test Meal')).toBeInTheDocument();
    expect(screen.getByText(/Category:/)).toBeInTheDocument();
    expect(screen.getByText(/Test Area/)).toBeInTheDocument();
  });

  it('renders image with correct attributes', () => {
    render(<MealIntro mealData={mockMealData} />);
    const image = screen.getByTestId('meal-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
  });
});