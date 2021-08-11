import React, { useState, useEffect } from "react";
import axios from "axios";

function UserApi(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [house, setHouse] = useState("");
  const [isloading,setisloading] = useState(false);
  const [sortingdone, setSorting] = useState(true);
  const [worktime, setworktime] = useState(25);
  const [shortbreak, setshortbreak] = useState(5);
  const [longbreak, setlongbreak] = useState(20);
  const [autochange,setautochange] = useState(false)
  const [tags,setTags] = useState([])
  const [usertag,setusertag] = useState([])
  const [characteristics,setCharacteristics] = useState([])
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          setisloading(true)
          const res = await axios.get("/user/info", {
            headers: { Authorization: token },
          });
          const response1 = await axios.get(
          "/user/gettagsuser", {
              headers: { Authorization: token },
            }
          );
          setusertag(response1.data.tags)
          setautochange(res.data.autochange)
          setworktime(res.data.work_duration)
          setshortbreak(res.data.short_break_duration)
          setlongbreak(res.data.long_break_duration)
          setisloading(false)
          setIsLogged(true);
          setHouse(res.data.house)
          setTags(res.data.tags)
          if(tags.length==0){
            axios.post(
            "user/addtags",
            { name:"Harry Potter Fan" },
            {
                headers: { Authorization: token },
            }
            );
          } 
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
    isloading: [isloading,setisloading],
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    tags: [tags,setTags],
    sortingdone: [sortingdone, setSorting],
    house: [house,setHouse],
    characteristics: [characteristics,setCharacteristics],
    usertag : [usertag,setusertag],
    worktime:[worktime, setworktime],
    shortbreak:[shortbreak, setshortbreak],
    longbreak:[longbreak, setlongbreak],
    autochange: [autochange,setautochange]
  };
}

export default UserApi;
