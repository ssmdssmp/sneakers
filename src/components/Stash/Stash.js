import deleteButton from "../../img/delete.svg";
import "./Stash.css";
import StashItem from "../StashItem/StashItem";
import emptyStash from "../../img/empty_stash.png";
import { Transition } from "react-transition-group";
import orderedImg from "../../img/ordered.jpg";
import { useState } from "react";
import { useEffect } from "react";
const Stash = (props) => {
  const [ordered, setOrdered] = useState(false);
  useEffect(() => {
    setOrdered(false);
  }, [props.openShop]);
  const duration = 150;
  const defaultStyle = {
    transition: `all ${duration}ms ease-in-out`,
    visibility: "hidden",
  };
  const transitionStyles = {
    entering: { right: 0, visibility: "visible" },
    entered: { right: 0, visibility: "visible" },
    exiting: { right: "-25vw", visibility: "hidden" },
    exited: { right: "-25vw", visibility: "hidden" },
  };
  return (
    <Transition in={props.openShop} timeout={duration}>
      {(state) => (
        <div
          className="stash"
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <img
            src={deleteButton}
            onClick={props.handleShop()}
            className="close-stash"
            alt=""
          />
          <div className="stash-title">Кошик</div>

          {props.stashItems.length !== 0 ? (
            <div className="stash-items-list">
              <>
                {props.stashItems.map((item) => {
                  return (
                    <StashItem
                      settings={item}
                      key={item.id}
                      handleStash={props.handleStash}
                    />
                  );
                })}
              </>
            </div>
          ) : (
            <div className="empty-stash">
              <img
                className="empty-stash-img"
                src={ordered ? orderedImg : emptyStash}
                alt="empty stash"
                style={{ width: ordered ? "80px" : "unset" }}
              />
              <p style={{ color: ordered ? "green" : "unset" }}>
                {ordered
                  ? "Замовлення оформлене!"
                  : "Добавте хоча б одну пару кросівок, щоб зробити замовлення"}
              </p>
              <button onClick={props.handleShop()} className="stash-btn">
                Повернутись назад{" "}
              </button>
            </div>
          )}
          <div
            className="sum"
            style={{
              display: props.stashItems.length === 0 ? "none" : "block",
            }}
          >
            <ul>
              <li>
                <span>До сплати</span>
                <div></div>
                <b>{props.sum} uah</b>
              </li>
              <li>
                <span>Податок 5%</span>
                <div></div>
                <b>{(props.sum / 100) * 5} uah</b>
              </li>
            </ul>
            <button
              onClick={() => {
                props.writeToPurchased();
                setOrdered(true);
              }}
              className="stash-btn"
            >
              Оформити замовлення
            </button>
          </div>
        </div>
      )}
    </Transition>
  );
};
export default Stash;
