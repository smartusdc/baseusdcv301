// src/abis/contracts.ts を作成
import { stakingABI } from './stakingABI';
import { usdcABI } from './usdcABI';

export const CONTRACTS = {
  USDC: {
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as `0x${string}`,
    abi: usdcABI,
  },
  STAKING: {
    address: '0x2Bd38bD63D66b360dE91E2F8CAEe48AA0B159a00' as `0x${string}`,
    abi: stakingABI,
  },
} as const;
