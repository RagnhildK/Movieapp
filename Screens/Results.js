import React from "react";
import { View } from "react-native";
import ResultMovie from "../components/Movie/ResultMovie";

export default function Result() {

    return (
       <View>
           {/* Map fra redux til ResultMovie objekter */}
          <ResultMovie title={'Spider-Man: No Way Home'} posterPath={'/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'}/> 
       </View> 
    )    
}
