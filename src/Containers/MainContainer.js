import React, { useState , useEffect} from "react";
import Axios from 'axios';

const MainContainer = () => {

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getMeaning = () => {
        Axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`)
        .then((res) => {
            setData(res.data[0]);
        });
        
    }

    return (
        <div>
            <header>Search The Dictionary</header>

            <div>
                <input type='text' placholder='search word here.' onChange={ (input) => {
                    setSearchTerm(input.target.value)
                }}
                />
            </div>

            <div>
                <h4>{data.word}</h4>
            </div>
        </div>
    )

}

export default MainContainer;