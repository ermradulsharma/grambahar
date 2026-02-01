'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Card = dynamic(() => import('../../ui/base/Card'));
const Input = dynamic(() => import('../../ui/forms/Input'));
const Button = dynamic(() => import('../../ui/base/Button'));

export default function SettingsManager() {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: 'var(--primary-dark)' }}>Site Global Settings</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <Card padding="30px">
          <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>SEO & Meta Information</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Input label="Site Title" defaultValue="GramBahar | Authentic Taste of Nature" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--primary-dark)' }}>Meta Description</label>
              <textarea
                rows={3}
                style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #e0e0e0', fontFamily: 'inherit' }}
                defaultValue="GramBahar: Discover pure, Patali Gur – a Bengal delicacy with rich, natural sweetness."
              />
            </div>
            <Input label="Keywords (Comma separated)" defaultValue="Patali Gur, Jaggery, Farm Fresh, Authentic" />
            <Button style={{ width: 'fit-content' }}>Update SEO</Button>
          </div>
        </Card>

        <Card padding="30px">
          <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Contact & Social Support</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Input label="Business Phone" defaultValue="+91 9531536706" />
            <Input label="WhatsApp Number" defaultValue="+91 9531536706" />
            <Input label="Business Email" defaultValue="hello@grambahar.com" />
            <Input label="Instagram URL" defaultValue="https://instagram.com/grambahar" />
            <Button style={{ width: 'fit-content' }}>Save Contact Info</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
