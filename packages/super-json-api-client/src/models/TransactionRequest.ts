/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PortfolioState } from './PortfolioState';

export type TransactionRequest = {
    network: string;
    /**
     * Broker identifier on the blockchain
     */
    brokerName: string;
    /**
     * u64 in raw token units
     */
    amount: string;
    /**
     * Current state of portfolio before borrow
     */
    currentPortfolioState: PortfolioState;
    signerPubkey: string;
};

