/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PortfolioState } from './PortfolioState';

export type CoreTypes_LendAndBorrowRequestV1 = {
    network: string;
    /**
     * Lend broker identifier on the blockchain
     */
    lendBrokerName: string;
    /**
     * Lend u64 in raw token units
     */
    lendAmount: string;
    /**
     * Borrow broker identifier on the blockchain
     */
    borrowBrokerName: string;
    /**
     * Borrow u64 in raw token units
     */
    borrowAmount: string;
    /**
     * User identifier
     */
    user: string;
    /**
     * Current state of portfolio before borrow
     */
    currentPortfolioState: PortfolioState;
};

