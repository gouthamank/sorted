import React from 'react';
import type { Metadata } from 'next';
import { Chivo } from 'next/font/google';
import './globals.css';

const inter = Chivo({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Sorted',
    description: 'Sorting algorithm visualizer',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={inter.className} style={{ minHeight: '100vh' }}>
                {children}
            </body>
        </html>
    );
}
