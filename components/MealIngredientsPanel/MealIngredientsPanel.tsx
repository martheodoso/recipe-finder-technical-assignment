type MealIngredientsPanelProps = {
  ingredients: { ingredient: string; measure: string }[];
}

const MealIngredientsPanel = ({ ingredients }: MealIngredientsPanelProps) => {
  return (
    <><h2 className="text-2xl font-semibold mb-2 text-white">Ingredients:</h2>
      <ul className="list-disc pl-2 list-inside text-white">
        {ingredients.map(({ ingredient, measure }, index) => (
          <li key={index}>{ingredient} - {measure}</li>
        ))}
      </ul>
    </>
  )
};

export default MealIngredientsPanel;