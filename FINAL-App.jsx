import React, { useState } from 'react';
import { Heart, Bookmark, Home, Search } from 'lucide-react';

// Mock data for demo
const mockRecipes = [
  {
    id: 1,
    title: "Classic Pasta Carbonara",
    image: "https://images.unsplash.com/photo-1612874742237-6526221fcf10?w=800&h=900&fit=crop",
    cookTime: 20,
    difficulty: "Easy",
    rating: 4.9,
    chef: { name: "Chef Marco" },
    likes_count: 128000,
    saves_count: 45200,
    ingredients: ["Pasta", "Eggs", "Bacon", "Parmesan"],
    steps: ["Boil pasta", "Cook bacon", "Mix eggs", "Combine"]
  },
  {
    id: 2,
    title: "Honey Garlic Chicken",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=900&fit=crop",
    cookTime: 20,
    difficulty: "Easy",
    rating: 4.8,
    chef: { name: "Chef Yuki" },
    likes_count: 156000,
    saves_count: 62100,
    ingredients: ["Chicken", "Rice", "Honey", "Garlic"],
    steps: ["Cook rice", "Sear chicken", "Make sauce", "Serve"]
  }
];

export default function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState({});

  // LOGIN
  if (page === 'login' && !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🍴</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">FoodTok</h1>
            <p className="text-gray-400">Cook. Share. Discover.</p>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            setUser({ email: 'chef@foodtok.com' });
            setPage('feed');
          }} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              defaultValue="chef@foodtok.com"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
            />
            <input
              type="password"
              placeholder="Password"
              defaultValue="password"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
            />
            <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-100">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // FEED
  if (page === 'feed') {
    return (
      <div className="h-screen bg-black flex flex-col">
        <div className="flex items-center justify-between p-4 bg-black z-20">
          <h2 className="text-white font-bold">FoodTok</h2>
          <button onClick={() => setPage('pantry')} className="bg-green-500 text-black px-4 py-2 rounded-full font-bold text-sm">
            🥘 Pantry
          </button>
        </div>

        <div className="flex-1 overflow-y-scroll">
          {mockRecipes.map((recipe) => (
            <div key={recipe.id} className="h-screen w-full flex flex-col relative overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${recipe.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
              </div>

              <div className="relative z-10 h-full flex flex-col justify-end p-4 pb-24">
                <h3 className="text-white text-2xl font-bold">{recipe.title}</h3>
                <p className="text-gray-300 text-sm mt-2">⏱️ {recipe.cookTime} min • {recipe.difficulty}</p>
              </div>

              <div className="absolute right-4 bottom-24 z-20 flex flex-col gap-3">
                <button onClick={() => setLikes({...likes, [recipe.id]: !likes[recipe.id]})} 
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition ${likes[recipe.id] ? 'bg-red-500' : 'bg-gray-800'}`}>
                  <Heart size={24} className="text-white" fill={likes[recipe.id] ? 'white' : 'none'} />
                </button>
                <p className="text-white text-xs text-center">{recipe.likes_count / 1000}k</p>

                <button className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                  <Bookmark size={24} className="text-white" />
                </button>
              </div>

              <button
                onClick={() => setPage('detail')}
                className="absolute bottom-6 left-4 right-4 z-20 bg-green-500 text-black font-bold py-3 rounded-lg hover:bg-green-600"
              >
                View Recipe
              </button>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 flex justify-around h-16 z-50">
          <button onClick={() => setPage('feed')} className="flex flex-col items-center justify-center text-green-500">
            <Home size={24} />
          </button>
          <button onClick={() => setPage('pantry')} className="flex flex-col items-center justify-center text-gray-400">
            <Search size={24} />
          </button>
        </div>
      </div>
    );
  }

  // DETAIL
  if (page === 'detail') {
    const recipe = mockRecipes[0];
    return (
      <div className="min-h-screen bg-black text-white pb-20">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <button onClick={() => setPage('feed')} className="text-2xl">←</button>
          <h2 className="font-bold">Recipe</h2>
        </div>

        <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: `url(${recipe.image})` }}></div>

        <div className="p-4">
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-900 rounded-lg">
            <div className="text-center">
              <p className="text-2xl">⏱️</p>
              <p className="text-gray-400 text-sm">{recipe.cookTime} min</p>
            </div>
            <div className="text-center">
              <p className="text-2xl">📊</p>
              <p className="text-gray-400 text-sm">{recipe.difficulty}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl">⭐</p>
              <p className="text-gray-400 text-sm">{recipe.rating}</p>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-3">Ingredients</h3>
          <div className="space-y-2 mb-6">
            {recipe.ingredients.map((ing, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 bg-gray-900 rounded">
                <input type="checkbox" className="w-4 h-4" />
                <span>{ing}</span>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-3">Steps</h3>
          <div className="space-y-3 mb-6">
            {recipe.steps.map((step, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="bg-green-500 text-black w-7 h-7 rounded-full flex items-center justify-center font-bold flex-shrink-0">{idx + 1}</div>
                <p>{step}</p>
              </div>
            ))}
          </div>

          <button className="w-full bg-green-500 text-black font-bold py-3 rounded-lg hover:bg-green-600">
            Start Cooking
          </button>
        </div>
      </div>
    );
  }

  // PANTRY
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <button onClick={() => setPage('feed')} className="text-2xl">←</button>
        <h2 className="font-bold">Pantry</h2>
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">What's in your pantry?</h1>
        <input
          type="text"
          placeholder="Add ingredient..."
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
        />
      </div>
    </div>
  );
}
