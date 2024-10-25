import { useGetMenuItemsQuery } from "../../api/api";

const MenuItemsList = () => {
  const { data, isLoading, isSuccess } = useGetMenuItemsQuery();

  return (
    <>
      <h1>Cardápio</h1>
      {isLoading && <h1>Loading...</h1>}
      {isSuccess &&
        data.map((category) => (
          <>
            <h1>{category.title}</h1>
            <ul>
              {category.menuItems.map((menuItem) => (
                <li>
                  <img src={menuItem.imageUrl} width="50px" height="50px" />
                  <h2>{menuItem.title}</h2>
                  <p>{menuItem.description}</p>
                  <span>R$ {menuItem.value.toString().replace(".", ",")}</span>
                </li>
              ))}
            </ul>
          </>
        ))}
    </>
  );
};

export default MenuItemsList;
