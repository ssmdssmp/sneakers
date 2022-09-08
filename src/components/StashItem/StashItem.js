import deleteButton from "../../img/delete.svg";
const StashItem = ({ settings, handleStash }) => {
  return (
    <div className="stash-item">
      <img src={settings.thumbnail} alt="" className="item-img" />
      <div className="stash-item-info">
        <div className="stash-item-title">
          {settings.title.slice(0, 17)} <span>{settings.title.slice(17)}</span>
        </div>
        <div className="stash-item-price">{settings.price}</div>
      </div>
      <img
        src={deleteButton}
        onClick={() => handleStash(settings.id, settings, true)}
        alt=""
        className="delete"
      />
    </div>
  );
};
export default StashItem;
