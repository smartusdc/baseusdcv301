// src/pages/index.tsx - Part 1: Core Logic and State Management check
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAccount, useContractRead, useNetwork, useSwitchNetwork, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { stakingABI } from '../abis/stakingABI';
import { usdcABI } from '../abis/usdcABI';
import { CONTRACTS } from '../abis/contracts';

const formatAPR = (value: bigint | undefined): string => {
  if (!value) return '0';
  return (Number(value) / 100).toString();
};

// 既存のimport文の後に..
const LandingContent: React.FC<{
  currentAPR?: bigint;
  referrerRate?: bigint;
  referredRate?: bigint;
}> = ({ currentAPR, referrerRate, referredRate }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-12">
        <div className="bg-gradient-to-br from-base-50 to-white p-8 rounded-2xl shadow-lg border border-base-100">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-base-900 mb-2">Current APR</h2>
            <div className="flex items-baseline justify-center">
              <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-base-600 to-base-800 bg-clip-text text-transparent">
                {formatAPR(currentAPR)}
              </span>
              <span className="text-4xl md:text-5xl font-bold text-base-600">%</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="stats-card">
              <h3 className="text-base font-medium text-gray-600 mb-1">Referrer Reward</h3>
              <p className="text-2xl font-bold text-base-600">{formatAPR(referrerRate)}%</p>
            </div>
            <div className="stats-card">
              <h3 className="text-base font-medium text-gray-600 mb-1">Referred Reward</h3>
              <p className="text-2xl font-bold text-base-600">{formatAPR(referredRate)}%</p>
            </div>
          </div>
        </div>
      </div>
      {/* 既存の残りのLandingContentコードはそのまま */}
   {/* 以下のセクションは白背景に戻す */}
 

{/* Hero Section */}
<div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white p-8 rounded-lg shadow-xl mb-12">

    <div className="text-center space-y-6">
      {/* Main Header */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Institutional-Grade USDC Yields on BASE
      </h1>
      
      <p className="text-xl md:text-2xl text-blue-100 mb-8">
        Secure Daily Returns, Powered by Innovation
      </p>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {/* Daily Rewards Card */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
          <div className="text-xl font-semibold mb-2">
            Daily USDC Rewards
          </div>
          <div className="text-3xl font-bold text-blue-100">
            {formatAPR(currentAPR)}% APR
          </div>
        </div>

        {/* Security Card */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
          <div className="text-xl font-semibold mb-2">
            Bank-Grade Security
          </div>
          <div className="text-lg text-blue-100">
            Audited by Blockaid
          </div>
        </div>

        {/* Community Card */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
          <div className="text-xl font-semibold mb-2">
            Community Growth
          </div>
          <div className="text-3xl font-bold text-blue-100">
            {formatAPR(referrerRate)}% Bonus
          </div>
        </div>
      
    </div>
  </div>
</div>

{/* Hero Sectionの直後に追加 */}
<div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-12">
  <h2 className="text-3xl font-bold text-center mb-8">
  Main Screen Explanation
  </h2>

  <div className="flex flex-col md:flex-row gap-8 items-center">
    {/* 左側：ダッシュボードプレビュー */}
    <div className="md:w-1/2">
      <img 
        src="/dashboard-preview.png" 
        alt="MERA.FINANCE Dashboard"
        className="rounded-xl shadow-lg w-full"
      />
    </div>

    {/* 右側：説明部分 */}
    <div className="md:w-1/2 space-y-6">
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
          <div>
            <h3 className="text-xl font-bold text-blue-600">Connect Wallet</h3>
            <p className="text-gray-600">Click the "Connect Wallet" button in the top right corner.You will then be taken to the main screen.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
          <div>
            <h3 className="text-xl font-bold text-green-600">Deposit USDC</h3>
            <p className="text-gray-600">Enter your desired amount (min. 0.01 USDC) and click deposit</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
          <div>
            <h3 className="text-xl font-bold text-purple-600">Start Earning</h3>
            <p className="text-gray-600">Watch your rewards grow daily and claim anytime</p>
          </div>
        </div>
      </div>

      {/* 追加の特徴説明 */}
      <div className="bg-gray-50 rounded-lg p-6 mt-6">
        <h4 className="font-bold mb-3">Key Features:</h4>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Daily rewards distribution</span>
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>No lock-up period</span>
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Instant withdrawals</span>
          </li>
        </ul>
      </div>

     
    </div>
  </div>
</div>

{/* Easy Start Guide Section */}
<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
  <h2 className="text-3xl font-bold text-center mb-8">
    Start Earning in 3 Simple Steps
  </h2>

  <div className="space-y-8">
    {/* Step 1: Exchange Account */}
    <div className="flex flex-col md:flex-row items-start gap-6 p-6 bg-blue-50 rounded-xl">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          1
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-3">Get USDC from an Exchange</h3>
        <div className="space-y-3">
          <p className="text-gray-600">
            Create an account on any major crypto exchange like Coinbase or Binance
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Register with your email and ID
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Add funds using bank transfer or credit card
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Buy USDC with your added funds
            </li>
          </ul>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Recommended Exchanges:
              <span className="font-medium"> Coinbase, Binance, Kraken</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Step 2: MetaMask Setup */}
    <div className="flex flex-col md:flex-row items-start gap-6 p-6 bg-purple-50 rounded-xl">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          2
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-3">Setup MetaMask Wallet</h3>
        <div className="space-y-3">
          <p className="text-gray-600">
            Install MetaMask and transfer your USDC
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Install MetaMask from the official website
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Add BASE Network to MetaMask
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Transfer USDC from exchange to your MetaMask wallet
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Get a small amount of ETH on BASE for transaction fees
            </li>
          </ul>
          <div className="mt-4">
            <a 
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Download MetaMask →
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Step 3: Deposit */}
    <div className="flex flex-col md:flex-row items-start gap-6 p-6 bg-green-50 rounded-xl">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          3
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-3">Start Earning</h3>
        <div className="space-y-3">
          <p className="text-gray-600">
            Connect your wallet and make your first deposit
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Click "Connect Wallet" button above
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Enter the amount you want to deposit
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Click "Deposit" and confirm in MetaMask
            </li>
          </ul>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Minimum deposit:
              <span className="font-medium"> {MIN_DEPOSIT} USDC</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Help Box */}
  <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center">
    <p className="text-gray-600">
      Need help getting started? 
      <a 
        href="mailto:support@mera.finance" 
        className="text-blue-600 hover:text-blue-700 ml-1"
      >
        Contact our support team
      </a>
    </p>
  </div>
</div>


<div className="bg-white text-gray-900 p-8 rounded-lg mb-12">
  <h2 className="text-2xl font-bold mb-6">Security & Transparency</h2>
  <div className="space-y-6">
    {/* Security Features */}
    <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
      <div className="flex items-start space-x-4">
        <div className="bg-blue-100 p-3 rounded-lg">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-3">Security Features</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Smart contracts verified and audited by Blockaid Security</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Built on BASE Network's secure infrastructure</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Real-time transaction monitoring</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Contract Status */}
    <div className="bg-gradient-to-br from-yellow-50 to-white p-6 rounded-xl border border-yellow-100">
      <div className="flex items-start space-x-4">
        <div className="bg-yellow-100 p-3 rounded-lg">
          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-3">Contract Status</h3>
          <p className="text-gray-600 mb-4">
            This contract is currently in beta testing phase. While fully functional and secure, 
            we recommend starting with smaller deposits as we gather more operational data.
          </p>
          <div className="bg-white p-4 rounded-lg border border-yellow-100">
            <p className="text-sm font-medium text-gray-600 mb-2">View Contract:</p>
            <a 
              href="https://basescan.org/address/0x2bd38bd63d66b360de91e2f8caee48aa0b159a00#code"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 break-all font-mono text-sm"
            >
              0x2bd38bd63d66b360de91e2f8caee48aa0b159a00
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Additional Info */}
    <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
      <p>
        For complete transparency, all contract interactions and balances are publicly 
        viewable on BaseScan. We encourage users to review the contract and its current state 
        before participating.
      </p>
    </div>
</div>


{/* Key Benefits Section */}
<div className="mb-12"> {/* シンプルなマージンのみ */}
  <div className="grid md:grid-cols-2 gap-6">
    {/* Platform Benefits */}
    <div className="card">
      <div className="flex flex-col md:flex-row md:items-start md:space-x-4">
        <div className="bg-blue-100 p-3 rounded-lg mb-4 md:mb-0 inline-flex">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Optimized for Performance</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Instant deposits and withdrawals
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Daily USDC rewards distribution
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Zero lock-up periods
            </li>
          </ul>
        </div>
      </div>
    </div>

   {/* Security Features */}
   <div className="card">
      <div className="flex flex-col md:flex-row md:items-start md:space-x-4">
        <div className="bg-blue-100 p-3 rounded-lg mb-4 md:mb-0 inline-flex">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Enterprise-Grade Security</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Audited by Blockaid Security
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Real-time transaction monitoring
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Transparent smart contracts
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

{/* Early Adopter Benefits Section */}
<div className="mb-12"> {/* シンプルなマージンのみ */}
  <div className="card bg-gradient-to-br from-blue-700 to-blue-900 text-white p-6 md:p-8">
    <div className="text-center mb-6 md:mb-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-3">Early Adopter Benefits</h2>
      <p className="text-blue-100 text-base md:text-lg">
        Be among the first 1,000 users to maximize your benefits
      </p>
    </div>

    <div className="grid gap-4 md:gap-6">
      {/* モバイルでは1カラム、タブレット以上で3カラム */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white/10 p-5 md:p-6 rounded-lg backdrop-blur-md">
          <h3 className="text-lg md:text-xl font-bold mb-2">Priority Access</h3>
          <p className="text-blue-100 text-sm md:text-base">
            Maximum governance token allocation for early participants
          </p>
        </div>

        <div className="bg-white/10 p-5 md:p-6 rounded-lg backdrop-blur-md">
          <h3 className="text-lg md:text-xl font-bold mb-2">Enhanced Yields</h3>
          <p className="text-blue-100 text-sm md:text-base">
            Boosted USDC reward rates for early adopters
          </p>
        </div>

        <div className="bg-white/10 p-5 md:p-6 rounded-lg backdrop-blur-md">
          <h3 className="text-lg md:text-xl font-bold mb-2">Voting Power</h3>
          <p className="text-blue-100 text-sm md:text-base">
            Direct influence over platform development
          </p>
        </div>
      </div>
    </div>
  </div>
</div>


<div className="mb-12"> {/* シンプルなマージンのみ */}
  <div className="text-center mb-8">
    <h2 className="text-2xl font-bold mb-4">Start Earning in Minutes</h2>
    <p className="text-gray-600">Simple steps to begin your journey</p>
  </div>
  
  <div className="grid md:grid-cols-3 gap-6">
    <div className="card bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100">
      <div className="text-blue-600 text-4xl font-bold mb-4">01</div>
      <h3 className="text-xl font-bold mb-3">Deposit USDC</h3>
      <p className="text-gray-600">Start with any amount. No minimum lock-up period, withdraw anytime.</p>
    </div>

    <div className="card bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100">
      <div className="text-blue-600 text-4xl font-bold mb-4">02</div>
      <h3 className="text-xl font-bold mb-3">Earn Daily</h3>
      <p className="text-gray-600">Watch your USDC grow with competitive APR paid out daily.</p>
    </div>

    <div className="card bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100">
      <div className="text-blue-600 text-4xl font-bold mb-4">03</div>
      <h3 className="text-xl font-bold mb-3">Multiply Rewards</h3>
      <p className="text-gray-600">Share your referral code to earn additional rewards on others' deposits.</p>
    </div>
  </div>
</div>


{/* Enhanced FAQ Section */}
<div className="mb-12">
  <div className="text-center mb-8">
    <h2 className="text-2xl md:text-3xl font-bold mb-3">Common Questions</h2>
    <p className="text-gray-600">Everything you need to know about MERA.FINANCE</p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Left Column */}
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold mb-3 text-gray-900">
          How is my security ensured?
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Your funds are protected by enterprise-grade security infrastructure. 
          Our smart contracts are audited by Blockaid Security and all transactions 
          are monitored in real-time.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold mb-3 text-gray-900">
          What about rewards?
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Rewards are calculated daily based on your deposit amount and current APR. 
          Additional bonus rewards are available through our referral program.
        </p>
      </div>
    </div>

    {/* Right Column */}
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold mb-3 text-gray-900">
          How do withdrawals work?
        </h3>
        <p className="text-gray-600 leading-relaxed">
          You have complete control over your funds with no lock-up periods. 
          All withdrawals are processed immediately through our smart contracts.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold mb-3 text-gray-900">
          How can I participate?
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Simply connect your wallet, deposit USDC, and start earning daily rewards. 
          You can also boost your earnings by participating in our referral program.
        </p>
      </div>
    </div>
  </div>
</div>

  {/* Previous sections remain the same */}

{/* Featured Content Creators & Referral Program Combined Section */}
<div className="grid md:grid-cols-2 gap-8 mb-12">
  {/* Featured Content Creators */}
  <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-sm border border-blue-100">
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-3">Content Creators</h2>
      <p className="text-gray-600">Create content about MERA.FINANCE and get featured</p>
    </div>

    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-lg mb-2">Featured Benefits</h3>
        <ul className="space-y-2">
          <li className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Permanent backlink to your content
          </li>
          <li className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Featured on our homepage
          </li>
          <li className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Community recognition
          </li>
        </ul>
      </div>
    </div>
  </div>

  {/* Referral Program */}
  <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-sm border border-purple-100">
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-3">Referral Program</h2>
      <p className="text-gray-600">Earn together with your community</p>
    </div>

    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-lg mb-2">Program Benefits</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">You Earn</p>
            <p className="text-xl font-bold text-purple-600">+{formatAPR(referrerRate)}%</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">Friends Earn</p>
            <p className="text-xl font-bold text-purple-600">+{formatAPR(referredRate)}%</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-lg mb-2">How it Works</h3>
        <ul className="space-y-2">
          <li className="flex items-center text-gray-600">
            <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-2">1</span>
            Get your unique referral code
          </li>
          <li className="flex items-center text-gray-600">
            <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-2">2</span>
            Share with friends
          </li>
          <li className="flex items-center text-gray-600">
            <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-2">3</span>
            Both get bonus rewards
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

{/* Contact Section - メインのサポート情報 */}
<div className="bg-white text-gray-900 p-4 md:p-8 rounded-lg mb-8">
  <h2 className="text-2xl font-bold mb-6">Need Support?</h2>
  <div className="text-center">
    <p className="text-lg mb-4">Our team is here to help you with any questions or concerns.</p>
    <div className="inline-flex items-center space-x-2 bg-blue-50 px-6 py-3 rounded-lg">
      <svg 
        className="w-5 h-5 text-blue-600" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <a 
        href="mailto:support@mera.finance" 
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        support@mera.finance
      </a>
    </div>
  </div>
</div>

{/* Footer - シンプルな著作権表示のみに */}
<div className="text-center text-gray-600 text-sm py-8">
  <p>© 2024 MERA.FINANCE. All rights reserved.</p>
</div>
      </div>
      </div>
  );
};


