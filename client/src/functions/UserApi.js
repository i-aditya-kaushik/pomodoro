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
          if(res.data.house=="Gryffindor") setCharacteristics(...characteristics, ["DETERMINATION","CLEVERNESS","COURAGE"])
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

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    sortingdone: [sortingdone, setSorting],
    house: [house,setHouse],
    characteristics: [characteristics,setCharacteristics]
  };
}

export default UserApi;
