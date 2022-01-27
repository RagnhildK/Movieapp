import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

const Rating = () => {
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState();
    const [abstract, setAbstract] = useState();
    const [id, setId] = useState(0)

    const baseURL = 'https://api.themoviedb.org/3/movie/popular?api_key=72c828341c35299683ab545ba90e7f50&language=en-US&page=1'
    const getMovie = async () => {
        try {
            const response = await fetch(baseURL);
            const json = await response.json();
            handleResponse(json);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleResponse = (response) => {
        setMovies(response) 
    }

    const handleClick = () => {
        getMovie()
    }

    const displayNewMovie = () => {
        setTitle(movies.results[id].title)
        setAbstract(movies.results[id].overview)
        setId((id < movies.results.length-1)? id+1 : id)
    }

    return (
        <View>
            <Button onClick={handleClick}>Hent filmer</Button>
            <Button onClick={displayNewMovie}>Vis ny film</Button>
            <Text> Title: {title} </Text>
            <Text> Abstract: {abstract} </Text>
        </View>
    );
}

export default Rating;