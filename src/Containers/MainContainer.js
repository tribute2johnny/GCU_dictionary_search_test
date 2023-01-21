import React, { useState , useEffect} from "react";
import Axios from 'axios';
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
        if (favouriteWords.length > 0) {localStorage.setItem('favs', JSON.stringify(favouriteWords))}
    }, [favouriteWords]);

    return (
        <div>
            <header>Search The Dictionary</header>

            <div>
                <input type='text' placholder='search word here.' onChange={ (input) => {
                    setSearchTerm(input.target.value)
                }}
                />

                <button onClick={ () => {
                getMeaning();
                }}
                >search</button>
            </div>

            <div>
                <h4>{data.word}</h4>
               {data.length === 0 ? <>search a word to see it's definition</>: <p>{data.length ?? data.meanings[0].definitions[0].definition}</p>}
            </div>
            <button onClick={handleFavouriteClick}>Add to Favourites</button>

            <div>
                <FavouritesList favouriteWords={favouriteWords} />
            </div>
        </div>
    )

}

export default MainContainer;