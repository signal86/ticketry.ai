'use client';

import { Auth0Provider } from '@auth0/auth0-react';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Auth0Provider
          domain="genai-3516777384231424.us.auth0.com"
          clientId="VOScasYiJJXTjlfQd3ONeZHWgAdT3d4N"
          authorizationParams={{
            redirect_uri: typeof window !== 'undefined' ? window.location.origin : '',
          }}
        >
          {children}
        </Auth0Provider>
      </body>
    </html>
  );
}


