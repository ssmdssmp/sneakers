import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import fav from "../../img/fav.svg";
import stash from "../../img/stash.svg";
import chel from "../../img/chel.svg";
import "./Header.css";
const Header = (props) => {
  return (
    <header>
      <Link to="/sneakers">
        <div className="header-left">
          <img className="logo" src={logo} alt="logo" />
          <h2>
            React Sneakers <span>Магазин найкращих кросівок</span>
          </h2>
        </div>
      </Link>
      <div className="header-right">
        <img
          src={stash}
          alt="stash"
          onClick={props.handleShop()}
          style={{
            filter:
              props.sum === 0
                ? "none"
                : " invert(42%) sepia(93%) saturate(1352%) hue-rotate(87deg) brightness(90%) contrast(50%)",
          }}
        />
        <div className="stash-sum">{props.sum} uah</div>
        <Link to="/favorite">
          <img
            src={fav}
            alt="favorite"
            style={{
              filter:
                props.favItems.length === 0
                  ? "none"
                  : " invert(42%) sepia(93%) saturate(1352%) hue-rotate(237deg) brightness(100%) contrast(50%)",
            }}
          />
        </Link>
        <Link to="/purchases">
          <img src={chel} alt="" />
        </Link>
      </div>
      <hr />
    </header>
  );
};
export default Header;
