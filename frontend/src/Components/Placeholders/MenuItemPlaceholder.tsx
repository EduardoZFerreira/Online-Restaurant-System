const MenuItemPlaceholder = () => {
  return (
    <>
      <div className="card shadow col-md-5 col-lg-3 col-12 mb-4 m-lg-2">
        <div className="placeholder card-img-top"></div>
        <div className="card-body">
          <h2 className="card-title placeholder-glow">
            <span className="placeholder col-6"></span>
          </h2>
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-6"></span>
            <span className="placeholder col-8"></span>
          </p>
        </div>
        <div className="placeholder-glow card-footer bg-success text-center">
          <h4 className="placeholder col-6"></h4>
        </div>
      </div>
    </>
  );
};

export default MenuItemPlaceholder;
