from pydantic import BaseModel
from typing import List

class Ingredient(BaseModel):
    """Model for ingredient data"""
    name: str
    daysUntilExpiry: int

class Meal(BaseModel):
    """Model for a single meal"""
    name: str
    description: str
    priority: str  # high, medium, low
    keyIngredients: List[str]
    cookingTime: str
    scrapUses: Optional[str] = None

class MealPlanRequest(BaseModel):
    """Request model for meal plan generation"""
    ingredients: List[Ingredient]
    days: int = 2

class WasteSummary(BaseModel):
    """Summary of waste reduction"""
    wasteReduction: int
    estimatedSavings: float

class MealPlanResponse(BaseModel):
    """Response model for meal plan"""
    meals: List[Meal]
    wasteSummary: WasteSummary

class ScrapsIdeasRequest(BaseModel):
    """Request model for scraps ideas"""
    ingredient: str

class ScrapsIdeasResponse(BaseModel):
    """Response model for scraps ideas"""
    ingredient: str
    ideas: List[dict]
