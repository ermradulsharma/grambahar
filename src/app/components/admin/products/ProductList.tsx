'use client';

import { useState } from 'react';
import { Table, Button, Modal, Badge, Input, SearchInput, Tooltip } from '@/components/ui';
import { MOCK_ADMIN_INVENTORY, AdminInventoryItem } from '@/core/Helpers';
import styles from '@/components/admin/admin.module.css';

export default function ProductList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products] = useState<AdminInventoryItem[]>(MOCK_ADMIN_INVENTORY);
  const [searchQuery, setSearchQuery] = useState('');

  const headers = ['Product Name', 'Weight', 'Stock Status', 'Quantity', 'Price'];

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.weight.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ marginTop: '8px' }}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionHeading}>Product Inventory</h2>
          <p className={styles.sectionSubheading}>Manage artisanal Patali Gur batches, stock levels, and catalog prices</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <SearchInput
            placeholder="Filter products..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          />
          <Button onClick={() => setIsModalOpen(true)}>+ New Product</Button>
        </div>
      </div>

      <Table headers={headers}>
        {filteredProducts.map((product) => (
          <tr key={product.id}>
            <td style={{ fontWeight: 600 }}>{product.name}</td>
            <td>{product.weight}</td>
            <td>
              <Tooltip text={`Exact count: ${product.stock} units`}>
                <Badge variant={product.status === 'In Stock' ? 'success' : (product.status === 'Low Stock' ? 'warning' : 'error')}>
                  {product.status}
                </Badge>
              </Tooltip>
            </td>
            <td>{product.stock} units</td>
            <td style={{ fontWeight: 600 }}>{product.price}</td>
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
