'use client';

import { useState, useEffect } from 'react';
import { Table, Button, Modal, Badge, Input, SearchInput, Tooltip, Card } from '@/components/ui';
import { Plus, History, ShieldAlert, ArrowDown, ArrowUp, RefreshCw } from 'lucide-react';
import {
  getMockInventory,
  getInventoryLogs,
  mutateInventoryStock,
  addMockProduct,
  AdminInventoryItem,
  InventoryMutationLog
} from '@/core/Helpers';
import styles from '@/components/admin/admin.module.css';

export default function ProductList() {
  const [products, setProducts] = useState<AdminInventoryItem[]>([]);
  const [logs, setLogs] = useState<InventoryMutationLog[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<AdminInventoryItem | null>(null);
  const [adjustmentDelta, setAdjustmentDelta] = useState<number>(10);
  const [adjustmentReason, setAdjustmentReason] = useState('New artisanal batch arrived');
  const [adjustError, setAdjustError] = useState<string | null>(null);
  const [showLogs, setShowLogs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // New Product Form State
  const [newProd, setNewProd] = useState({
    name: '',
    weight: '',
    stock: 25,
    price: '₹ 499'
  });

  const refreshData = () => {
    setProducts(getMockInventory());
    setLogs(getInventoryLogs());
  };

  useEffect(() => {
    refreshData();
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ store: string }>;
      if (ce.detail?.store === 'inventory' || ce.detail?.store === 'orders') {
        refreshData();
      }
    };
    window.addEventListener('gb_mock_store_update', handler);
    return () => window.removeEventListener('gb_mock_store_update', handler);
  }, []);

  const handleAdjustStock = () => {
    if (!selectedProduct) return;
    setAdjustError(null);
    const result = mutateInventoryStock(selectedProduct.id, adjustmentDelta, adjustmentReason);
    if (!result.success) {
      setAdjustError(result.error || 'Failed to adjust stock');
      return;
    }
    setIsAdjustModalOpen(false);
    refreshData();
  };

  const handleAddProduct = () => {
    if (!newProd.name.trim()) return;
    addMockProduct({
      name: newProd.name.trim(),
      weight: newProd.weight.trim() || '500gm',
      stock: Number(newProd.stock) || 10,
      price: newProd.price.trim().startsWith('₹') ? newProd.price : `₹ ${newProd.price}`
    });
    setIsModalOpen(false);
    setNewProd({ name: '', weight: '', stock: 25, price: '₹ 499' });
    refreshData();
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.weight.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const headers = ['Product Name', 'Weight', 'Stock Status', 'Quantity', 'Price', 'Stock Action'];

  return (
    <div style={{ marginTop: '8px', animation: 'fadeIn 0.3s ease-in-out' }}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionHeading}>Product Inventory & Stock Mutations</h2>
          <p className={styles.sectionSubheading}>
            Live inventory tracking with atomic stock adjustments and immutable ACID mutation logs
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <SearchInput
            placeholder="Filter products..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="secondary"
            onClick={() => setShowLogs(!showLogs)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <History size={15} /> {showLogs ? 'Hide Audit Log' : 'View Audit Log'}
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> New Product
          </Button>
        </div>
      </div>

      <Table headers={headers}>
        {filteredProducts.map((product) => (
          <tr key={product.id}>
            <td style={{ fontWeight: 600, color: 'var(--foreground)' }}>{product.name}</td>
            <td style={{ color: 'var(--slate-500)', fontSize: '0.8125rem' }}>{product.weight}</td>
            <td>
              <Tooltip text={`Exact count: ${product.stock} units`}>
                <Badge variant={product.status === 'In Stock' ? 'success' : (product.status === 'Low Stock' ? 'warning' : 'error')}>
                  {product.status}
                </Badge>
              </Tooltip>
            </td>
            <td style={{ fontWeight: 600, color: 'var(--foreground)' }}>
              {product.stock} units
            </td>
            <td style={{ fontWeight: 600 }}>{product.price}</td>
            <td>
              <button
                onClick={() => {
                  setSelectedProduct(product);
                  setAdjustError(null);
                  setIsAdjustModalOpen(true);
                }}
                style={{
                  background: 'var(--bg-light)',
                  border: '1px solid var(--border-medium)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--foreground)',
                  transition: 'all 0.15s ease'
                }}
              >
                Adjust Stock
              </button>
            </td>
          </tr>
        ))}
      </Table>

      {/* Simulated ACID Audit Log Drawer */}
      {showLogs && (
        <div style={{ marginTop: '24px' }}>
          <Card padding="20px">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <History size={18} color="var(--primary)" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>
                  Inventory Mutation Audit Trail (Mongoose ACID Simulation)
                </h3>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                {logs.length} transactions recorded
              </span>
            </div>

            {logs.length === 0 ? (
              <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', fontStyle: 'italic' }}>
                No inventory mutations executed yet in this session. Adjust stock or dispatch an order to record transactions.
              </p>
            ) : (
              <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                <Table headers={['Tx ID', 'Product', 'Delta', 'Previous', 'New Stock', 'Reason', 'Time']}>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--slate-500)' }}>{log.id}</td>
                      <td style={{ fontWeight: 600 }}>{log.productName}</td>
                      <td style={{ fontWeight: 700, color: log.delta < 0 ? '#ef4444' : '#10b981' }}>
                        {log.delta > 0 ? `+${log.delta}` : log.delta}
                      </td>
                      <td>{log.previousStock}</td>
                      <td style={{ fontWeight: 600 }}>{log.newStock}</td>
                      <td style={{ fontSize: '0.8125rem', color: 'var(--slate-600)' }}>{log.reason}</td>
                      <td style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>{log.timestamp}</td>
                    </tr>
                  ))}
                </Table>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Adjust Stock Modal */}
      <Modal
        isOpen={isAdjustModalOpen}
        onClose={() => setIsAdjustModalOpen(false)}
        title={`Adjust Stock: ${selectedProduct?.name || ''}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '12px', background: 'var(--bg-light)', borderRadius: '8px', fontSize: '0.8125rem' }}>
            Current Available Stock: <strong>{selectedProduct?.stock} units</strong> ({selectedProduct?.status})
          </div>

          {adjustError && (
            <div style={{ padding: '10px 14px', background: 'rgba(239, 68, 68, 0.1)', color: '#dc2626', borderRadius: '8px', fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={16} /> {adjustError}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Adjustment Quantity (Positive to Restock, Negative to Deduct)</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setAdjustmentDelta(-1)}
                style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid var(--border-medium)', background: 'var(--surface)', cursor: 'pointer', fontWeight: 700 }}
              >
                -1
              </button>
              <button
                type="button"
                onClick={() => setAdjustmentDelta(-5)}
                style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid var(--border-medium)', background: 'var(--surface)', cursor: 'pointer', fontWeight: 700 }}
              >
                -5
              </button>
              <input
                type="number"
                value={adjustmentDelta}
                onChange={e => setAdjustmentDelta(Number(e.target.value))}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-medium)',
                  background: 'var(--surface)',
                  color: 'var(--foreground)',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}
              />
              <button
                type="button"
                onClick={() => setAdjustmentDelta(10)}
                style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid var(--border-medium)', background: 'var(--surface)', cursor: 'pointer', fontWeight: 700 }}
              >
                +10
              </button>
              <button
                type="button"
                onClick={() => setAdjustmentDelta(50)}
                style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid var(--border-medium)', background: 'var(--surface)', cursor: 'pointer', fontWeight: 700 }}
              >
                +50
              </button>
            </div>
          </div>

          <Input
            label="Transaction Audit Reason *"
            value={adjustmentReason}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAdjustmentReason(e.target.value)}
            placeholder="e.g. Fresh winter date palm batch processed"
          />

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <Button onClick={handleAdjustStock} style={{ flex: 1 }}>
              Commit Mutation (ACID Safe)
            </Button>
            <Button variant="outline" onClick={() => setIsAdjustModalOpen(false)} style={{ flex: 1 }}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Patali Gur Product"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="Product Title *"
            value={newProd.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewProd({ ...newProd, name: e.target.value })}
            placeholder="e.g. Handcrafted Nolen Gur Tub"
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input
              label="Weight / Size *"
              value={newProd.weight}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewProd({ ...newProd, weight: e.target.value })}
              placeholder="e.g. 750gm"
            />
            <Input
              label="Initial Stock Inventory *"
              type="number"
              value={newProd.stock}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewProd({ ...newProd, stock: Number(e.target.value) })}
              placeholder="30"
            />
          </div>
          <Input
            label="Retail Price (₹) *"
            value={newProd.price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewProd({ ...newProd, price: e.target.value })}
            placeholder="₹ 599"
          />

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <Button onClick={handleAddProduct} style={{ flex: 1 }}>Add to Catalog</Button>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} style={{ flex: 1 }}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
