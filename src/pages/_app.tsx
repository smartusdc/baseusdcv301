import * as React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { publicProvider } from '@wagmi/core/providers/public';
import Head from 'next/head';  // 追加
import Script from 'next/script';  

// hello 
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [base],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'BaseUSDC',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SMARTUSDC.COM - The Future of Finance on Coinbase's BASE Network</title>
        <meta name="description" content="SMARTUSDC.COM - The next evolution in digital finance on Coinbase's BASE Network. Join a revolutionary platform combining institutional-grade security with breakthrough blockchain technology." />
        <meta name="keywords" content="BASE Network, Coinbase, digital finance, institutional DeFi, blockchain innovation, USDC infrastructure, secure staking, community governance" />
        <meta property="og:title" content="SMARTUSDC.COM - The Future of Finance on Coinbase's BASE Network" />
        <meta property="og:description" content="Experience the next generation of digital asset infrastructure. Built on Coinbase's BASE Network with institutional-grade security and revolutionary efficiency." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://smartusdc.com" />
        <meta property="og:site_name" content="SMARTUSDC.COM" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SMARTUSDC.COM - The Future of Finance on BASE Network" />
        <meta name="twitter:description" content="Join the next evolution in digital finance. Powered by Coinbase's revolutionary BASE Network with institutional-grade security." />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#2196F3" />
      </Head>

      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-L4WJMTX5P1"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-L4WJMTX5P1');
        `}
      </Script>

      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
