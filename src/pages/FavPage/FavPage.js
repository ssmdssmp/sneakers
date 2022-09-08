import emptyFav from "../../img/empty_fav.png";
import Sneaker from "../../components/Sneaker";
import { Link } from "react-router-dom";
import "./FavPage.css";
const FavPage = ({ favItems, handleStash, handleFavorite, stashItems }) => {
  console.log(favItems);
  return (
    <div className="content">
      <div className="title">Обрані кросівки</div>
      {favItems.length !== 0 ? (
        <div className="list-content">
          {favItems.map((item) => {
            return (
              <Sneaker
                handleStash={handleStash}
                handleFavorite={handleFavorite}
                settings={item}
                stashItems={stashItems}
                favItems={favItems}
                key={item.id}
              />
            );
          })}
        </div>
      ) : (
        <div className="empty-fav">
          <img src={emptyFav} alt="empty fav" />
          <p>Ви ще не обрали жодної пари кросівок</p>
          <Link to="/sneakers">
            <button className="stash-btn">На головну</button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default FavPage;
