// src/pages/index.tsx
import { useState, useEffect } from 'react';
import { useAccount, useContractRead, useNetwork, useSwitchNetwork, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { stakingABI } from '../abis/stakingABI';
import { usdcABI } from '../abis/usdcABI';
import { CONTRACTS } from '../abis/contracts';

// Contract Configuration
const CONTRACT_ADDRESS = '0x2Bd38bD63D66b360dE91E2F8CAEe48AA0B159a00' as `0x${string}`;
const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as `0x${string}`;
const BASE_CHAIN_ID = 8453;
const MIN_DEPOSIT = '0.01';

export default function Home() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [inputAmount, setInputAmount] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processReferralCode, setProcessReferralCode] = useState<number | undefined>();


  // Contract Data Reads with Proper Error Handling
  const { data: userInfo, refetch: refetchUserInfo } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: stakingABI,
    functionName: 'users',
    args: [address],
    enabled: !!address,
});
  
  const { data: allowance } = useContractRead({
    address: USDC_ADDRESS,
    abi: usdcABI,
    functionName: 'allowance',
    args: address ? [address, CONTRACT_ADDRESS] : undefined,
    enabled: !!address,
  });

// Contract Interactions
const { config: approveConfig } = usePrepareContractWrite({
  address: CONTRACTS.USDC.address,
  abi: CONTRACTS.USDC.abi,
  functionName: 'approve',
  enabled: !!address && !!inputAmount,
});
const { writeAsync: approveUsdc } = useContractWrite(approveConfig);

const { config: stakeConfig } = usePrepareContractWrite({
  address: CONTRACT_ADDRESS,
  abi: stakingABI,
  functionName: 'depositFunds',
  enabled: !!address && !!inputAmount,
});
const { writeAsync: stake } = useContractWrite(stakeConfig);

// Claim Rewards
const { config: claimRewardsConfig } = usePrepareContractWrite({
  address: CONTRACT_ADDRESS,
  abi: stakingABI,
  functionName: 'claimDepositReward',
  enabled: !!address,
});
const { writeAsync: claimRewards } = useContractWrite(claimRewardsConfig);

// Claim Referral Rewards
const { config: claimReferralRewardsConfig } = usePrepareContractWrite({
  address: CONTRACT_ADDRESS,
  abi: stakingABI,
  functionName: 'claimReferralReward',
  enabled: !!address,
});
const { writeAsync: claimReferralRewards } = useContractWrite(claimReferralRewardsConfig);

// Generate Referral Code
const { config: generateReferralCodeConfig } = usePrepareContractWrite({
  address: CONTRACT_ADDRESS,
  abi: stakingABI,
  functionName: 'generateReferralCode',
  enabled: !!address,
});
const { writeAsync: generateReferralCode } = useContractWrite(generateReferralCodeConfig);

// Process Referral
const { config: processReferralConfig } = usePrepareContractWrite({
  address: CONTRACT_ADDRESS,
  abi: stakingABI,
  functionName: 'processReferral',
  args: typeof processReferralCode !== 'undefined' ? [BigInt(processReferralCode)] : undefined,
  enabled: !!address && typeof processReferralCode !== 'undefined',
});
const { writeAsync: processReferral } = useContractWrite(processReferralConfig);

  // Network Validation
  useEffect(() => {
    if (chain && chain.id !== BASE_CHAIN_ID) {
      alert('Please switch to BASE Network');
      switchNetwork?.(BASE_CHAIN_ID);
    }
  }, [chain, switchNetwork]);

  // Transaction Handlers with Comprehensive Error Management
const handleStake = async () => {
  if (!address || isProcessing) return;
  if (!inputAmount || parseFloat(inputAmount) < parseFloat(MIN_DEPOSIT)) {
    alert(`Minimum stake amount is ${MIN_DEPOSIT} USDC`);
    return;
  }

  try {
    setIsProcessing(true);
    const amount = parseUnits(inputAmount, 6);
    const referralCodeNumber = referralCode ? parseInt(referralCode) : 0;

    if (!allowance || allowance < amount) {
      const approveTx = await approveUsdc?.();
      if (!approveTx) throw new Error('Failed to approve');
    }

    const stakeTx = await stake?.();
    if (!stakeTx) throw new Error('Failed to stake');
    await refetchUserInfo();
    
    setInputAmount('');
    setReferralCode('');
    alert('Staking successful');
  } catch (error: any) {
    console.error('Staking error:', error);
    let message = 'Transaction failed';
    if (error.message.includes('insufficient funds')) {
      message = 'Insufficient USDC balance';
    } else if (error.message.includes('referral code')) {
      message = 'Invalid referral code';
    }
    alert(message);
  } finally {
    setIsProcessing(false);
  }
};

