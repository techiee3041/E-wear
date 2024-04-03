import withAuth from "../../components/AuthRoute";
import MainCarousel from "./MainCarousel";
import ShoppingList from "./ShoppingList";
import Subscribe from "./Subscribe";



const Home = () => {
  return (
    <div>
      <MainCarousel />
      <ShoppingList />
      <Subscribe />
    </div>
  );
};

export default withAuth(Home);
