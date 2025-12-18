import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/recipes.css';

const Recipes = () => {
    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert'];

    // Mock Data
    const recipes = [
        { id: 1, title: 'Spicy Pasta', category: 'Dinner', img: '🍝' },
        { id: 2, title: 'Greek Salad', category: 'Lunch', img: '🥗' },
        { id: 3, title: 'Cheesecake', category: 'Dessert', img: '🍰' },
        { id: 4, title: 'Avocado Toast', category: 'Breakfast', img: '🥑' },
    ];

    const filteredRecipes = filter === 'All' ? recipes : recipes.filter(r => r.category === filter);

    return (
        <div className="container recipes-page">
            <div className="recipes-header">
                <h1>All Recipes</h1>
                <p>Explore our collection of delicious meals</p>
            </div>

            <div className="filter-container">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`filter-btn ${filter === cat ? 'active' : ''}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {filteredRecipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-card-wrapper">
                        <div style={{ height: '180px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                            {recipe.img}
                        </div>
                        <div style={{ padding: '20px' }}>
                            <span style={{ color: 'var(--color-gold)', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.8rem' }}>{recipe.category}</span>
                            <h3 style={{ margin: '10px 0', color: '#333' }}>{recipe.title}</h3>
                            <Link to="#" style={{ color: 'var(--color-dark-red)', fontWeight: 'bold', textDecoration: 'none' }}>View Recipe &rarr;</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recipes;