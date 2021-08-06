import React, { useState, useEffect } from "react";
import axios from "axios";

function UserApi(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [house, setHouse] = useState("");
  const [sortingdone, setSorting] = useState(true);
  const [characteristics,setCharacteristics] = useState([])
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/info", {
            headers: { Authorization: token },
          });
          setIsLogged(true);
          setHouse(res.data.house)
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          res.data.num_login > 1 ? setSorting(true) : setSorting(false)
          if(res.data.house=="Gryffindor") setCharacteristics(...characteristics, ["COURAGE","CLEVERNESS","DETERMINATION"])
          if(res.data.house=="Slytherin") setCharacteristics(...characteristics, ["DETERMINATION","INTELLECT","AMBITION"])
          if(res.data.house=="Ravenclaw") setCharacteristics(...characteristics, ["WIT","DEDICATION","WISDOM"])
          if(res.data.house=="Hufflepuff") setCharacteristics(...characteristics, ["LOYALTY","CHIVALRY","PATIENCE"])
        } catch (err) {
          alert(err.response.data.msg);
        }
      };

      getUser();
    }
  }, [token]);

  const addCart = async product => {
    if (!isLogged) return alert("Please login to continue buying");

    const check = cart.every(item => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await axios.patch(
        "/user/addcart",
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
    } else {
      alert("This product has been added to cart.");
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    sortingdone: [sortingdone, setSorting],
    house: [house,setHouse],
    characteristics: [characteristics,setCharacteristics]
  };
}

export default UserApi;
