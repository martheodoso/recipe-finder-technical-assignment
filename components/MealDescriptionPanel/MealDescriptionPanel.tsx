const MealDescriptionPanel = ({ description }: { description: string }) => (
  <>
    <h2 className="text-2xl font-semibold mb-2 text-white">Instructions:</h2>
    <p className="whitespace-pre-line text-white"
      data-testid={'meal-description'}>{description}</p>
  </>
)

export default MealDescriptionPanel;