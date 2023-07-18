import axios from "axios";
import { useState, useEffect } from "react";
import ResidentInfo from "./ResidentInfo";

const Location=()=>{
    const [rickLocation, setrickLocation] = useState({});
    const [searchId, setSearchId] = useState("");
    
  
    useEffect(() => {
      //numero random 
      const randomId = Math.floor(Math.random() * 126 + 1);
  
      axios
        .get(`https://rickandmortyapi.com/api/location/${randomId}`)
        .then((resp) => {
          setrickLocation(resp.data);
        })
        .catch((error) => console.error(error));
    }, []);
  
    
  
    const submit = (e) => {
      //Un metodo que impide el comportamiento predeterminado del evento
      e.preventDefault();
  
      axios
        .get(`https://rickandmortyapi.com/api/location/${searchId}`)
        .then((resp) => {
          console.log(resp.data);
          setrickLocation(resp.data);
        })
        .catch((error) => console.error(error));
    };
  
   
  //paginacion
    const [currentPage, setCurrentPage] = useState(1);
    const rickPerPage = 8;
    
  
  
    const lastIndex = rickPerPage * currentPage; //uno mas
    const firstIndex = lastIndex - rickPerPage;
  
    const rickPaginated = rickLocation.residents?.slice(firstIndex, lastIndex);
  
    const totalPages = Math.ceil(rickLocation.residents?.length / rickPerPage);
   
    const pages = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    
    // conteo de los residentes
    let counter=0;
    for (let clave in rickLocation.residents){
     counter=Number(clave)+1;
    }     





    return(
<>

<section className='header'>
      <div className="locationContainer">
      <div className="location">
      <div className='tablet'>
      <h2>Nombre:</h2>
      <h2>Tipo:</h2>
      <h2> Dimension:</h2>
      <h2>Poblacion:</h2>
      </div>
      <div className='tablet'>
      <h2>{rickLocation.name}</h2>
      <h2>{rickLocation.type}</h2>
      <h2>{rickLocation.dimension}</h2>
      <h2>{counter}</h2>
      </div>
      </div>
      </div>
     </section >
     <section className="secBuscar">
      <form onSubmit={(e) => submit(e)}>
        <input
          type="text"
          placeholder="Type a location Id..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button type="submit">Buscar 🔍</button>
      </form>
      </section>
      {/*
              <button
              onClick={searchType}
              >
              Buscar
              </button>
              */}

   
      <section>
      <ul>
        {rickPaginated?.map((rick) => (
          
          <ResidentInfo key={rick
          } url={rick
          } />
            
        )) }
       
      </ul>
        </section>

        <section className="footer">
          
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <ul className="contButton">
      {pages.map((num) => (
        <li className="page" key={num} onClick={() => setCurrentPage(num)}><a className="active"></a>
          {num}
        </li>
      ))}
         </ul>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
      
      </section>

</>


    )


}
export default Location;