/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CoreTypes_InterestRateCurve } from './CoreTypes_InterestRateCurve';
import type { CoreTypes_PricedInstrument } from './CoreTypes_PricedInstrument';

export type Broker = {
    /**
     * The broker's network
     */
    network: string;
    /**
     * The broker's network identifier
     */
    networkAddress: string;
    /**
     * The network specific ID
     */
    underlyingAsset: CoreTypes_PricedInstrument;
    depositNote: CoreTypes_PricedInstrument;
    loanNote: CoreTypes_PricedInstrument;
    /**
     * Raw units
     */
    availableLiquidityUnderlying: string;
    /**
     * Raw units
     */
    totalBorrowedUnderlying: string;
    /**
     * Scaled units
     */
    scaledAvailableLiquidityUnderlying: string;
    /**
     * Scaled units
     */
    scaledTotalBorrowedUnderlying: string;
    /**
     * Current interest rate
     */
    interestRate: number;
    /**
     * Underlying interest rate curve settings
     */
    interestRateCurve: CoreTypes_InterestRateCurve;
    /**
     * Interest fee rate
     */
    interestFeeRate: number;
    /**
     * Maximum deposits to this broker, in raw units
     */
    maxDeposit: string;
    /**
     * Scaled (normalized) max deposit
     */
    maxDepositScaled: string;
    /**
     * Maximum loans from this broker, in raw units
     */
    maxBorrow: string;
    /**
     * Scaled (normalized decimal) max borrow
     */
    maxBorrowScaled: string;
    utilization: number;
    depositNoteExchangeRate: number;
    loanNoteExchangeRate: number;
    loanNoteSupply: string;
    depositNoteSupply: string;
};

