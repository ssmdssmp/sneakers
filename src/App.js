import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Stash from "./components/Stash";
import axios from "axios";
import { ShopPage, FavPage, PurchasePage } from "./pages/index";
function App() {
  const [openShop, setOpenShop] = useState(false);
  const [stashItems, setStashItems] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [sneakers, setSneakers] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    setSum(stashItems.reduce((part, a) => part + a.price, 0));
  }, [stashItems]);
  useEffect(() => {
    axios
      .get("https://630b3265f280658a59d7896f.mockapi.io/sneakers")
      .then((res) => setSneakers(res.data))
      .catch();
    axios
      .get(`https://630b3265f280658a59d7896f.mockapi.io/Stash/`)
      .then((res) => {
        if (res.data.length !== 0) {
          setStashItems(res.data);
        }
      })
      .catch();
    axios
      .get("https://630b3265f280658a59d7896f.mockapi.io/Favorite")
      .then((res) => setFavorite(res.data))
      .catch();
    let arr = [];
    axios
      .get("https://630b3265f280658a59d7896f.mockapi.io/Purchase")
      .then((res) =>
        res.data.map((item) => {
          return item[0].map((item) => {
            if (arr.find((el) => el.id === item.id)) {
              return null;
            } else {
              return arr.push(item);
            }
          });
        })
      )
      .then(setPurchased(arr));
  }, []);

  const writeToPurchased = () => {
    let arr = [...purchased];
    axios
      .post("https://630b3265f280658a59d7896f.mockapi.io/Purchase/", [
        [...stashItems],
      ])
      .then(
        stashItems.map((item) => {
          if (arr.find((el) => el.id === item.id)) {
            return null;
          } else {
            return arr.push(item);
          }
        })
      )
      .then(setPurchased(arr))
      .then(clearStash)
      .catch(console.log("error"));
  };
  const clearStash = () => {
    stashItems.map((item) => {
      setTimeout(() => {
        axios.delete(
          `https://630b3265f280658a59d7896f.mockapi.io/Stash/${item.key}`
        );
      }, 600 * stashItems.indexOf(item));
      return setStashItems([]);
    });
  };

  const handleStash = (id, { title, thumbnail, price }, isAdded) => {
    if (isAdded === true) {
      axios
        .delete(
          `https://630b3265f280658a59d7896f.mockapi.io/Stash/${
            stashItems.find((el) => el.id === id).key
          }`
        )
        .then(setStashItems(stashItems.filter((item) => item.id !== id)));
    } else {
      axios
        .post("https://630b3265f280658a59d7896f.mockapi.io/Stash", {
          title: title,
          id: id,
          thumbnail: thumbnail,
          price: price,
        })
        .then(
          setStashItems([
            ...stashItems,
            {
              title: title,
              id: id,
              thumbnail: thumbnail,
              price: price,
              key: stashItems.length === 0 ? 1 : +stashItems.at(-1).key + 1,
            },
          ])
        );
    }
  };

  const handleFavorite = (id, { title, price, thumbnail }, isFavorite) => {
    if (isFavorite === true) {
      axios
        .get("https://630b3265f280658a59d7896f.mockapi.io/Favorite")
        .then((res) => {
          return res.data.find((item) => item.id === id).key;
        })
        .then((res) => {
          axios.delete(
            `https://630b3265f280658a59d7896f.mockapi.io/Favorite/${res}`
          );
        })
        .then(setFavorite(favorite.filter((item) => item.id !== id)));
    } else {
      axios
        .post("https://630b3265f280658a59d7896f.mockapi.io/Favorite", {
          title: title,
          id: id,
          thumbnail: thumbnail,
          price: price,
        })
        .then(
          setFavorite([
            ...favorite,
            ...sneakers.filter((item) => item.id === id),
          ])
        );
    }
  };
  const handleShop = () => {
    setOpenShop(!openShop);
  };
  return (
    <Router>
      <div className="App">
        <Stash
          writeToPurchased={writeToPurchased}
          sum={sum}
          handleStash={handleStash}
          openShop={openShop}
          stashItems={stashItems}
          handleShop={() => handleShop}
        />
        <div
          className="overlay"
          style={{ display: openShop ? "block" : "none" }}
          onClick={handleShop}
        ></div>
        <Header handleShop={() => handleShop} sum={sum} favItems={favorite} />

        <Routes>
          <Route
            path="/purchases"
            element={
              <PurchasePage
                handleFavorite={handleFavorite}
                purchased={purchased}
                stashItems={stashItems}
                favItems={favorite}
              />
            }
          />
          <Route
            path="/favorite"
            element={
              <FavPage
                handleStash={handleStash}
                handleFavorite={handleFavorite}
                stashItems={stashItems}
                favItems={favorite}
                sneakers={sneakers}
              />
            }
          />
          <Route
            path="/sneakers"
            element={
              <ShopPage
                handleStash={handleStash}
                handleFavorite={handleFavorite}
                stashItems={stashItems}
                favItems={favorite}
                sneakers={sneakers}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
