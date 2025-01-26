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
   {/* 以下のセクションは白背景に戻す */}
   <div className="bg-white text-gray-900 p-8 rounded-lg mt-12">

{/* Hero Section */}
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
      Pure DeFi Architecture
    </div>
    <div className="flex items-center">
      <span className="text-blue-300 mr-2">•</span>
      Institutional Framework
    </div>
    <div className="flex items-center">
      <span className="text-blue-300 mr-2">•</span>
      Community Governance
    </div>
  </div>
</div>

<div className="bg-white text-gray-900 p-8 rounded-lg mt-12">
  {/* Evolution Section */}
  <div className="mb-12">
    <h2 className="text-2xl font-bold mb-4">The Evolution of Digital Finance</h2>
    <p className="mb-6">
      SMARTUSDC.COM represents the culmination of blockchain evolution - a serverless 
      architecture built on Coinbase's institutional-grade infrastructure, managing digital 
      assets with unprecedented efficiency and security. This fusion of USDC stability and BASE 
      Network efficiency creates a platform that fundamentally transforms digital finance.
    </p>
  </div>

  {/* Infrastructure Section */}
  <div className="mb-12">
    <h2 className="text-2xl font-bold mb-4">Next-Generation Financial Infrastructure</h2>
    <p className="mb-6">
      SMARTUSDC.COM integrates breakthrough technologies into a comprehensive platform. 
      Built on Coinbase's trusted infrastructure, it enables fully automated processing 
      through smart contracts, eliminating traditional banking delays while maintaining 
      unprecedented security standards.
    </p>
  </div>

  {/* Governance Section - Dark Theme */}
  <div className="bg-[#1a237e] text-white p-8 rounded-lg mb-12">
    <h2 className="text-2xl font-bold mb-4">Early Participation Benefits</h2>
    <p className="mb-4">
      As the platform grows towards significant scale, governance tokens will be distributed 
      to give participants direct influence over the platform's development. The distribution 
      model is designed to recognize and reward early adoption.
    </p>
    <div className="bg-opacity-10 bg-white p-6 rounded-lg">
      <p className="text-lg font-medium">
        The earlier and more actively you participate in SMARTUSDC.COM, the larger your 
        future allocation of governance tokens will be. This isn't just early access - 
        it's an opportunity to become a key stakeholder in the next evolution of 
        financial infrastructure.
      </p>
    </div>
  </div>

  {/* Steps Section - Enhanced */}
  <div className="grid md:grid-cols-4 gap-6 mb-12">
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-3">Start with Coinbase</h3>
      <p>Begin your journey with a trusted platform. Create a Coinbase account to access USDC 
        with full regulatory compliance and security.</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-3">Setup Your Wallet</h3>
      <p>Connect your preferred wallet through WalletConnect. We support MetaMask, Coinbase Wallet, 
        and other major wallets.</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-3">Join BASE Network</h3>
      <p>Experience the efficiency of Coinbase's BASE Network with minimal fees and 
        maximum security.</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-3">Participate & Earn</h3>
      <p>Start with any amount from $1 USDC. Early participants gain opportunities for 
        future governance rights.</p>
    </div>
  </div>

  {/* Enhanced FAQ Section */}
  <div className="mb-12">
    <h2 className="text-2xl font-bold mb-6">Common Questions</h2>
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-3">How is my security ensured?</h3>
        <p>Your funds are protected by the same security infrastructure that safeguards billions 
          in assets on Coinbase's networks. All smart contracts are publicly verifiable and 
          regularly audited, ensuring maximum transparency and security.</p>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-3">What about platform governance?</h3>
        <p>Early participants will receive governance tokens based on their platform engagement, 
          enabling them to help shape the platform's future development. The earlier and more 
          consistently you participate, the greater your potential governance allocation.</p>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-3">Can I withdraw at any time?</h3>
        <p>Yes, you maintain full control of your funds with no withdrawal restrictions or fees. 
          Our smart contracts ensure transparent and immediate access to your assets.</p>
      </div>
    </div>
  </div>

  {/* Previous sections remain the same */}

{/* Content Creators Section */}
<div className="bg-white text-gray-900 p-8 rounded-lg mb-12">
  <h2 className="text-2xl font-bold mb-6">Featured Content Creators</h2>
  <div className="bg-gray-50 p-6 rounded-lg">
    <p className="text-lg mb-4">Are you a content creator? Create a video or article about SMARTUSDC.COM and get featured here!</p>
    
    <h3 className="text-xl font-bold mb-3">Benefits of being featured:</h3>
    <div className="space-y-2 mb-6">
      <p>• Direct exposure to our growing user base</p>
      <p>• Permanent backlink to your content</p>
      <p>• Special referral tracking</p>
      <p>• Priority support and early access to new features</p>
      <p>• Opportunity to be highlighted as a trusted community voice</p>
    </div>

    <p className="text-gray-700">
      Contact us through our form to get your content featured. Quality content that helps users understand our platform will be prioritized for featuring.
    </p>
  </div>
</div>

{/* Referral Program Information */}
<div className="bg-white text-gray-900 p-8 rounded-lg mb-12">
  <h2 className="text-2xl font-bold mb-6">Referral Program</h2>
  <div className="bg-gray-50 p-6 rounded-lg">
    <p className="text-lg mb-4">
      Share SMARTUSDC.COM with your community and earn additional rewards. Our referral program is designed to reward both referrers and their referrals, creating a win-win situation for everyone involved.
    </p>
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xl font-bold mb-3">For Referrers</h3>
        <p>Earn additional rewards on your referrals' stakes while helping grow the community.</p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-3">For Those Referred</h3>
        <p>Get bonus rewards when joining through a referral code, boosting your earning potential.</p>
      </div>
    </div>
  </div>
</div>

{/* Contact Section */}
<div className="bg-white text-gray-900 p-8 rounded-lg mb-12">
  <h2 className="text-2xl font-bold mb-6">Need Support?</h2>
  <div className="text-center">
    <p className="text-lg mb-4">Our team is here to help you with any questions or concerns.</p>
    <a 
      href="mailto:support@smartusdc.com" 
      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Contact Support: support@smartusdc.com
    </a>
  </div>
</div>

{/* Footer - using the existing styling */}
<div className="footer-links text-center mt-8 pb-8">
  <a 
    href="mailto:support@smartusdc.com" 
    className="text-blue-600 hover:text-blue-800 transition-colors"
  >
    Contact us: support@smartusdc.com
  </a>
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

  useEffect(() => {
    console.log('Referral Code Status:', {
      existingReferralCode: existingReferralCode?.toString(),
      userInfoReferral: userInfo?.[3]?.toString(),
      isProcessing,
      address
    });
  }, [existingReferralCode, userInfo, isProcessing, address]);


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
      if (!stakeTx) throw new Error('Unable to process your deposit at this time. Please try again.');
      await refetchUserInfo();
      
      setInputAmount('');
      alert('Your deposit has been successfully processed and confirmed.');
    } catch (error: any) {
      console.error('Staking error:', error);
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
        <img src="/logo.png" alt="SMARTUSDC.COM" className="h-14 w-auto object-contain" />
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
      href="mailto:support@smartusdc.com"
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
