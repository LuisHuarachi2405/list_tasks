import { DataGrid } from '@mui/x-data-grid';

function TableTask(props) {
  const { rows, columns, loading, ...baseProps } = props

  return ( 
    <DataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      pageSizeOptions={[5, 10]}
      {...baseProps}
    />
   );
}

export default TableTask;