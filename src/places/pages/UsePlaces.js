import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

const DUMMY_PLACES=[{
    id:'p1',
    title:"Infopark Kochi",
    description:"Information technology park situated in the city of Kochi, Kerala, India",
    imageURL:"https://infopark.in/assets/images/slider/homeBanner2.jpg",
    address:"Phase 1, Info Road, Near Tapasya Block Kakkanad, Kochi, Kerala 682042",
    location:{
        lat:10.0115718,
        lng:76.3599615
    },
    creator:'u1'
},{
    id:'p2',
    title:"Infopark Kochi",
    description:"Information technology park situated in the city of Kochi, Kerala, India",
    imageURL:"https://infopark.in/assets/images/slider/homeBanner2.jpg",
    address:"Phase 1, Info Road, Near Tapasya Block Kakkanad, Kochi, Kerala 682042",
    location:{
        lat:10.0115718,
        lng:76.3599615
    },
    creator:'u2'
}
]

const UserPlaces = () => {
    const userId = useParams().userId
    const loadedPlaces = DUMMY_PLACES.filter(place=>place.creator === userId)
    return<PlaceList items={loadedPlaces}/>   
}

export default UserPlaces;