import favItemNotSelected from "../../img/fav_not_selected.svg";
import favItemSelected from "../../img/fav_selected.svg";
import addNotSelected from "../../img/add_not_selected.svg";
import addSelected from "../../img/add_selected.svg";
import { useState, useEffect } from "react";
const Sneaker = ({
  stashItems,
  settings,
  sum,
  favItems,
  handleFavorite,
  handleStash,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  useEffect(() => {
    if (stashItems.length !== 0) {
      stashItems.map((item) => {
        if (stashItems.find((el) => el.id === settings.id)) {
          return setIsAdded(true);
        } else {
          return setIsAdded(false);
        }
      });
    } else {
      setIsAdded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stashItems]);
  useEffect(() => {
    if (sum === 0) {
      setIsAdded(false);
    }
  }, [sum]);
  useEffect(() => {
    favItems.map((item) => {
      if (item.id === settings.id) {
        return setIsFavorite(true);
      } else {
        return null;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favItems]);
  const handleAdded = () => {
    handleStash(settings.id, settings, isAdded);
    setIsAdded(!isAdded);
  };
  // WRITE FULL FUNCTION HERE [USING CONTEXT]
  const handleFavorited = () => {
    handleFavorite(settings.id, settings, isFavorite);
    setIsFavorite(!isFavorite);
  };
  return (
    <div className="sneaker-item">
      <img
        src={isFavorite ? favItemSelected : favItemNotSelected}
        onClick={handleFavorited}
        alt=""
        className="fav-item"
      />
      <img src={settings.thumbnail} alt="" className="item-img" />
      <div className="item-title">
        {settings.title.slice(0, 17)} <span>{settings.title.slice(17)}</span>
      </div>
      <div className="item-price">
        ЦІНА:
        <span>{settings.price} uah</span>
      </div>
      <img
        src={isAdded ? addSelected : addNotSelected}
        onClick={handleAdded}
        alt=""
        className="add-item"
      />
    </div>
  );
};
export default Sneaker;
