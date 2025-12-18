import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
    return (
        <div className="home-page">
            <div className="home-hero">
                <h1>Welcome to Food Blog</h1>
                <p>Simple recipes made for real life.</p>
            </div>

            <div className="container">
                <h2 className="section-title">Latest Recipes</h2>

                <div className="recipe-grid">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="recipe-card">
                            <div className="card-img">Recipe Image {item}</div>
                            <div className="card-content">
                                <span className="card-cat">Dinner</span>
                                <h3>Delicious Meal {item}</h3>
                                <p>A wonderful description of this amazing dish goes here.</p>
                                <Link to="#" className="card-link">Read More &rarr;</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;