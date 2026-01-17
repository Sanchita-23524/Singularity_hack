import { useState } from 'react'

export default function IngredientForm({ onAddIngredient }) {
  const [formData, setFormData] = useState({
    name: '',
    daysUntilExpiry: '1',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      alert('Please enter an ingredient name')
      return
    }

    onAddIngredient({
      name: formData.name.trim(),
      daysUntilExpiry: parseInt(formData.daysUntilExpiry),
    })

    setFormData({
      name: '',
      daysUntilExpiry: '1',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-forest mb-2">
          Ingredient Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Broccoli, Chicken, Eggs"
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="days" className="block text-sm font-semibold text-forest mb-2">
          Days Until Expiry
        </label>
        <select
          id="days"
          name="daysUntilExpiry"
          value={formData.daysUntilExpiry}
          onChange={handleChange}
          className="input-field"
        >
          {[1, 2, 3, 4, 5, 7, 10, 14].map(day => (
            <option key={day} value={day}>
              {day} day{day > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="btn-secondary w-full"
      >
        + Add Ingredient
      </button>
    </form>
  )
}
