
import { useEffect, useState } from "react";
import Table from "./Table";
import axios from "axios";
import swal from 'sweetalert';
import {BASE_URL} from "../helpers/general"; 
function AccountList() {
  const [data, setData] = useState([]);
  const [searchData, setsearchData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try{
      const res = await axios.get(`${BASE_URL.local}/accounts/`);
      setData(res.data.accounts);
      setsearchData(res.data.accounts);
      }
      catch (error) {
        swal("Erro!", "Error Getting data", "error");
      }
    };
     fetchData();
  }, []);
 const handleSearchData= 
  (e) => {
    const searchText = e.target.value.trim().toLowerCase();    
    if(searchText === ''){
      setsearchData(data);
    } else{
      setsearchData(data.filter(item=>{
        return e.target.value  === '' ? item : item.id.toLowerCase().includes(e.target.value) || item.name.toLowerCase().includes(e.target.value)
      }))
    }
    }
 
  return (
    <div >
        <input
          className="search"
          placeholder="Search..."
          onChange={handleSearchData}
        />
      {<Table data={searchData} />}
    </div>
  );
}

export default AccountList;