import { getMapDataXY } from '../utils/tool';

const Table = ({ tableData }) => {
  const [sizeX, sizeY] = getMapDataXY(tableData);
  function Row({ rowData, iX }) {
    return (
      <tr>
        <th>{iX + 1}</th>
        {rowData.map((cell, iY) => {
          const cellData = {
            'data-item': cell.data?.label,
            'data-name': cell.data?.name,
            'data-qty': cell?.qty,
          }
          return (
            <td {...cellData} key={`${iX}${iY}`}>
              {iX + 1},{iY + 1}
            </td>
            )
        })}
      </tr>
    )
  }

  return (
    <table className='table table-bordered'>
      <thead>
        <tr>
          {[...Array(sizeX + 1).keys()].map((x) => <th key={x}>{x}</th>)}
        </tr>
      </thead>
      <tbody>
        { tableData.length > 0 ? tableData.map((row, i) => <Row rowData={row} iX={i} key={`${i}`} />) : <tr></tr>}
      </tbody>
    </table>
  )
}

export default Table;