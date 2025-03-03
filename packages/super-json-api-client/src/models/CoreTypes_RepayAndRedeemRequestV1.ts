/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PortfolioState } from './PortfolioState';

export type CoreTypes_RepayAndRedeemRequestV1 = {
    network: string;
    /**
     * Repay broker identifier on the blockchain
     */
    repayBrokerName: string;
    /**
     * Repay u64 in raw token units
     */
    repayAmount: string;
    /**
     * Redeem broker identifier on the blockchain
     */
    redeemBrokerName: string;
    /**
     * Redeem u64 in raw token units
     */
    redeemAmount: string;
    /**
     * User identifier
     */
    user: string;
    /**
     * Current state of portfolio before borrow
     */
    currentPortfolioState: PortfolioState;
};

