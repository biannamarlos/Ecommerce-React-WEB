import { createContext, useState } from "react";

const cartContext = createContext();

const CartProvider = (props) => {
  const [cartItens, setCartItens] = useState([]);
  const [total, setTotal] = useState(0);

  function addItens(newProduct) {
    const existingProduct = cartItens.find((item) => item.id === newProduct.id);

    if (existingProduct) {
      newProduct = cartItens.map((item) => {
        if (item.id === newProduct.id) {
          return { ...item, quantidade: item.quantidade + 1 };
        }
        return item;
      });
    }
  }

  function totalValue() {
    let total = 0;
    cartItens.forEach((item) => {
      total += item.quantidade * item.preco;
    });

    setTotal(total);
  }

  function clearCart() {
    setCartItens([]);
  }

  function removeItem(id) {
    const newCartList = cartItens.splice((item) => item.id === id);
    setCartItens(newCartList);
  }

  return (
    <cartContext.Provider
      value={{
        addItens,
        removeItem,
        clearCart,
        totalValue,
        cartItens,
        setCartItens,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
};

export { cartContext, CartProvider };