const handleApplyReferral = async () => {
  if (!address || isProcessing || !referralCode) return;
  
  try {
    setIsProcessing(true);
    const referralCodeNumber = parseInt(referralCode);
    setProcessReferralCode(referralCodeNumber);
    const tx = await processReferral?.();
    if (!tx) throw new Error('Failed to process referral');
    await refetchUserInfo();
    setReferralCode('');
    alert('Referral code applied successfully');
  } catch (error: any) {
    console.error('Apply referral error:', error);
    let message = 'Failed to apply referral code';
    if (error.message.includes('Already has referrer')) {
      message = 'You already have a referrer';
    } else if (error.message.includes('Must have active deposit')) {
      message = 'Please make a deposit first';
    }
    alert(message);
  } finally {
    setIsProcessing(false);
  }
};

const handleClaimStakingRewards = async () => {
  if (!address || isProcessing) return;
  
  try {
    setIsProcessing(true);
    const tx = await claimRewards?.();
    if (!tx) throw new Error('Failed to claim rewards');
    await refetchUserInfo();
    alert('Rewards claimed successfully');
  } catch (error: any) {
    console.error('Claim rewards error:', error);
    alert(error?.message || 'Failed to claim rewards');
  } finally {
    setIsProcessing(false);
  }
};

const handleClaimReferralRewards = async () => {
  if (!address || isProcessing) return;
  
  try {
    setIsProcessing(true);
    const tx = await claimReferralRewards?.();
    if (!tx) throw new Error('Failed to claim referral rewards');
    await refetchUserInfo();
    alert('Referral rewards claimed successfully');
  } catch (error: any) {
    console.error('Claim referral rewards error:', error);
    alert(error?.message || 'Failed to claim referral rewards');
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

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">BaseUSDC</h1>
          <ConnectButton />
        </header>

        <main className="space-y-6">
          {/* Staking Interface */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Stake USDC</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                  type="number"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  placeholder={`Min ${MIN_DEPOSIT} USDC`}
                  className="w-full rounded-md border p-2"
                  disabled={isProcessing}
                />
              </div>

              {!userInfo?.hasReferrer && (
                <div>
                  <label className="block text-sm font-medium mb-1">Referral Code (Optional)</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="Enter referral code"
                      className="flex-1 rounded-md border p-2"
                      disabled={isProcessing}
                    />
                    <button
                      onClick={handleApplyReferral}
                      disabled={isProcessing || !referralCode}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md disabled:bg-gray-400"
                    >
                      Apply Code
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={handleStake}
                disabled={isProcessing || !address || (chain?.id !== BASE_CHAIN_ID)}
                className="w-full bg-blue-600 text-white rounded-md py-2 disabled:bg-gray-400"
              >
                {isProcessing ? 'Processing...' : 'Stake USDC'}
              </button>
            </div>

            {userInfo && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between mb-2">
                  <span>Your Stake:</span>
                  <span>{formatUnits(userInfo.depositAmount, 6)} USDC</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending Rewards:</span>
                  <span>{formatUnits(userInfo.pendingRewards, 6)} USDC</span>
                </div>
              </div>
            )}
          </div>

          {/* Rewards Interface */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Available Rewards</h2>
            
            {/* Staking Rewards */}
            {userInfo?.pendingRewards > 0 && (
              <div className="mb-6">
                <div className="p-4 bg-gray-50 rounded-md mb-4">
                  <p className="text-sm text-gray-600">Staking Rewards:</p>
                  <p className="text-lg font-medium">{formatUnits(userInfo.pendingRewards, 6)} USDC</p>
                </div>
                <button
                  onClick={handleClaimStakingRewards}
                  disabled={isProcessing}
                  className="w-full bg-green-600 text-white rounded-md py-2 disabled:bg-gray-400"
                >
                  {isProcessing ? 'Processing...' : 'Claim Staking Rewards'}
                </button>
              </div>
            )}

            {/* Referral Rewards */}
            {userInfo?.referralRewards > 0 && (
              <div>
                <div className="p-4 bg-gray-50 rounded-md mb-4">
                  <p className="text-sm text-gray-600">Referral Rewards:</p>
                  <p className="text-lg font-medium">{formatUnits(userInfo.referralRewards, 6)} USDC</p>
                </div>
                <button
                  onClick={handleClaimReferralRewards}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 text-white rounded-md py-2 disabled:bg-gray-400"
                >
                  {isProcessing ? 'Processing...' : 'Claim Referral Rewards'}
                </button>
              </div>
            )}

            {(!userInfo?.pendingRewards || userInfo.pendingRewards <= 0) && 
             (!userInfo?.referralRewards || userInfo.referralRewards <= 0) && (
              <p className="text-center text-gray-500">No rewards available to claim</p>
            )}
          </div>

          {/* Referral Program Interface */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Referral Program</h2>
            
            {!userInfo?.referralCode ? (
              <div>
                <button
                  onClick={handleGenerateReferralCode}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 text-white rounded-md py-2 disabled:bg-gray-400"
                >
                  {isProcessing ? 'Generating...' : 'Generate Referral Code'}
                </button>
              </div>
            ) : (
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">Your Referral Code:</p>
                <p className="text-lg font-medium">{userInfo.referralCode.toString()}</p>
              </div>
            )}

            <div className="mt-4">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Total Referrals:</span>
                <span className="font-medium">{userInfo?.totalReferrals?.toString() || '0'}</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}