
import axios from "axios";
import { useState, useEffect } from "react";

const ResidentInfo = ({ url }) => {
  /*
        Utilizar la prop url para hacer una peticion que me devuelva el detalle de cada pokemon
    */
        const [ data, setData ] = useState({})

        useEffect(() => {
            
            axios
                .get(url)
                .then(resp => {
                    setData(resp.data)
                })
                .catch(error => console.error(error))
    
        }, [])
          
        let counter=0;
        for (let clave in data.episode){
         counter=Number(clave)+1;
        }

 
    
        return(
            <li>
                <div className="imgContainer">
                <img src={data.image} alt="" />
                {/* Condicion de los status*/}
                <h4>{data.status=='Dead' ? <label>🔴 {data.status}</label> 
                 :data.status=='Alive'? <label className="status">🟢 {data.status}</label> 
                 : <label className="status">⚪ {data.status}</label>  } </h4>
                </div>
                <h2>{data.name}</h2>
                <hr></hr>
                  <div className="inform">
                
                <div>
                <h5 className="labels">Species:</h5>   
                <h5 className="labels">Origin:</h5>
               <h5 className="labels">Times appear: </h5>
                </div>
                <div>
                 <h5> {data.species}</h5>
                 <h5>{data.origin?.name}</h5>
                 {/*Condicion del tiempo en plural y en singular */}
                 <h5>{counter} {counter>1? 'times': 'time'}</h5>
                </div>
                </div>
            </li>
        )
    }

export default ResidentInfo