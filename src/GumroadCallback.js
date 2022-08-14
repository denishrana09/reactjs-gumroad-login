import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function GumroadCallback() {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const businessLogic = async () => {
      const { data } = await axios({
        url: "https://api.gumroad.com/oauth/token",
        data: {
          code: location.search.split("code=")[1],
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SECRET,
          redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        },
        method: "post",
      });

      const { data: userData } = await axios({
        url: `https://api.gumroad.com/v2/user?access_token=${data.access_token}`,
        method: "get",
      });
      setData(userData);
      const { data: productsData } = await axios({
        url: `https://api.gumroad.com/v2/products?access_token=${data.access_token}`,
        method: "get",
      });
      setProducts(productsData);
    };
    businessLogic();
  }, [location]);

  return (
    <div>
      {data ? <div>{JSON.stringify(data.user)}</div> : <div>Loading</div>}

      {products.length ? (
        <>
          <h3>Products</h3>
          {products.map((p) => (
            <div>{p.name}</div>
          ))}
        </>
      ) : null}
    </div>
  );
}
