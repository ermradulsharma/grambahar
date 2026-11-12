import React from 'react';
import styles from '@/components/admin/admin.module.css';

interface TableProps {
    headers: string[];
    children: React.ReactNode;
}

export default function Table({ headers, children }: TableProps) {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    );
}
