import React from "react";

const FavouritesList = ({favouriteWords}) => {
    const listFavourites = favouriteWords.map((data, index) => {
        return (
            <div key={index}>
                <h3>{data.word}</h3>
                <p>{data.meanings[0].definitions[0].definition}</p>
            </div>
        )
    })

    return (
        <div>{listFavourites}</div>
    )
}

export default FavouritesList;