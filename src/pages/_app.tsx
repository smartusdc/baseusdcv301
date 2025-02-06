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
  <title>MERA.finance - Institutional-Grade USDC Yields on BASE</title>
  
  {/* Primary Meta Tags */}
  <meta name="description" content="Earn competitive USDC yields daily on BASE Network. Bank-grade security, instant withdrawals, and community rewards. Start earning institutional-grade returns today." />
  <meta name="keywords" content="USDC yield, BASE Network, institutional DeFi, secure staking, daily rewards, referral program, blockchain yields, digital asset infrastructure" />
  
  {/* Open Graph / Facebook */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://mera.finance" />
  <meta property="og:title" content="MERA.finance - Institutional-Grade USDC Yields on BASE" />
  <meta property="og:description" content="Access institutional-grade USDC yields with daily rewards and bank-level security. Built on BASE Network for maximum efficiency and reliability." />
  <meta property="og:site_name" content="MERA.finance" />
  
  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="MERA.finance - Daily USDC Yields on BASE" />
  <meta name="twitter:description" content="Earn daily USDC rewards with institutional-grade security. Competitive yields, instant withdrawals, and community bonuses on BASE Network." />
  
  {/* Favicon */}
  <link rel="icon" type="image/png" href="/favicon.png" />
  <link rel="apple-touch-icon" href="/favicon.png" />
  <meta name="theme-color" content="#1E40AF" /> {/* より濃い青に変更 */}
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
