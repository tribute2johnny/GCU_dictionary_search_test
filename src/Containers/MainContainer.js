import React, { useState, useEffect } from "react";
import Axios from "axios";
import FavouritesList from "../Components/FavouritesList";
import "./MainContainer.css";

const MainContainer = () => {

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [favouriteWords, setFavouriteWords] = useState([]);

    const getMeaning = () => {
        Axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`)
            .then((res) => {
                setData(res.data[0]);
            });
    }

    const addFavourite = (word) => {
        const newFavourite = [...favouriteWords, word];
        if (favouriteWords.includes(word) === false) {
            setFavouriteWords(newFavourite)
        }
    }

    const handleFavouriteClick = () => {
        addFavourite(data)
    }

    useEffect(() => {
        const favouriteWords = JSON.parse(localStorage.getItem('favs'));
        if (favouriteWords) {
            setFavouriteWords(favouriteWords);
        }
    }, [])

    useEffect(() => {
        if (favouriteWords.length > 0) { localStorage.setItem('favs', JSON.stringify(favouriteWords)) }
    }, [favouriteWords]);


    return (
        <div className="body">
            <div className="maincontainer">
                <div className="search">
                    <header className="header1">Search The Dictionary</header>

                    <div className="searchcontainer">
                        <input className="searchbar" type='text' placholder='search word here.' onChange={(input) => {
                            setSearchTerm(input.target.value)
                        }}
                        />

                        <button className="searchbutton" onClick={() => {
                            getMeaning();
                        }}
                        >search</button>
                    </div>

                    <div className="searchresult">
                        <h4 className="wordresult">{data.word}</h4>
                        {data.length === 0 ? <p className="defresult">Search for a word to see it's definition.</p> : <p className="defresult">{data.length ?? data.meanings[0].definitions[0].definition}</p>}
                        {data.length === 0 ? <></> : <button className="favsbutton" onClick={handleFavouriteClick}>Add to Favourites</button>}
                    </div>
                </div>


                <div className="favslist">
                    <div>
                        <h2 className="header2">My Favourite Words</h2>
                        <FavouritesList favouriteWords={favouriteWords} />
                    </div>
                </div>
            </div>
            <footer className="footer">This application was made using the Free Dictionary API :  <a href="https://dictionaryapi.dev/">https://dictionaryapi.dev/</a></footer>
        </div>
    )

}

export default MainContainer;