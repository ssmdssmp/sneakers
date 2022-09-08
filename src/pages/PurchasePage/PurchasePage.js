import { Link } from "react-router-dom";
import Sneaker from "../../components/Sneaker";
import emptyPurchase from "../../img/empty_purchase.png";
import "./PurchasePage.css";
const PurchasePage = (props) => {
  return (
    <div className="content">
      <div className="title">Придбання</div>
      {props.purchased.length !== 0 ? (
        <div className="list-content">
          {props.purchased.map((item) => {
            return (
              <Sneaker
                key={item.id}
                settings={item}
                favItems={props.favItems}
                stashItems={props.stashItems}
                handleFavorite={props.handleFavorite}
              />
            );
          })}
        </div>
      ) : (
        <div className="empty-purchase">
          <img src={emptyPurchase} alt="" />
          <p>Зробіть хоча б одне замовлення, щоб побачити придбані снікери</p>
          <Link to="/sneakers">
            <button className="stash-btn">На головну</button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default PurchasePage;
