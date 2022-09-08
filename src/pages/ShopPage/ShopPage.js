import "./shopPage.css";
import Sneaker from "../../components/Sneaker";
import loaderImg from "../../img/loader.svg";
import { useState } from "react";
const ShopPage = ({
  sneakers,
  handleStash,
  handleFavorite,
  favItems,
  stashItems,
}) => {
  const [search, setSearch] = useState("");
  let arr = sneakers.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="content">
      <div className="title">Всі кросівки</div>
      <input
        className="search "
        type="text"
        value={search}
        onChange={handleSearch}
      />
      <div className="list-content">
        {sneakers.length !== 0 ? (
          arr.map((item) => {
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
          })
        ) : (
          <img src={loaderImg} alt="" className="loader" />
        )}
      </div>
    </div>
  );
};
export default ShopPage;
