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

// 既存のimport文の後に
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


      <div className="bg-blue-600 text-white p-8 rounded-lg shadow mb-12">
  <h1 className="text-4xl font-bold mb-6">
    The Future of Finance on Coinbase's BASE Network
  </h1>
  <p className="text-xl mb-8 text-blue-100">
    Join the Next Evolution in Digital Asset Infrastructure
  </p>
  <div className="flex flex-wrap gap-4 justify-center text-lg mb-12">
    <div className="flex items-center">
      <span className="text-blue-300 mr-2">•</span>
      Institutional-Grade Security
    </div>
    <div className="flex items-center">
      <span className="text-blue-300 mr-2">•</span>
      Breakthrough Technology
    </div>
    <div className="flex items-center">
      <span className="text-blue-300 mr-2">•</span>
      Community Governance
    </div>
  </div>
  </div>
   {/* 以下のセクションは白背景に戻す */}
   <div className="bg-white text-gray-900 p-8 rounded-lg mt-12">

        {/* Evolution Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">The Evolution of Digital Finance</h2>
          <p className="mb-6">
            Bitcoin revolutionized finance by solving the digital record-keeping challenge. USDC, backed by 
            Coinbase's institutional framework and regular audits, then achieved something remarkable: 
            bringing the stability of US dollars into the digital age with perfect one-to-one value maintenance.
          </p>
        </div>

        {/* BASE Network Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">The BASE Network Breakthrough</h2>
          <p className="mb-6">
            While maintaining Ethereum's proven security model, BASE Network achieved a revolutionary 
            breakthrough: reducing transaction costs to just 0.1% of traditional fees. This advancement, 
            developed by Coinbase's engineering team, makes large-scale adoption practical for the first time.
          </p>
        </div>

        {/* Steps Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-3">Create Coinbase Account</h3>
            <p>Start by creating a Coinbase account to purchase USDC. This is your gateway to cryptocurrency.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-3">Setup Wallet</h3>
            <p>Install MetaMask and purchase USDC from Coinbase. Transfer USDC to your MetaMask wallet.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-3">Connect to BASE</h3>
            <p>Switch to BASE Network using MetaMask. BASE is Coinbase's secure and efficient network.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-3">Start Staking</h3>
            <p>Connect wallet and start earning rewards. You can start with as little as $1 USDC.</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">How safe is my investment?</h3>
              <p>Your funds are secured by smart contracts on the BASE Network, operated by Coinbase. 
                All contracts are public and verifiable, ensuring complete transparency.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Can I withdraw anytime?</h3>
              <p>Yes, you can withdraw your funds at any time without any restrictions or fees. 
                Your funds remain under your control.</p>
            </div>
          </div>
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
    watch: true,
    cacheTime: 0,
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
  
  useEffect(() => {
    console.log('=== State Transition Log ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Connection Status:', {
      isConnecting,
      isDisconnected,
      hasAddress: !!address,
      address: address || 'none'
    });
    console.log('Ready Status:', {
      isReady,
      chainId: chain?.id || 'not connected'
    });
    console.log('Contract Read Status:', {
      hasUserInfo: userInfo ? true : false,
      currentAPR: currentAPR?.toString() || 'not loaded',
      referrerRate: referrerRate?.toString() || 'not loaded',
      referredRate: referredRate?.toString() || 'not loaded'
    });
    console.log('========================');
  }, [address, isConnecting, isDisconnected, isReady, chain, userInfo, currentAPR, referrerRate, referredRate]);
  
  useEffect(() => {
    console.log('Current userInfo:', userInfo);
  }, [userInfo]);

  const { data: allowance } = useContractRead({
    address: USDC_ADDRESS,
    abi: usdcABI,
    functionName: 'allowance',
    args: address ? [address, CONTRACT_ADDRESS] : undefined,
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
    enabled: !!address && !isProcessing && !userInfo?.[3], // リファラルコードが未生成の場合のみ有効
    onError: (error) => {
        console.error('Prepare generate referral code error:', error);
    }
});
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
      alert(`Minimum stake amount is ${MIN_DEPOSIT} USDC`);
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
      if (!stakeTx) throw new Error('Failed to stake');
      await refetchUserInfo();
      
      setInputAmount('');
      alert('Staking successful');
    } catch (error: any) {
      console.error('Staking error:', error);
      alert(error?.message || 'Failed to stake');
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
      if (!withdrawTx) throw new Error('Failed to withdraw');
      await refetchUserInfo();
      
      setWithdrawAmount('');
      alert('Withdrawal successful');
    } catch (error: any) {
      console.error('Withdrawal error:', error);
      alert(error?.message || 'Failed to withdraw');
    } finally {
      setIsProcessing(false);
    }
  };



  const handleClaimRewards = async () => {
    if (!address || isProcessing) return;
    
    try {
      setIsProcessing(true);
      const tx = await claimRewards?.();
      if (!tx) throw new Error('Failed to claim rewards');
      await refetchUserInfo();
      alert('Rewards claimed successfully');
    } catch (error: any) {
      console.error('Claim error:', error);
      alert(error?.message || 'Failed to claim rewards');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateReferralCode = async () => {
    if (!address || isProcessing) return;
    
    try {
      setIsProcessing(true);
      const tx = await generateReferralCode?.();
      if (!tx) throw new Error('Failed to generate referral code');
      await refetchUserInfo();
      alert('Referral code generated successfully');
    } catch (error: any) {
      console.error('Generate referral code error:', error);
      alert(error?.message || 'Failed to generate referral code');
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
      if (!tx) throw new Error('Failed to process referral');
      await refetchUserInfo();
      setReferralCode('');
      alert('Referral code applied successfully');
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
        <img src="/logo.png" alt="BASEUSDC.COM" className="h-14 w-auto" />
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
  <h2 className="text-xl font-semibold mb-6">Stake USDC</h2>
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
            <p className="text-sm text-gray-600 mb-1">Your Stake</p>
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
  {isProcessing ? 'Processing...' : 'Stake USDC'}
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
     {!userInfo?.[3] || userInfo[3] === 0n ?
 (
        <button
          onClick={handleGenerateReferralCode}
          disabled={isProcessing || !address || (chain?.id !== BASE_CHAIN_ID)}
          className="w-full bg-blue-600 text-white rounded-lg py-4 font-medium hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
        >
          {isProcessing ? 'Generating...' : 'Generate Referral Code'}
        </button>
      ) : (
        <div className="p-6 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Your Referral Code</p>
          <p className="text-xl font-semibold text-blue-600">
          {userInfo[3].toString() || '0'}
          </p>
          <div className="mt-4 pt-4 border-t border-blue-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Referrals</span>
              <span className="font-semibold">
              {userInfo[3].toString() || '0'}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )}
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
