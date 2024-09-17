import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useMediaQuery } from 'react-responsive';

const Table = (props) => {
  const { columns, data, setSelectedItem, selectedItem } = props;
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="w-full overflow-x-auto">
      <DataTable
        selectionMode="single"
        selection={selectedItem}
        value={data}
        paginator
        rows={isMobile ? 3 : 5}
        onSelectionChange={(e) => setSelectedItem(e.value)}
        rowsPerPageOptions={isMobile ? [3, 5, 10] : [5, 10, 25, 50]}
        showGridlines
        stripedRows
        removableSort
        className="w-full"
        scrollable
        
        scrollHeight="400px"
      >
        {columns.map((column, idx) => (
          <Column
            key={idx}
            sortable
            field={column.field}
            header={column.header}
            className="text-center"
            style={{minWidth: isMobile ? '150px' : '200px'}}
            bodyClassName="truncate"
          />
        ))}
      </DataTable>
    </div>
  );
};

export default Table;