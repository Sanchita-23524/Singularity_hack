import os
import asyncio
from typing import List
from app.models import Ingredient, Meal, MealPlanResponse, WasteSummary

class AIAgentService:
    """
    AI Agent Service for meal planning and scraps ideas.
    
    This service handles:
    - Generating waste-free meal plans based on expiring ingredients
    - Suggesting creative uses for ingredient scraps
    
    NOTE: Currently uses mock data. Replace with actual LLM calls (OpenAI, Azure OpenAI, etc.)
    """
    
    def __init__(self):
        # Initialize LLM client here when needed
        # Example: self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        pass
    
    async def generate_meal_plan(
        self,
        ingredients: List[Ingredient],
        days: int = 2
    ) -> MealPlanResponse:
        """
        Generate a meal plan based on expiring ingredients.
        
        Args:
            ingredients: List of Ingredient objects with expiry info
            days: Number of days to plan for (default: 2)
            
        Returns:
            MealPlanResponse with meals and waste reduction summary
        """
        
        # TODO: Replace with actual LLM call
        # Example:
        # prompt = f"Create a {days}-day waste-free meal plan using these expiring ingredients: {[ing.name for ing in ingredients]}"
        # response = await self.client.chat.completions.create(...)
        
        # Sort ingredients by expiry urgency
        urgent_ingredients = sorted(
            ingredients,
            key=lambda x: x.daysUntilExpiry
        )
        
        # Mock meal plan generation
        meals = self._generate_mock_meals(urgent_ingredients)
        
        waste_summary = WasteSummary(
            wasteReduction=40,
            estimatedSavings=15.50
        )
        
        return MealPlanResponse(
            meals=meals,
            wasteSummary=waste_summary
        )
    
    async def get_scraps_ideas(self, ingredient: str) -> List[dict]:
        """
        Get creative ideas for using ingredient scraps.
        
        Args:
            ingredient: Name of the ingredient
            
        Returns:
            List of creative scrap use ideas
        """
        
        # TODO: Replace with actual LLM call
        # Example:
        # prompt = f"What are 3 creative ways to use scraps from {ingredient}?"
        # response = await self.client.chat.completions.create(...)
        
        # Mock scraps ideas
        scrap_ideas_db = {
            "broccoli": [
                {
                    "title": "Broccoli Stem Chips",
                    "description": "Peel the stems, cut into chip-sized pieces, toss with olive oil and seasonings, then roast until crispy. A delicious alternative to regular chips!"
                },
                {
                    "title": "Vegetable Broth",
                    "description": "Freeze stems in a freezer bag. When you have enough vegetable scraps, boil them to make nutrient-rich homemade broth."
                },
                {
                    "title": "Pickle the Stems",
                    "description": "Cut broccoli stems into spears, pickle with vinegar, mustard seeds, and dill for a tangy snack."
                }
            ],
            "potato": [
                {
                    "title": "Crispy Potato Peel Chips",
                    "description": "Wash peels thoroughly, toss with oil and seasonings, bake at 400°F until golden and crispy. Excellent as a side or snack!"
                },
                {
                    "title": "Potato Peel Stock",
                    "description": "Save peels and boil with aromatics for a starchy, nutrient-rich stock perfect for soups."
                },
                {
                    "title": "Compost Nutrient",
                    "description": "Add peels to your compost bin to enrich soil with potassium and other minerals."
                }
            ],
            "carrot": [
                {
                    "title": "Carrot Top Pesto",
                    "description": "Blend carrot tops with garlic, nuts, cheese, and oil to make a vibrant pesto for pasta or sandwiches."
                },
                {
                    "title": "Roasted Carrot Peels",
                    "description": "Toss thin peels with oil and herbs, roast until crispy for a vegetable chip snack."
                }
            ]
        }
        
        ingredient_lower = ingredient.lower()
        return scrap_ideas_db.get(
            ingredient_lower,
            [
                {
                    "title": "Vegetable Broth",
                    "description": f"Freeze {ingredient} scraps and use them later to make homemade vegetable broth."
                },
                {
                    "title": "Compost",
                    "description": f"Add {ingredient} scraps to your compost to create nutrient-rich soil amendments."
                },
                {
                    "title": "Creative Recipes",
                    "description": f"Search for '{ ingredient} scrap recipes' online for innovative ways to reduce waste."
                }
            ]
        )
    
    def _generate_mock_meals(self, ingredients: List[Ingredient]) -> List[Meal]:
        """Generate mock meal suggestions based on ingredients."""
        
        ingredient_names = [ing.name.lower() for ing in ingredients]
        
        # Mock meal database - in production, this comes from LLM
        all_meals = [
            Meal(
                name="Creamy Vegetable Stir-Fry",
                description="A vibrant, healthy stir-fry that uses your expiring vegetables at their peak flavor.",
                priority="high",
                keyIngredients=ingredients[:2] if len(ingredients) >= 2 else [ingredients[0].name],
                cookingTime="20 minutes",
                scrapUses="Save vegetable scraps for homemade broth"
            ),
            Meal(
                name="Sheet Pan Roasted Vegetables",
                description="Simple, delicious roasted vegetables that bring out natural sweetness and minimize waste.",
                priority="medium",
                keyIngredients=ingredients[1:3] if len(ingredients) >= 3 else ingredients[-1:],
                cookingTime="30 minutes",
                scrapUses="Blend leftover roasted veggies into soups"
            ),
            Meal(
                name="One-Pot Vegetable Soup",
                description="A hearty, comforting soup that's perfect for using up multiple expiring ingredients together.",
                priority="high",
                keyIngredients=ingredients[:3] if len(ingredients) >= 3 else ingredients,
                cookingTime="35 minutes",
                scrapUses="Make broth from vegetable stems and skins"
            ),
            Meal(
                name="Ingredient-Based Frittata",
                description="A flexible egg dish that adapts to whatever vegetables you have on hand.",
                priority="medium",
                keyIngredients=ingredients[-2:] if len(ingredients) >= 2 else ingredients,
                cookingTime="25 minutes",
                scrapUses="Finely chop vegetable scraps into filling"
            ),
        ]
        
        # Return first 4 meals (for 2-day plan, 2 meals per day)
        return all_meals[:4]
