import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "pos_name", headerName: "เลขที่บิล", flex: 1 },
    { field: "pos_reference", headerName: "เลขที่อ้างอิง", flex: 1 },
    { field: "amount_total", headerName: "ยอดรวม", flex: 1 },
    { field: "partner_name", headerName: "ชื่อลูกค้า", flex: 1 },
    { field: "payment_method_name", headerName: "วิธีจ่ายเงิน", flex: 1 },
    { field: "create_date", headerName: "วันที่", flex: 1 },
  ];

export default function Orders() {
    const [rows, setRows] = useState([]);
    const getOrders = () => {
        fetch("http://localhost:8081/orders")
          .then((response) => response.json())
          .then((json) => {
            setRows(json);
          });
      };
    
      useEffect(() => {
        getOrders();
      }, []);
  return (
    <div style={{ height: '100%', width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
    />
  </div>
  )
}
