import { useGetMenuItemsQuery } from "../../api/api";
import MenuItemPlaceholder from "../../Components/Placeholders/MenuItemPlaceholder";
import "./menu.css";

const MenuItemsList = () => {
  const { data, isLoading, isSuccess } = useGetMenuItemsQuery();
  const BRL = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <>
      <div className="container mt-4">
        {isLoading && (
          <>
            <div className="row mb-4">
              <div className="placeholder-glow">
                <h1 className="placeholder col-3 mb-3"></h1>
              </div>
              <MenuItemPlaceholder />
              <MenuItemPlaceholder />
              <MenuItemPlaceholder />
            </div>
          </>
        )}
        {isSuccess &&
          data.map((category) => (
            <>
              <h1 className="display-6 mb-3">{category.title}</h1>
              <div className="row mb-4">
                {category.menuItems.map((menuItem) => (
                  <div className="card menu-item-card shadow col-md-5 col-lg-3 col-12 mb-4 m-lg-2">
                    <img src={menuItem.imageUrl} className="card-img-top" />
                    <div className="card-body">
                      <h2 className="card-title">{menuItem.title}</h2>
                      <p className="card-text">{menuItem.description}</p>
                    </div>
                    <div className="card-footer bg-success text-center">
                      <h4>{BRL.format(menuItem.value)}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ))}
      </div>
    </>
  );
};

export default MenuItemsList;
