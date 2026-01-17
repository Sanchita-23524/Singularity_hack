import { useState } from 'react'
import axios from 'axios'
import IngredientForm from './IngredientForm'
import MealPlanCard from './MealPlanCard'
import ScrapsIdeasModal from './ScrapsIdeasModal'

export default function Dashboard() {
  const [ingredients, setIngredients] = useState([])
  const [mealPlan, setMealPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showScrapsModal, setShowScrapsModal] = useState(false)
  const [selectedIngredient, setSelectedIngredient] = useState(null)
  const [scrapsIdea, setScrapsIdea] = useState(null)

  const handleAddIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient])
    setError(null)
  }

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const handleGenerateMealPlan = async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await axios.post('/api/meal-plan/generate', {
        ingredients: ingredients,
        days: 2,
      })

      setMealPlan(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate meal plan')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAskAboutScraps = async (ingredient) => {
    setSelectedIngredient(ingredient)
    setShowScrapsModal(true)

    try {
      const response = await axios.post('/api/meal-plan/scraps-ideas', {
        ingredient: ingredient.name,
      })
      setScrapsIdea(response.data.ideas)
    } catch (err) {
      setScrapsIdea('Sorry, could not generate ideas at this moment.')
      console.error('Error:', err)
    }
  }

  const handleCloseModal = () => {
    setShowScrapsModal(false)
    setSelectedIngredient(null)
    setScrapsIdea(null)
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-leaf">
          <div className="flex justify-center mb-4">
            <span className="text-5xl">🌱</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-forest mb-3">
            Food Waste Zero-Point Planner
          </h1>
          <p className="text-lg text-forest-dark max-w-2xl mx-auto">
            Plan delicious, waste-free meals using your expiring ingredients. Let AI help you reduce food waste and save money.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input Form */}
          <div className="lg:col-span-1 animate-slide-up">
            <div className="card sticky top-8">
              <h2 className="section-title">
                <span>🥕</span> Your Ingredients
              </h2>

              <IngredientForm onAddIngredient={handleAddIngredient} />

              {/* Ingredients List */}
              {ingredients.length > 0 && (
                <div className="mt-6 space-y-2">
                  <h3 className="font-semibold text-forest mb-3">Added Ingredients:</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {ingredients.map((ing, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-sprout/30 p-3 rounded-lg border border-leaf animate-fade-in-leaf"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-forest">{ing.name}</p>
                          <p className="text-sm text-forest-dark">
                            {ing.daysUntilExpiry} days until expiry
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveIngredient(idx)}
                          className="ml-2 px-3 py-1 bg-spoil/20 hover:bg-spoil/40 text-spoil rounded transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleGenerateMealPlan}
                  disabled={loading || ingredients.length === 0}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Generating Plan...' : '✨ Generate Meal Plan'}
                </button>

                {error && (
                  <div className="p-4 bg-spoil/10 border border-spoil text-spoil rounded-lg text-sm animate-fade-in-leaf">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {mealPlan ? (
              <div className="space-y-6">
                <div className="card">
                  <h2 className="section-title">
                    <span>🍽️</span> Your 2-Day Waste-Free Plan
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mealPlan.meals.map((meal, idx) => (
                      <MealPlanCard
                        key={idx}
                        meal={meal}
                        onAskAboutScraps={handleAskAboutScraps}
                      />
                    ))}
                  </div>
                </div>

                {/* Waste Reduction Summary */}
                {mealPlan.wasteSummary && (
                  <div className="card bg-gradient-to-br from-sprout/20 to-leaf/20 border-leaf-dark">
                    <h3 className="text-xl font-bold text-forest mb-4 flex items-center gap-2">
                      <span>📊</span> Impact Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-forest">{mealPlan.wasteSummary.wasteReduction}%</p>
                        <p className="text-sm text-forest-dark">Waste Reduction</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-forest">${mealPlan.wasteSummary.estimatedSavings}</p>
                        <p className="text-sm text-forest-dark">Estimated Savings</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tips Section */}
                <div className="card bg-wilt/10 border-wilt">
                  <h3 className="text-xl font-bold text-forest mb-3 flex items-center gap-2">
                    <span>💡</span> Pro Tips
                  </h3>
                  <ul className="space-y-2 text-forest-dark">
                    <li className="flex items-start gap-3">
                      <span className="text-leaf-dark font-bold">✓</span>
                      <span>Store herbs in water like flowers to keep them fresh longer</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-leaf-dark font-bold">✓</span>
                      <span>Save vegetable scraps for homemade stock</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-leaf-dark font-bold">✓</span>
                      <span>Freeze ripe fruits and vegetables before they go bad</span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="card h-full flex flex-col items-center justify-center text-center py-16 border-dashed border-2 border-leaf">
                <span className="text-6xl mb-4 opacity-50">🌿</span>
                <p className="text-xl text-forest-dark mb-2">Ready to reduce food waste?</p>
                <p className="text-forest-dark/70">Add your expiring ingredients and let AI create a delicious waste-free meal plan for you.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scraps Ideas Modal */}
      {showScrapsModal && (
        <ScrapsIdeasModal
          ingredient={selectedIngredient}
          ideas={scrapsIdea}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
