export default function MealPlanCard({ meal, onAskAboutScraps }) {
  const priorityColor = {
    high: 'spoil',
    medium: 'wilt',
    low: 'sprout',
  }[meal.priority] || 'sprout'

  const priorityEmoji = {
    high: '🔴',
    medium: '🟡',
    low: '🟢',
  }[meal.priority] || '🟢'

  return (
    <div className="card bg-gradient-to-br from-white to-cream animate-fade-in-leaf">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-forest flex-1">{meal.name}</h3>
        <span className={`badge bg-${priorityColor}/20 text-${priorityColor}`}>
          {priorityEmoji} {meal.priority}
        </span>
      </div>

      <p className="text-forest-dark mb-4 text-sm leading-relaxed">
        {meal.description}
      </p>

      <div className="space-y-3">
        <div>
          <p className="text-sm font-semibold text-forest mb-2">Key Ingredients:</p>
          <div className="flex flex-wrap gap-2">
            {meal.keyIngredients.map((ing, idx) => (
              <span
                key={idx}
                className="badge bg-leaf/30 text-forest text-xs"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-forest mb-2">Cooking Time:</p>
          <p className="text-forest-dark text-sm">⏱️ {meal.cookingTime}</p>
        </div>

        {meal.scrapUses && (
          <div className="bg-sprout/10 border border-leaf p-3 rounded-lg">
            <p className="text-sm font-semibold text-forest mb-1">♻️ Scrap Uses:</p>
            <p className="text-sm text-forest-dark">{meal.scrapUses}</p>
          </div>
        )}

        <button
          onClick={() => onAskAboutScraps(meal)}
          className="w-full mt-3 px-3 py-2 bg-lime hover:bg-lime/80 text-forest-dark font-semibold rounded transition-colors text-sm"
        >
          🌿 What About Scraps?
        </button>
      </div>
    </div>
  )
}
