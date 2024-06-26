import React,{useEffect,useState} from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserPlaces = () => {
    const {isLoading,error,sendRequest,clearError} = useHttpClient();
    const [loadedPlaces,setLoadedPlaces] = useState()
    const userId = useParams().userId
    useEffect(()=>{
        const fetchPlaces = async () =>{
            try{
                const response = await sendRequest(process.env.REACT_APP_BACKEND_URL+`/api/places/user/${userId}`)
                
                setLoadedPlaces(response.places)
                console.log(response)
                
            }catch(err){

            }
        }
        fetchPlaces();
    },[sendRequest,userId])

    const placeDeletedHandler = deletedPlaceId => {
        setLoadedPlaces(prevPlaces =>
          prevPlaces.filter(place => place.id !== deletedPlaceId)
        );
      };
    return(
    <>
    <ErrorModal error={error} onClear={clearError}/>
    {isLoading && <div className="center"><LoadingSpinner on/></div>}
    {!isLoading && loadedPlaces && <PlaceList items = {loadedPlaces} onDeletePlace={placeDeletedHandler} />} 
    </>)  
}

export default UserPlaces;