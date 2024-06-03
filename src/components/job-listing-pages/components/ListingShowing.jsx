const ListingShowing = () => {
  return (
    <div className="ls-show-more">
      <p>Showing 36 of 497 Jobs</p>
      <div className="bar">
        <span
          className="bar-inner"
          style={{ width: `calc(${(36 * 100) / 497}%)` }}
        ></span>
      </div>
      <button className="show-more">Show More</button>
    </div>
  );
};

export default ListingShowing;
