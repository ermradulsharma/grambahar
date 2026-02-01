'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const Table = dynamic(() => import('../../ui/data/Table'), {
  loading: () => <p>Loading Table...</p>
});

const Button = dynamic(() => import('../../ui/base/Button'), {
  loading: () => <button>...</button>
});

const Modal = dynamic(() => import('../../ui/feedback/Modal'), {
  loading: () => null
});

const Badge = dynamic(() => import('../../ui/base/Badge'), {
  loading: () => <span>...</span>
});

const Input = dynamic(() => import('../../ui/forms/Input'), {
  loading: () => <div style={{ height: '40px', background: '#eee' }}></div>
});

const SearchInput = dynamic(() => import('../../ui/forms/SearchInput'), {
  loading: () => <div style={{ width: '300px', height: '40px', background: '#eee' }}></div>
});

const Tooltip = dynamic(() => import('../../ui/feedback/Tooltip'), {
  loading: () => null
});

export default function ProductList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = [
    { name: 'Premium Patali Gur', weight: '750gm', stock: 45, price: '₹ 499', status: 'In Stock' },
    { name: 'Super Saver Combo (Small)', weight: '700gm + 750gm', stock: 8, price: '₹ 899', status: 'Low Stock' },
    { name: 'Bulk Family Pack', weight: '1.4kg + 1.5kg', stock: 15, price: '₹ 1,720', status: 'In Stock' },
  ];

  const headers = ['Product Name', 'Weight', 'Stock Status', 'Quantity', 'Price'];

  return (
    <div style={{ marginTop: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '20px' }}>
        <h2 style={{ color: 'var(--primary-dark)' }}>Product Inventory</h2>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <SearchInput placeholder="Filter products..." />
          <Button onClick={() => setIsModalOpen(true)}>+ New Product</Button>
        </div>
      </div>

      <Table headers={headers}>
        {products.map((product, index) => (
          <tr key={index}>
            <td>{product.name}</td>
            <td>{product.weight}</td>
            <td>
              <Tooltip text={`Exact count: ${product.stock} units`}>
                <Badge variant={product.status === 'In Stock' ? 'success' : 'warning'}>
                  {product.status}
                </Badge>
              </Tooltip>
            </td>
            <td>{product.stock} units</td>
            <td>{product.price}</td>
          </tr>
        ))}
      </Table>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Product"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <p>Complete the details to add a new Patali Gur product.</p>
          <Input label="Product Name" placeholder="e.g. Premium Patali Gur" />
          <div style={{ display: 'flex', gap: '15px' }}>
            <Input label="Weight/Size" placeholder="e.g. 750gm" />
            <Input label="Initial Stock" type="number" placeholder="45" />
          </div>
          <Input label="Price (₹)" type="number" placeholder="499" />

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <Button variant="primary" onClick={() => setIsModalOpen(false)} style={{ flex: 1 }}>Save Product</Button>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} style={{ flex: 1 }}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
