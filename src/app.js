import { useState, useEffect } from "react";
import Table from './component/Table';
import useInput from "./hooks/useInput";
import { generateTreasureMap } from "./utils/map";

export default function App() {
  const [mapData, setMapData] = useState([]);
  const rowInput = useInput(10);
  const colInput = useInput(25);

  function createMap(e) {
    e?.preventDefault()
    const { map, itemInfo } = generateTreasureMap(rowInput.value, colInput.value);
    console.table(map)
    console.table(itemInfo)

    setMapData(map);
  }

  useEffect(() => createMap(), [])

  return (
    <>
      <form onSubmit={createMap}>
        <div className="input-group mb-3">
          <input id="col" type="number" min="3" {...rowInput} className="form-control" required />
          <input id="row" type="number" min="3" {...colInput} className="form-control" required />
          <button className="btn btn-primary">產生</button>
        </div>
      </form>
      <div className="table-responsive">
        <Table tableData={mapData} />
      </div>
    </>
  )
}