interface UserInfo {
  depositAmount: bigint;
  lastRewardTimestamp: bigint;
  pendingRewards: bigint;
  referralRewards: bigint;
  totalReferrals: bigint;
  accumulatedRewards: bigint;
  isFrozen: boolean;
  hasReferrer: boolean;
}

const DEFAULT_ADDRESS = '0x2Bd38bD63D66b360dE91E2F8CAEe48AA0B159a00' as `0x${string}`;
const CONTRACT_ADDRESS = DEFAULT_ADDRESS;
const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as `0x${string}`;
const BASE_CHAIN_ID = 8453;
const MIN_DEPOSIT = '0.01';

export default function Home() {
  
  // State Management
  const { address, isConnecting, isDisconnected } = useAccount();
  const [isReady, setIsReady] = React.useState(false);
  
  // 接続状態が安定したことを確認
  React.useEffect(() => {
    if (!isConnecting) {
      setIsReady(true);
    }
  }, [isConnecting]);

  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [inputAmount, setInputAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState(''); // 追加
  const [referralCode, setReferralCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processReferralCode, setProcessReferralCode] = useState<number | undefined>();


  const { data: userInfo, refetch: refetchUserInfo } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: stakingABI,
    functionName: 'getUserInfo',  // 'users' から 'getUserInfo' に変更
    args: [address ?? '0x0000000000000000000000000000000000000000'],
    enabled: !!address,
    watch: false,        // 変更点1
    cacheTime: 30000,    // 変更点2
    staleTime: 10000,    // 変更点3
    onSuccess: (data) => {
      console.log('User Info Updated:', {
          depositAmount: {
              raw: data[0].toString(),
              formatted: formatUnits(data[0], 6)
          },
          pendingRewards: {
              raw: data[1].toString(),
              formatted: formatUnits(data[1], 6)
          },
          userReferralRewards: {
              raw: data[2].toString(),
              formatted: formatUnits(data[2], 6)
          },
          totalReferrals: data[3].toString(),
          isFrozen: data[4],
          timestamp: new Date().toISOString()
      });
  },
}) as { data: [bigint, bigint, bigint, bigint, boolean] | undefined, refetch: () => void };


  const { data: currentAPR } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: stakingABI,
    functionName: 'currentAPR',
    watch: true,
  });
  
  const { data: referrerRate } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: stakingABI,
    functionName: 'referrerRewardRate',
    watch: true,
  });
  
  const { data: referredRate } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: stakingABI,
    functionName: 'referredRewardRate',
    watch: true,
  });

  const { data: existingReferralCode } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: stakingABI,
    functionName: 'userToReferralCode',
    args: [address ?? '0x0000000000000000000000000000000000000000'],
    enabled: !!address,
  });

  
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
        console.log('Debug Info:', {
            timestamp: new Date().toISOString(),
            connection: {
                address,
                isConnecting,
                isDisconnected
            },
            userInfo: userInfo ? {
                stake: userInfo[0] ? formatUnits(userInfo[0], 6) : '0',
                rewards: userInfo[1] ? formatUnits(userInfo[1], 6) : '0'
            } : null,
            referral: {
                code: existingReferralCode?.toString(),
                processing: isProcessing
            }
        });
    }
}, [address, isConnecting, isDisconnected, userInfo, existingReferralCode, isProcessing]);


  const { data: allowance } = useContractRead({
    address: USDC_ADDRESS,
    abi: usdcABI,
    functionName: 'allowance',
    
    args: address ? [address, CONTRACT_ADDRESS] : undefined,
    enabled: !!address,
  });

  const { data: userReferrer } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: stakingABI,
    functionName: 'userToReferrer',
    args: [address ?? '0x0000000000000000000000000000000000000000'],
    enabled: !!address,
});

  // Contract Write Operations
  const { config: approveConfig } = usePrepareContractWrite({
    address: CONTRACTS.USDC.address,
    abi: CONTRACTS.USDC.abi,
    functionName: 'approve',
    args: [CONTRACT_ADDRESS, parseUnits(inputAmount || '0', 6)], // この args の1行を追加
    enabled: !!address && !!inputAmount,
  });
  const { writeAsync: approveUsdc } = useContractWrite(approveConfig);

  const { config: stakeConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: stakingABI,
    functionName: 'depositFunds',
    args: [parseUnits(inputAmount || '0', 6), 0n], // args を追加。referralCode は 0n
    enabled: !!address && !!inputAmount,
  });
  const { writeAsync: stake } = useContractWrite(stakeConfig);


