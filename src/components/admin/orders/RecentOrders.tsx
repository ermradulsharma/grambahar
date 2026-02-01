import dynamic from 'next/dynamic';

const Table = dynamic(() => import('../../ui/data/Table'));
const Badge = dynamic(() => import('../../ui/base/Badge'));
const Dropdown = dynamic(() => import('../../ui/forms/Dropdown'), {
  loading: () => null
});

export default function RecentOrders() {
  const orders = [
    { id: '#GB-1001', customer: 'Rahul Sharma', product: 'Premium Patali Gur', amount: '₹ 499', status: 'Paid' },
    { id: '#GB-1002', customer: 'Priya Das', product: 'Super Saver Combo', amount: '₹ 899', status: 'Pending' },
    { id: '#GB-1003', customer: 'Amit Sen', product: 'Bulk Family Pack', amount: '₹ 1,720', status: 'Paid' },
    { id: '#GB-1004', customer: 'Sneha Roy', product: 'Premium Patali Gur', amount: '₹ 499', status: 'Paid' },
  ];

  const headers = ['Order ID', 'Customer', 'Product', 'Amount', 'Status'];

  return (
    <div style={{ marginTop: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: 'var(--primary-dark)' }}>Recent Orders</h2>
        <Dropdown
          label="Filter by Status"
          options={[
            { label: 'All', value: 'all' },
            { label: 'Paid', value: 'paid' },
            { label: 'Pending', value: 'pending' }
          ]}
          onSelect={(val) => console.log(val)}
        />
      </div>
      <Table headers={headers}>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.customer}</td>
            <td>{order.product}</td>
            <td>{order.amount}</td>
            <td>
              <Badge variant={order.status === 'Paid' ? 'success' : 'warning'}>
                {order.status}
              </Badge>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
