import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

const Table = (props) => {
  const { columns, data, setSelectedItem, selectedItem } = props;

  return (
    <div className="w-full p-4">
      <DataTable
        selectionMode="single"
        selection={selectedItem}
        value={data}
        paginator
        rows={5}
        onSelectionChange={(e) => setSelectedItem(e.value)}
        rowsPerPageOptions={[5, 10, 25, 50]}
        showGridlines
        stripedRows
        removableSort
        className="w-[80vw] sm:w-fit h-fit"
      >
        {columns.map((column, idx) => (
          <Column
            key={idx}
            sortable
            field={column.field}
            header={column.header}
            className="text-center"
            style={{minWidth: '9vw'}}
          />
        ))}
      </DataTable>
    </div>
  );
};

export default Table;