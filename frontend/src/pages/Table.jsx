import { useState } from 'react';
import AccountButton from '../components/AccountButton';
import DataTable from "react-data-table-component";

const Table = ({ data }) => {
  const columns = [
    {
      id: 1,
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      reorder: true,
    },
    {
      id: 2,
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      reorder: true,
    },
    {
      id: 3,
      name: "Balance",
      selector: (row) => row.balance,
      sortable: true,
      right: true,
      reorder: true,
    },
    {
      id: 4,
      name: "profile",
      selector: (row) => row.profile,

    },
  ];
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };
  const [page, setPage] = useState(5);
  const [perPage, setPerPage] = useState(10);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = (currentRowsPerPage, currentPage) => {
    setPerPage(currentRowsPerPage);
    setPage(currentPage);
  };
    return (
      <DataTable
        title="data"
        columns={columns}
        data={data.map(item=>{
          return {...item , "profile" : <AccountButton name={item.name} id={item.id} balance={item.balance} />
        }})}
        defaultSortFieldId={3}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        selectableRows
        paginationDefaultPage={page}
        paginationPerPage={perPage}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
      />
    );
  };
  
  export default Table;

