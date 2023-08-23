import { useEffect, useState } from 'react';

const ListOrders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await fetch('http://localhost:8081/orders');
      const jsonData = await response.json();

      setOrders(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  console.log(orders);
  return (
    <>
      {' '}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Pos Id.</th>
            <th>เลขที่บิล</th>
            <th>เลขที่บิลอ้างอิง</th>
            <th>Total</th>
            <th>ชื่อลูกค้า</th>
            <th>การจ่ายเงิน</th>
            <th>วันที่ซื้อ</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {orders.map((order) => (
            <tr key={order.pos_id}>
              <td>{order.pos_id}</td>
              <td>{order.pos_name}</td>
              <td>{order.amount_total}</td>
              <td>{order.pos_reference}</td>
              <td>{order.partner_name}</td>
              <td>{order.payment_method_name}</td>
              <td>{order.create_date}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListOrders;