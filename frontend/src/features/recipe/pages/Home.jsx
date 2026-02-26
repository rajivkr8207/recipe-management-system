import { useEffect, useState } from "react";
import useAuth from "../../auth/hooks/useAuth";
import RecipeCard from "../components/RecipeCard";
import useRecipe from "../hooks/useRecipe";
import "../styles/Home.scss";

function Home() {
  const { recipe, handleDeleteRecipe } = useRecipe();
  const { User } = useAuth();

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    let filtered = recipe;

    if (search) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.tags?.some(tag =>
          tag.toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    if (difficulty) {
      filtered = filtered.filter(
        (item) => item.difficulty === difficulty
      );
    }

    if (category) {
      filtered = filtered.filter(
        (item) => item.category === category
      );
    }

    setFilteredRecipes(filtered);
  }, [search, difficulty, category, recipe]);

  return (
    <div className="home">
      {/* Header */}
      <div className="home__header">
        <h1>Discover Recipes</h1>
        <p>Find simple & tasty recipes everyday</p>

        <div className="filters">
          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">All Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <input
            type="text"
            placeholder="Category..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="home__grid">
        {filteredRecipes?.length > 0 ? (
          filteredRecipes.map((item) => (
            <RecipeCard
              key={item._id}
              recipe={item}
              User={User}
              handleDeleteRecipe={handleDeleteRecipe}
            />
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </div>
    </div>
  );
}

export default Home;