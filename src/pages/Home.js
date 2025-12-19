import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const recipes = [
    {
      id: 1,
      title: "Butter Naan",
      category: "Breads",
      image:
        "https://diethood.com/wp-content/uploads/2021/02/two-ingredient-naan-bread-7.jpg",
      desc: "Soft, fluffy, and buttery flatbread baked to perfection. The perfect companion for any rich curry.",
    },
    {
      id: 2,
      title: "Paneer Butter Masala",
      category: "Dinner",
      image:
        "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600",
      desc: "Rich and creamy tomato-based curry with tender cottage cheese cubes, finished with butter and aromatic spices.",
    },
    {
      id: 3,
      title: "Chola Poori",
      category: "Breakfast",
      image:
        "https://th.bing.com/th/id/OIP.H5Mmke15kqMZ1HxPFMFMfAHaE8?w=247&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.5&pid=1.7&rm=3&ucfimg=1",
      desc: "A classic combo of spicy chickpea curry (Chole) served with deep-fried, puffy bread (Poori). A weekend favorite!",
    },
  ];

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>Welcome to Food Blog</h1>
        <p>Simple recipes made for real life.</p>
      </div>

      <div className="container">
        <h2 className="section-title">Latest Recipes</h2>

        <div className="recipe-grid">
          {recipes.map((item) => (
            <div key={item.id} className="recipe-card">
              <div className="card-img">
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              <div className="card-content">
                <span className="card-cat">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
