import React from 'react'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'

const Table = (props) => {
    const {columns, data, setSelectedItem, selectedItem} = props;

  return (
    <DataTable  selectionMode="single" selection={selectedItem} value = {data} paginator rows={5} onSelectionChange={(e) => {setSelectedItem(e.value)}} rowsPerPageOptions={[5, 10, 25, 50]} showGridlines stripedRows tableStyle={{minWidth: '60vw'}} removableSort>
        {columns.map((column, idx) => {
            return <Column sortable key={idx} field={column.field} header={column.header}/>
        })}
    </DataTable>
  )
}

export default Table