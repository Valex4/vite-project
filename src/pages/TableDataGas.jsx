import { getGases,deleteGas } from "../api/gas.api"
import { useGas } from "../contexto/GasContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    }
   
    loadData();
  }, []);


  const renderMain = () => {
    if (gas.length === 0) {
      return <h1>No gasolinera find</h1>;
    }
    return gas.map((g) => (
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>nombre_gasolinera</th>
            <th>ubicacion</th>
            <th>activa</th>
            <th>total_gasolineras</th>
            <th>telefono</th>
          </tr>
        </thead>

        <tbody>
          <tr key={g.id}>
            <td>{g.nombre_gasolinera}</td>
            <td>{g.ubicacion}</td>
            <td>{g.activa}</td>
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
    ));
  };


  return (
    <>
      <h1>gasolineras: </h1>
      {renderMain()}
    </>
  );
}
