'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Card = dynamic(() => import('../../ui/base/Card'));
const Input = dynamic(() => import('../../ui/forms/Input'));
const Button = dynamic(() => import('../../ui/base/Button'));
const Tabs = dynamic(() => import('../../ui/navigation/Tabs'));

export default function ContentManager() {
  const [activeTab, setActiveTab] = React.useState('hero');

  const contentTabs = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'about', label: 'About Story' },
    { id: 'contact', label: 'Contact Section' },
  ];

  return (
    <div style={{ marginTop: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: 'var(--primary-dark)' }}>Website Content Manager</h2>
      <Card padding="30px">
        <Tabs tabs={contentTabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'hero' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Input label="Main Title" defaultValue="Authentic Taste of Nature" />
            <Input label="Subtitle" defaultValue="Discover pure, Farm-Fresh Patali Gur – a traditional Bengal delicacy handcrafted with love." />
            <div style={{ display: 'flex', gap: '15px' }}>
              <Input label="Primary CTA Label" defaultValue="Explore Products" />
              <Input label="Primary CTA Link" defaultValue="#products" />
            </div>
            <Button style={{ width: 'fit-content' }}>Save Hero Changes</Button>
          </div>
        )}

        {activeTab === 'about' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Input label="Section Subtitle" defaultValue="Our Story" />
            <Input label="Section Title" defaultValue="Handcrafted Tradition from the Heart of Bengal" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--primary-dark)' }}>About Text (Paragraph 1)</label>
              <textarea
                rows={4}
                style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #e0e0e0', fontFamily: 'inherit' }}
                defaultValue="GramBahar was born out of a desire to preserve the authentic flavors of our childhood..."
              />
            </div>
            <Button style={{ width: 'fit-content' }}>Save About Section</Button>
          </div>
        )}

        {activeTab === 'contact' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Input label="Footer Title" defaultValue="Experience Genuine Purity" />
            <Input label="Footer Subtitle" defaultValue="Ready to taste the authentic flavors of Bengal?" />
            <Button style={{ width: 'fit-content' }}>Save Contact Section</Button>
          </div>
        )}
      </Card>
    </div>
  );
}
