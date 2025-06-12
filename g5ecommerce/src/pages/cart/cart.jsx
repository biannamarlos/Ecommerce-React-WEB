import { useEffect, useState } from "react";
import { Card } from "../../components/card/card";


import styles from "./cart.module.css";

export function Cart() {
  const [cartList, setCartList] = useState([]);
  const [usuario, setUsuario] = useState(0);
  const [produto, setProduto] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const newProduct = {
    description: description,
    price: price,
  };
  //GET ALL
  const getAllProducts = () => {
    // setLoading(true);
    apiUC
      .get("/carrinho?usuario=" + usuario)
      .then((response) => {
        setCartList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // setLoading(false);
        console.log("finally");
      });
  };

  //POST
  const postProduct = () => {
    //instanciando a requisição, depois da url base passar o endpoint e o requestBody
    api
      .post("/products", newProduct)
      .then((response) => {
        //tratativa caso a requisição for bem sucedida
        response.status === 200 ? console.log("deu certo") : "";
      })
      .catch((error) => {
        //tratativa caso a requisição não for bem sucedida
        console.log(error);
      });
  };

  //UPDATE
  const updateProduct = () => {
    //instanciando a requisição, depois da url base passar o endpoint e o requestBody
    api
      .put("/products", newProduct)
      .then((response) => {
        //tratativa caso a requisição for bem sucedida
        response.status === 200 ? console.log("deu certo") : "";
      })
      .catch((error) => {
        //tratativa caso a requisição não for bem sucedida
        console.log(error);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Lista de Produtos</h1>
      <div className={styles.cardList}>
        {productsList.map((product, id) => (
          <Card key={id}>
            {product.title}
            {product.price}
            {/* <img src={product.image} alt="" /> */}
          </Card>
        ))}
      </div>
    </div>
  );
}
