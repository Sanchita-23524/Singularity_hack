from fastapi import APIRouter
from app.models import (
    MealPlanRequest,
    MealPlanResponse,
    Meal,
    WasteSummary,
    ScrapsIdeasRequest,
    ScrapsIdeasResponse,
)
from app.services.ai_agent import AIAgentService

router = APIRouter()

# Initialize AI Agent Service
ai_service = AIAgentService()

@router.post("/generate", response_model=MealPlanResponse)
async def generate_meal_plan(request: MealPlanRequest):
    """
    Generate a waste-free meal plan based on expiring ingredients.
    
    Args:
        request: MealPlanRequest with ingredients and duration
        
    Returns:
        MealPlanResponse with meals and waste summary
    """
    meal_plan = await ai_service.generate_meal_plan(
        ingredients=request.ingredients,
        days=request.days
    )
    return meal_plan

@router.post("/scraps-ideas")
async def get_scraps_ideas(request: ScrapsIdeasRequest):
    """
    Get creative ideas for using ingredient scraps.
    
    Args:
        request: ScrapsIdeasRequest with ingredient name
        
    Returns:
        JSON with creative scrap use ideas
    """
    ideas = await ai_service.get_scraps_ideas(ingredient=request.ingredient)
    return {"ingredient": request.ingredient, "ideas": ideas}
