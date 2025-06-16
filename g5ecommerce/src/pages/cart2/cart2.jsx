import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./cart2.module.css";
import { apiUsuarios, apiCarrinho } from "../../services/api";
import { getUsuario } from "../../utils/localstorage";

const ProductCard = ({ product, addToCart }) => (
  <div className="product-card">
    <img src={product.foto} alt={product.nome} />
    <h3>{product.nome}</h3>
    <p>{product.descricao}</p>
    <p className="price">Preço: R$ {product.precoPromo ? product.precoPromo : product.preco}</p>
    {product.precoPromo && <p className="promo-price">De: R$ {product.preco}</p>}
    <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
  </div>
);

const Cart = ({ cartItems, updateQuantity, removeItem }) => (
  <div className="cart">
    <h2>Carrinho</h2>
    {cartItems.map((item) => (
      <div key={item.id} className="cart-item">
        <h4>{item.nome}</h4>
        <p>R$ {item.precoPromo ? item.precoPromo : item.preco}</p>
        <div className="quantity-control">
          <button onClick={() => updateQuantity(item.id, item.quantidade - 1)}>-</button>
          <span>{item.quantidade}</span>
          <button onClick={() => updateQuantity(item.id, item.quantidade + 1)}>+</button>
          <button onClick={() => removeItem(item.id)}>Remover</button>
        </div>
      </div>
    ))}
  </div>
);

const BuyerInfo = ({ usuario }) => (
  <div className="buyer-info">
    <h2>Dados do Comprador</h2>
    <p>ID do Usuário: {usuario}</p>
  </div>
);

export function Cart2() {
  const [cart, setCartList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const usuarioId = 12;
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    carregarUsuario(usuarioId);
    carregarCarrinho(usuarioId);
  }, []);

  function carregarUsuario(getUsuario) {
    setLoading(true);
    apiUsuarios
      .get(`/usuarios?id=${usuarioId}`)
      .then(({ data }) => {
        if (data.length > 0) {
          setUsuario(data[0]);
        }
      })
      .catch((error) => console.error("Erro ao carregar usuário:", error))
      .finally(() => setLoading(false));
  }

  const carregarCarrinho = (usuarioId) => {
    setLoading(true);
    apiCarrinho
      .get(`/carrinho?usuario=${usuarioId}`)
      .then(({ data }) => {
        if (data.length > 0) {
          setCartList(data);
        } else {
          navigate("/");
        }
      })
      .catch((error) => console.error("Erro ao carregar carrinho:", error))
      .finally(() => setLoading(false));
  };

  const updateQuantity = (id, newQuantity) => {
    setCartList((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantidade: Math.max(newQuantity, 1) } : item))
    );
  };

  const removeItem = (id) => {
    setCartList((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <h1>E-Commerce</h1>
      {loading ? (
        <p>Carregando carrinho...</p>
      ) : (
        <>
          <Cart cartItems={cart} updateQuantity={updateQuantity} removeItem={removeItem} />
          <BuyerInfo usuario={usuarioId} />
        </>
      )}
    </div>
  );
}

export default Cart2;
