import { getGases,deleteGas } from "../api/gas.api"
import { useGas } from "../contexto/GasContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Table.css";
export default function TableDataGas() {

  const {gas,setGas}=useGas();
  const navigate = useNavigate();
  

  const handleDelete = async (id) => {
    try {
      const response = await deleteGas(id);
      navigate("/")
      console.log("Lo esta eliminando")
      alert("Eliminado, recarga para ver cambios")
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    async function loadData(){
      const response= await getGases()
      setGas(response.data)
      console.log(response.data);
      let hola = JSON.stringify(response.data);
      console.log("data " + hola.split("/activa"))
    }
   
    loadData();
  }, []);


  const renderMain = () => {
    if (gas.length === 0) {
      return  <a href="/registro">No gas stations find, Click here to create new</a>
      
    }
    return gas.map((g) => (
      <>
      <div className="table-wrapper">
      <table className="fl-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>nombre_gasolinera</th>
            <th>ubicacion</th>
            <th>activa</th>
            <th>total_gasolineras</th>
            <th>telefono</th>
            <th>actions</th>
          </tr>
        </thead>

        <tbody>
          <tr key={g.id}>
            <td>{g.id}</td>
            <td>{g.nombre_gasolinera}</td>
            <td>{g.ubicacion}</td>
            <td>{g.activa.toString()}</td>
            <td>{g.total_gasolineras}</td>
            <td>{g.telefono}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => {
                  handleDelete(g.id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      </>
    ));
  };


  return (
    <>
      <h1>Gas stations: </h1>
      {renderMain()}
    </>
  );
}
