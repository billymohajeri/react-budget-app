import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Link to="/budget-app" className="homepage-link">
        <img src="/logo.png" alt="Budget App" className="homepage-image" />
        <p>Go to the App...</p>
      </Link>
    </div>
  );
};

export default HomePage;