// Contract Write Operations の箇所に追加
const { config: withdrawConfig } = usePrepareContractWrite({
  address: CONTRACT_ADDRESS,
  abi: stakingABI,
  functionName: 'withdraw',
  args: [parseUnits(withdrawAmount || '0', 6)], // inputAmount から withdrawAmount に変更
  enabled: !!address && !!withdrawAmount,       // inputAmount から withdrawAmount に変更
});

const { writeAsync: withdraw } = useContractWrite(withdrawConfig);



  const { config: claimRewardsConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: stakingABI,
    functionName: 'claimDepositReward',
    enabled: !!address,
  });
  const { writeAsync: claimRewards } = useContractWrite(claimRewardsConfig);

  const { config: generateReferralCodeConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: stakingABI,
    functionName: 'generateReferralCode',
    enabled: !!address && !isProcessing,
    onError: (error) => {
        console.error('Prepare generate referral code error:', error);
    }
});

// デバッグログを追加
useEffect(() => {
    console.log('Generate Referral Code Config Status:', {
        hasConfig: !!generateReferralCodeConfig,
        address,
        isProcessing,
        existingReferralCode: existingReferralCode?.toString()
    });
}, [generateReferralCodeConfig, address, isProcessing, existingReferralCode]);

  const { writeAsync: generateReferralCode } = useContractWrite(generateReferralCodeConfig);

  const { config: processReferralConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: stakingABI,
    functionName: 'processReferral',
    args: typeof processReferralCode !== 'undefined' ? [BigInt(processReferralCode)] : undefined,
    enabled: !!address && typeof processReferralCode !== 'undefined',
  });
  const { writeAsync: processReferral } = useContractWrite(processReferralConfig);

  // Network Check Effect
  useEffect(() => {
    if (chain && chain.id !== BASE_CHAIN_ID) {
      alert('Please switch to BASE Network');
      switchNetwork?.(BASE_CHAIN_ID);
    }
  }, [chain, switchNetwork]);

  // Transaction Handlers
  const handleStake = async () => {
    if (!address || isProcessing) return;
    if (!inputAmount || parseFloat(inputAmount) < parseFloat(MIN_DEPOSIT)) {
      alert(`Minimum Deposit amount is ${MIN_DEPOSIT} USDC`);
      return;
    }

    try {
      setIsProcessing(true);
      const amount = parseUnits(inputAmount, 6);
      
      if (!allowance || allowance < amount) {
        const approveTx = await approveUsdc?.();
        if (!approveTx) throw new Error('Failed to approve');
      }

      const stakeTx = await stake?.();
      if (!stakeTx) throw new Error('Unable to process your deposit at this time. Please try again.');
      await refetchUserInfo();
      
      setInputAmount('');
      alert('Your deposit has been successfully processed and confirmed.');
    } catch (error: any) {
      console.error('Depositing error:', error);
      alert(error?.message || 'Unable to process your deposit at this time. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };


  const handleWithdraw = async () => {
    if (!address || isProcessing) return;
    if (!withdrawAmount || parseFloat(withdrawAmount) < parseFloat(MIN_DEPOSIT)) {
      alert(`Minimum withdrawal amount is ${MIN_DEPOSIT} USDC`);
      return;
    }
  
    try {
      setIsProcessing(true);
      const withdrawTx = await withdraw?.();
      if (!withdrawTx) throw new Error('Your withdrawal request could not be completed. Please try again.');
      await refetchUserInfo();
      
      setWithdrawAmount('');
      alert('Your withdrawal has been successfully processed and confirmed.');
    } catch (error: any) {
      console.error('Withdrawal error:', error);
      alert(error?.message || 'Your withdrawal request could not be completed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };



  const handleClaimRewards = async () => {
    if (!address || isProcessing) return;
    
    try {
      setIsProcessing(true);
      const tx = await claimRewards?.();
      if (!tx) throw new Error('Your rewards claim could not be processed at this moment. Please try again.');
      await refetchUserInfo();
      alert('Your rewards have been successfully claimed and transferred to your wallet.');
    } catch (error: any) {
      console.error('Claim error:', error);
      alert(error?.message || 'Your rewards claim could not be processed at this moment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateReferralCode = async () => {
    if (!address || isProcessing) {
        console.log('Early return condition met:', { address, isProcessing });
        return;
    }
    
    if (!generateReferralCode) {
        console.error('generateReferralCode function is not available');
        alert('Contract write function is not ready');
        return;
    }

    try {
        setIsProcessing(true);
        console.log('Attempting to generate referral code', {
            config: generateReferralCodeConfig,
            writeFunction: !!generateReferralCode
        });
        
        const tx = await generateReferralCode();
        console.log('Transaction response:', tx);
        
        await refetchUserInfo();
        alert('Your unique referral code has been generated. You can now share it with others.');
    } catch (error: any) {
        console.error('Generate referral code error:', {
            error,
            message: error.message,
            data: error.data
        });
        alert(`We could not generate your referral code at this time. Please try again.: ${error.message}`);
    } finally {
        setIsProcessing(false);
    }
};




  const handleApplyReferral = async () => {
    if (!address || isProcessing || !referralCode) return;
    
    try {
      setIsProcessing(true);
      setProcessReferralCode(parseInt(referralCode));
      const tx = await processReferral?.();
      if (!tx) throw new Error('Your referral code could not be applied. Please verify the code and try again.');
      await refetchUserInfo();
      setReferralCode('');
      alert('Your referral code has been successfully verified and applied to your account.');
    } catch (error: any) {
      console.error('Apply referral error:', error);
      alert(error?.message || 'Failed to apply referral code');
    } finally {
      setIsProcessing(false);
    }
  };
  // Part 2: UI Rendering
  if (!isReady || isConnecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">  </div>
   {/* Header */}
   <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
  <div className="container mx-auto px-4">
    <div className="flex justify-between items-center h-22">
      <div className="flex items-center">
        <img src="/logo.png" alt="MERA.FINANCE" className="h-14 w-auto object-contain" />
      </div>
      <div className="ml-auto">
        <ConnectButton />
      </div>
    </div>
  </div>
</header>

{/* ヘッダーの高さ分のスペーサー */}
<div className="h-22"></div>


{/* ここから条件分岐を追加 */}
{!address || isDisconnected ? (
  <LandingContent
    currentAPR={currentAPR}
    referrerRate={referrerRate}
    referredRate={referredRate}
  />
) : (
          <div className="space-y-6">

        {/* Staking Card */}
<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
  <h2 className="text-xl font-semibold mb-6">Deposit USDC</h2>
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Amount
      </label>
      <div className="relative rounded-lg shadow-sm">
        <input
          type="number"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
          placeholder={`Min ${MIN_DEPOSIT} USDC`}
          className="w-full rounded-lg border-gray-300 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isProcessing}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">USDC</span>
        </div>
      </div>
    </div>

    {/* userInfo表示部分を安全なアクセスに修正 */}
    {userInfo && (
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Your Deposit</p>
            <p className="text-lg font-semibold">
  {userInfo?.[0] ? formatUnits(userInfo[0], 6) : '0'} USDC
</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Pending Rewards</p>
            <p className="text-lg font-semibold text-green-600">
            {userInfo?.[1] ? formatUnits(userInfo[1], 6) : '0'} USDC
            </p>
          </div>
        </div>
      </div>
    )}
  </div>
</div>
<button
  onClick={handleStake}
  disabled={isProcessing || !address || (chain?.id !== BASE_CHAIN_ID)}
  className="w-full bg-blue-600 text-white rounded-lg py-4 font-medium hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
>
  {isProcessing ? 'Processing...' : 'Deposit USDC'}
</button>

{/* Withdraw Card */}
<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
  <h2 className="text-xl font-semibold mb-6">Withdraw USDC</h2>
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Withdraw Amount
      </label>
      <div className="relative rounded-lg shadow-sm">
        <input
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          placeholder={`Min ${MIN_DEPOSIT} USDC`}
          className="w-full rounded-lg border-gray-300 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isProcessing}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">USDC</span>
        </div>
      </div>
    </div>
    <button
      onClick={handleWithdraw}
      disabled={isProcessing || !address || (chain?.id !== BASE_CHAIN_ID)}
      className="w-full bg-red-600 text-white rounded-lg py-4 font-medium hover:bg-red-700 disabled:bg-red-400 transition-colors"
    >
      {isProcessing ? 'Processing...' : 'Withdraw USDC'}
    </button>
  </div>
</div>



     {/* Rewards Card */}
<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
  <h2 className="text-xl font-semibold mb-4">Available Rewards</h2>
  {isReady && userInfo && (
    <div className="space-y-4">
     {userInfo?.[1] && userInfo[1] > 0n ? (
        <>
          <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Rewards Available</h3>
            <p className="text-2xl font-bold text-green-600">
            {formatUnits(userInfo[1], 6)} USDC
            </p>
          </div>
          <button
            onClick={handleClaimRewards}
            disabled={isProcessing || !address || (chain?.id !== BASE_CHAIN_ID)}
            className="w-full bg-green-600 text-white rounded-lg py-4 font-medium hover:bg-green-700 disabled:bg-green-400 transition-colors"
          >
            {isProcessing ? 'Processing...' : 'Claim Rewards'}
          </button>
        </>
      ) : (
        <div className="py-8 text-center text-gray-500">
          No rewards available to claim
        </div>
      )}
    </div>
  )}
</div>


{/* Referral Program Card */}
<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
  <h2 className="text-xl font-semibold mb-4">Referral Program</h2>
  {isReady && userInfo && (
    <>
      {existingReferralCode && existingReferralCode > 0n ? (
        // リファラルコードを持っているユーザー向けの表示
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-600">Your Referral Code</h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-blue-600">
                  {existingReferralCode.toString()}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(existingReferralCode.toString());
                    alert('Referral code copied!');
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Copy
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total Referrals</p>
                <p className="text-xl font-semibold">{userInfo[3].toString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Referral Rewards</p>
                <p className="text-xl font-semibold text-green-600">
                  {formatUnits(userInfo[2], 6)} USDC
                </p>
              </div>
            </div>
            <button
              onClick={handleClaimRewards}
              disabled={isProcessing || !address || (chain?.id !== BASE_CHAIN_ID) || userInfo[2] <= 0n}
              className="w-full bg-green-600 text-white rounded-lg py-4 font-medium hover:bg-green-700 disabled:bg-green-400 transition-colors mt-4"
            >
              {isProcessing ? 'Processing...' : 'Claim Referral Rewards'}
            </button>
          </div>
        </div>
      ) : (
        // リファラルコードを持っていないユーザー向けの表示
        <button
          onClick={handleGenerateReferralCode}
          disabled={isProcessing || !address || (chain?.id !== BASE_CHAIN_ID)}
          className="w-full bg-blue-600 text-white rounded-lg py-4 font-medium hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
        >
          {isProcessing ? 'Generating...' : 'Generate Referral Code'}
        </button>
      )}
    </>
  )}
</div>

{/* Apply Referral Code Card */}
<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
  <h2 className="text-xl font-semibold mb-4">Apply Referral Code</h2>
  {userReferrer && userReferrer !== '0x0000000000000000000000000000000000000000' ? (
    <div className="p-4 bg-green-50 rounded-lg">
      <p className="text-sm text-gray-600">Already referred!</p>
      <p className="text-lg font-semibold text-green-600">
        Your rewards are boosted by {formatAPR(referredRate)}%
      </p>
    </div>
  ) : (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Enter Referral Code
        </label>
        <input
          type="text"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          placeholder="Enter referral code"
          className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isProcessing}
        />
      </div>
      <button
        onClick={handleApplyReferral}
        disabled={isProcessing || !address || !referralCode || (chain?.id !== BASE_CHAIN_ID)}
        className="w-full bg-blue-600 text-white rounded-lg py-4 font-medium hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
      >
        {isProcessing ? 'Applying...' : 'Apply Referral Code'}
      </button>
    </div>
  )}
</div>
{/* Support Card */}
<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
  <h2 className="text-xl font-semibold mb-4">Need Support?</h2>
  
  {/* Common Issues Section */}
  <div className="mb-6">
    <h3 className="text-lg font-medium mb-3">Common Issues Troubleshooting</h3>
    <div className="space-y-2">
      <div className="flex items-center text-gray-700">
        <span className="text-green-500 mr-2">✓</span>
        <p>Ensure you've completed the wallet signature request</p>
      </div>
      <div className="flex items-center text-gray-700">
        <span className="text-green-500 mr-2">✓</span>
        <p>Verify you're connected to the BASE Network</p>
      </div>
      <div className="flex items-center text-gray-700">
        <span className="text-green-500 mr-2">✓</span>
        <p>Check your internet connection</p>
      </div>
      <div className="flex items-center text-gray-700">
        <span className="text-green-500 mr-2">✓</span>
        <p>Wait 5 minutes and refresh your wallet if transactions seem stuck</p>
      </div>
    </div>
  </div>

  {/* Browser & Wallet Compatibility */}
  <div className="mb-6">
    <h3 className="text-lg font-medium mb-3">Browser & Wallet Compatibility</h3>
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">Supported Browsers:</p>
        <ul className="space-y-1 text-gray-700">
          <li>• Chrome</li>
          <li>• Safari</li>
          <li>• Firefox</li>
          <li>• Opera</li>
        </ul>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">Supported Wallets:</p>
        <ul className="space-y-1 text-gray-700">
          <li>• MetaMask</li>
          <li>• Coinbase Wallet</li>
          <li>• Ledger</li>
          <li>• Trust Wallet</li>
          <li>• Rainbow</li>
        </ul>
      </div>
    </div>
  </div>

  {/* Contact Support */}
  <div className="text-center">
    <p className="text-gray-600 mb-4">Still having issues? Our support team is ready to help.</p>
    <a 
      href="mailto:support@mera.finance"
      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Contact Support
    </a>
  </div>
</div>


          </div>
      )}

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent mx-auto"></div>
            <p className="text-gray-700 mt-4">Processing transaction...</p>
          </div>
        </div>
      )}
    </div>
  );
}
