'use client';

import React from 'react';
import { Card, Input, Button } from '@/components/ui';
import styles from '@/components/admin/admin.module.css';

import { Save, RefreshCw, Shield, Bell, ShoppingBag, Globe, Lock, AlertTriangle, CreditCard, Users, Database, Download, FileText, Mail, Palette, Smartphone, Truck, Scale, MessageSquare } from 'lucide-react';

export default function SettingsManager() {
    return (
        <div style={{ marginTop: '8px', paddingBottom: '40px' }}>
            <div className={styles.sectionHeader}>
                <div>
                    <h2 className={styles.sectionHeading}>Site Global Settings</h2>
                    <p className={styles.sectionSubheading}>Configure SEO, store policies, notifications, and security protocols</p>
                </div>
                <Button style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Save size={16} /> Save All Changes
                </Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>

                {/* SEO & Meta */}
                <Card padding="30px">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: 'var(--primary)' }}>
                        <Globe size={20} />
                        <h3 style={{ margin: 0 }}>SEO & Meta Information</h3>
                    </div>
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
                        <Input label="Keywords" defaultValue="Patali Gur, Jaggery, Farm Fresh, Authentic" />
                    </div>
                </Card>

                {/* Contact & Social */}
                <Card padding="30px">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: 'var(--primary)' }}>
                        <ShoppingBag size={20} />
                        <h3 style={{ margin: 0 }}>Store Configuration</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <Input label="Business Phone" defaultValue="+91 9531536706" />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <Input label="Delivery Charge (₹)" type="number" defaultValue="50" />
                            <Input label="Free Shipping Above (₹)" type="number" defaultValue="999" />
                        </div>
                        <Input label="Support Email" defaultValue="hello@grambahar.com" />
                    </div>
                </Card>

                {/* Notifications */}
                <Card padding="30px">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: 'var(--primary)' }}>
                        <Bell size={20} />
                        <h3 style={{ margin: 0 }}>Notification Preferences</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {[
                            { label: 'New Order Alerts', desc: 'Get notified when a new order is placed', checked: true },
                            { label: 'Low Stock Warnings', desc: 'Alert when product stock is below 10', checked: true },
                            { label: 'New Customer Signups', desc: 'Notification for new account registrations', checked: false }
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i !== 2 ? '1px solid #eee' : 'none' }}>
                                <div>
                                    <div style={{ fontWeight: '500', color: 'var(--foreground)' }}>{item.label}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>{item.desc}</div>
                                </div>
                                <input type="checkbox" defaultChecked={item.checked} style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }} />
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Security & Access */}
                <Card padding="30px">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: 'var(--primary)' }}>
                        <Shield size={20} />
                        <h3 style={{ margin: 0 }}>Security & Access</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', background: 'var(--bg-light)', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Lock size={18} color="var(--slate-500)" />
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Two-Factor Authentication</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>Extra layer of security</div>
                                </div>
                            </div>
                            <Button variant="secondary" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>Enable</Button>
                        </div>

                        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
                            <h4 style={{ fontSize: '0.9rem', marginBottom: '15px', color: 'var(--secondary)' }}>Change Password</h4>
                            <div style={{ display: 'grid', gap: '15px' }}>
                                <Input label="Current Password" type="password" placeholder="••••••••" />
                                <Input label="New Password" type="password" placeholder="••••••••" />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* System Status */}
                <Card padding="30px">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: '#ef4444' }}>
                        <AlertTriangle size={20} />
                        <h3 style={{ margin: 0 }}>System Zone</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontWeight: '600' }}>Maintenance Mode</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>Disable site access for visitors</div>
                            </div>
                            <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '22px' }}>
                                <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} />
                                <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#ccc', borderRadius: '34px', transition: '.4s' }}></span>
                                <span style={{ position: 'absolute', content: '""', height: '16px', width: '16px', left: '3px', bottom: '3px', backgroundColor: 'white', borderRadius: '50%', transition: '.4s' }}></span>
                            </label>
                        </div>

                        <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                            <Button variant="secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <RefreshCw size={16} /> Clear Cache
                            </Button>
                            <Button style={{ flex: 1, background: '#ef4444', borderColor: '#ef4444' }}>
                                Reset All Settings
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Payment Configuration */}
                <Card padding="30px">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: 'var(--primary)' }}>
                        <CreditCard size={20} />
                        <h3 style={{ margin: 0 }}>Payment Gateways</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: 'var(--bg-light)', borderRadius: '8px' }}>
                            <span style={{ fontWeight: '500' }}>Test Mode</span>
                            <label style={{ position: 'relative', display: 'inline-block', width: '36px', height: '20px' }}>
                                <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                                <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'var(--primary)', borderRadius: '34px', transition: '.4s' }}></span>
                                <span style={{ position: 'absolute', content: '""', height: '14px', width: '14px', right: '3px', bottom: '3px', backgroundColor: 'white', borderRadius: '50%', transition: '.4s' }}></span>
                            </label>
                        </div>
                        <Input label="Razorpay Key ID" defaultValue="rzp_test_1234567890" />
                        <Input label="Razorpay Key Secret" type="password" defaultValue="****************" />
                        <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                            <Button style={{ flex: 1 }}>Save Keys</Button>
                        </div>
                    </div>
                </Card>

                {/* Team Management */}
                <Card padding="30px">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: 'var(--primary)' }}>
                        <Users size={20} />
                        <h3 style={{ margin: 0 }}>Team Members</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {[
                            { name: 'Super User', role: 'System Admin', email: 'admin@grambahar.com', bg: 'var(--slate-800)' },
                            { name: 'John Editor', role: 'Content Manager', email: 'john@grambahar.com', bg: 'var(--primary)' },
                            { name: 'Sarah Support', role: 'Customer Success', email: 'sarah@grambahar.com', bg: '#eab308' }
                        ].map((member, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '10px', borderBottom: i !== 2 ? '1px solid #eee' : 'none' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: member.bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                    {member.name.charAt(0)}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{member.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{member.role}</div>
                                </div>
                            </div>
                        ))}
                        <Button variant="secondary" style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <Users size={16} /> Invite Member
                        </Button>
                    </div>
                </Card>

                {/* Data Management */}
                <Card padding="30px">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: 'var(--primary)' }}>
                        <Database size={20} />
                        <h3 style={{ margin: 0 }}>Data Management</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ padding: '15px', background: 'var(--bg-light)', borderRadius: '8px' }}>
                            <h4 style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Export Data</h4>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <Button variant="secondary" style={{ flex: 1, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                    <Download size={14} /> Orders
                                </Button>
                                <Button variant="secondary" style={{ flex: 1, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                    <Download size={14} /> Customers
                                </Button>
                            </div>
                        </div>

                        <div style={{ padding: '15px', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
                            <h4 style={{ fontSize: '0.9rem', marginBottom: '5px' }}>Backup</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', marginBottom: '10px' }}>Download a complete backup of your database.</p>
                            <Button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <Database size={16} /> Download Full Backup
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Taxation & Billing */}
                <Card padding="30px">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: 'var(--primary)' }}>
                        <FileText size={20} />
                        <h3 style={{ margin: 0 }}>Taxation & Billing</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <Input label="GSTIN Number" defaultValue="29ABCDE1234F1Z5" />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <Input label="Default Tax Rate (%)" type="number" defaultValue="18" />
                            <Input label="Invoice Prefix" defaultValue="INV-2024-" />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: 'var(--bg-light)', borderRadius: '8px' }}>
                            <span style={{ fontWeight: '500' }}>Inclusive Tax Prices</span>
                            <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }} />
                        </div>
                    </div>
                </Card>

                {/* Communication */}
                <Card padding="30px">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: 'var(--primary)' }}>
                        <Mail size={20} />
                        <h3 style={{ margin: 0 }}>Communication</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Mail size={16} color="var(--slate-500)" />
                                <span>Email Alerts</span>
                            </div>
                            <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Smartphone size={16} color="var(--slate-500)" />
                                <span>SMS Alerts</span>
                            </div>
                            <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px', marginTop: '10px' }}>
                            <Input label="SMTP Host" defaultValue="smtp.grambahar.com" />
                            <Input label="Port" defaultValue="587" />
                        </div>
                    </div>
                </Card>

                {/* Appearance */}
                <Card padding="30px">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: 'var(--primary)' }}>
                        <Palette size={20} />
                        <h3 style={{ margin: 0 }}>Appearance</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <Input label="Admin Panel Name" defaultValue="GramBahar Admin" />

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '500', color: 'var(--primary-dark)' }}>Brand Color</label>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <input type="color" defaultValue="#16a34a" style={{ width: '40px', height: '40px', padding: 0, border: 'none', borderRadius: '8px', cursor: 'pointer' }} />
                                <span style={{ fontSize: '0.9rem', color: 'var(--slate-500)' }}>#16a34a</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: 'var(--bg-light)', borderRadius: '8px' }}>
                            <span style={{ fontWeight: '500' }}>Dark Mode Default</span>
                            <input type="checkbox" style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }} />
                        </div>
                    </div>
                </Card>

                {/* Shipping & Delivery */}
                <Card padding="30px">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: 'var(--primary)' }}>
                        <Truck size={20} />
                        <h3 style={{ margin: 0 }}>Shipping & Delivery</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--primary-dark)' }}>Shipping Partner</label>
                            <select style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #e0e0e0', background: '#fff', fontSize: '0.9rem' }}>
                                <option>Shiprocket</option>
                                <option>Delhivery</option>
                                <option>BlueDart</option>
                            </select>
                        </div>
                        <Input label="Tracking API Key" defaultValue="****************" type="password" />
                        <Input label="Est. Delivery Time (Days)" defaultValue="5-7 Business Days" />
                    </div>
                </Card>

                {/* Legal & Compliance */}
                <Card padding="30px">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: 'var(--primary)' }}>
                        <Scale size={20} />
                        <h3 style={{ margin: 0 }}>Legal & Compliance</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <Input label="Terms of Service URL" defaultValue="/terms" />
                        <Input label="Privacy Policy URL" defaultValue="/privacy" />
                        <Input label="Refund Policy URL" defaultValue="/refunds" />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: 'var(--bg-light)', borderRadius: '8px' }}>
                            <span style={{ fontWeight: '500' }}>Cookie Consent Banner</span>
                            <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }} />
                        </div>
                    </div>
                </Card>

                {/* Reviews & Feedback */}
                <Card padding="30px">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: 'var(--primary)' }}>
                        <MessageSquare size={20} />
                        <h3 style={{ margin: 0 }}>Reviews & Feedback</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
                            <span style={{ fontWeight: '500' }}>Enable Product Reviews</span>
                            <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
                            <span style={{ fontWeight: '500' }}>Auto-approve Reviews</span>
                            <input type="checkbox" style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--primary-dark)' }}>Blacklisted Words</label>
                            <textarea
                                rows={3}
                                style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #e0e0e0', fontFamily: 'inherit' }}
                                defaultValue="spam, fake, scam"
                            />
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
}
