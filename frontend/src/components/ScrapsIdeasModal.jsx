export default function ScrapsIdeasModal({ ingredient, ideas, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in-leaf">
      <div className="bg-cream rounded-2xl shadow-2xl max-w-md w-full border border-leaf-dark overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-forest to-forest-dark p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Creative Uses</h2>
              <p className="text-cream/90">for {ingredient.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {ideas ? (
            <div className="space-y-4">
              {typeof ideas === 'string' ? (
                <p className="text-forest-dark leading-relaxed">{ideas}</p>
              ) : (
                <>
                  {ideas.map((idea, idx) => (
                    <div key={idx} className="bg-sprout/10 border-l-4 border-leaf p-4 rounded">
                      <p className="font-semibold text-forest mb-2">{idea.title}</p>
                      <p className="text-sm text-forest-dark">{idea.description}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="animate-pulse-gentle mb-2">
                  <span className="text-4xl">🌱</span>
                </div>
                <p className="text-forest-dark">Loading creative ideas...</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-sand/30 p-4 border-t border-earth">
          <button
            onClick={onClose}
            className="btn-primary w-full"
          >
            Got it! Close
          </button>
        </div>
      </div>
    </div>
  )
}
