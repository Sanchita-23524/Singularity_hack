# Food Waste Zero-Point Planner 🌱

An AI-powered meal planning application designed to reduce food waste by generating waste-free meal plans based on expiring ingredients.

## Problem Statement

40% of food waste happens at home because people don't plan meals around expiring ingredients. This application solves that by:

- Taking a list of priority/expiring ingredients from users
- Cross-referencing with existing pantry stock  
- Generating intelligent 2-day waste-free meal plans
- Suggesting creative uses for scraps

## Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: Optional (easily extensible)
- **AI**: OpenAI API integration ready
- **Server**: Uvicorn

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

## Project Structure

```
BEYONDYOTTA-HELLIX/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                 # FastAPI application
│   │   ├── models/
│   │   │   └── __init__.py         # Pydantic models
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   └── meal_planner.py     # API endpoints
│   │   └── services/
│   │       ├── __init__.py
│   │       └── ai_agent.py         # AI logic
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx       # Main dashboard
│   │   │   ├── IngredientForm.jsx  # Ingredient input
│   │   │   ├── MealPlanCard.jsx    # Meal display
│   │   │   └── ScrapsIdeasModal.jsx # Scraps ideas modal
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   └── README.md
│
├── .gitignore
└── README.md
```

## Setup & Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

5. Update `.env` with your OpenAI API key (if using LLM):
```
OPENAI_API_KEY=your_api_key_here
```

6. Run the backend server:
```bash
python -m app.main
# or
uvicorn app.main:app --reload
```

Server runs at: `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

## API Endpoints

### Health Check
- **GET** `/health` - Service health status

### Meal Planning
- **POST** `/meal-plan/generate`
  - Request: `{ ingredients: [{ name, daysUntilExpiry }], days: 2 }`
  - Response: Meal plan with waste reduction summary

- **POST** `/meal-plan/scraps-ideas`
  - Request: `{ ingredient: "broccoli" }`
  - Response: Creative scrap usage ideas

## Features

✅ **Ingredient Priority Management** - Add ingredients with expiry countdown  
✅ **AI-Powered Meal Planning** - Generate waste-free meal plans  
✅ **Scrap Utilization** - Creative ideas for using vegetable scraps  
✅ **Waste Reduction Metrics** - See estimated savings and waste reduction  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Green Theme** - Nature-inspired design with organic animations  

## Customization

### Adding LLM Support

In `backend/app/services/ai_agent.py`, replace the mock methods with actual LLM calls:

```python
from openai import AsyncOpenAI

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def generate_meal_plan(self, ingredients, days):
    prompt = f"Create a {days}-day waste-free meal plan using: {ingredients}"
    response = await client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content
```

### Theme Colors

Customize colors in `frontend/tailwind.config.js`:

```javascript
colors: {
  leaf: '#A8D5BA',
  'leaf-dark': '#7AB893',
  forest: '#4A7C59',
  // ... more colors
}
```

## Deployment

### Backend Deployment (Heroku/Railway)

```bash
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)

```bash
npm run build
# Deploy the dist/ folder
```

## Development Tips

1. **Mock Mode**: Backend runs with mock data - no API key required initially
2. **CORS Ready**: Frontend-backend communication already configured
3. **Hot Reload**: Both dev servers support hot reloading
4. **Extensible**: Easy to add database, authentication, and more features

## Future Enhancements

- 🔐 User authentication & saved meal plans
- 📊 Nutrition tracking integration
- 🛒 Shopping list generation
- 🌍 Sustainability scoring
- 📱 Mobile app (React Native)
- 🔗 Recipe database integration

## License

MIT License - Feel free to use this for your hackathon project!

## Support

For issues or questions, please open a GitHub issue.

---

**Built with ❤️ for sustainable living and zero-waste kitchens**
