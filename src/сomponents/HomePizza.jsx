import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">
        Ласкаво просимо до нашої піцерії! 🍕
      </h1>
      <p className="home-subtitle">
        Найкраща піца в місті, приготована з любов'ю!
      </p>
      <Link to="/menu">
        <button className="home-button">
          Перейти до меню
        </button>
      </Link>
    </div>
  );
};

export default Home;
