import React from 'react';
import type { Metadata } from 'next';
import { Red_Hat_Mono } from 'next/font/google';
import './globals.css';
import classNames from 'classnames';

const redHatMono = Red_Hat_Mono({ weight: '400', subsets: ['latin'] });

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
            <body className={classNames([redHatMono.className])} style={{ minHeight: '100vh' }}>
                {children}
            </body>
        </html>
    );
}
