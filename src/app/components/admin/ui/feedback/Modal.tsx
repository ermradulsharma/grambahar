import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }} onClick={onClose}>
      <div style={{
        background: 'var(--white)',
        padding: '30px',
        borderRadius: '20px',
        width: '500px',
        maxWidth: '90%',
        boxShadow: 'var(--shadow-medium)',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: 'var(--primary-dark)', fontFamily: 'var(--font-heading)' }}>{title}</h2>
          <button onClick={onClose} style={{ fontSize: '1.5rem', opacity: 0.5 }}>×</button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
