/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PortfolioState } from './PortfolioState';

export type CoreTypes_LiquidateRequestV1 = {
    network: string;
    /**
     * Pubkey of the liquidator
     */
    liquidatorPubkey: string;
    /**
     * Pubkey of the liquidatee
     */
    liquidateePubkey: string;
    brokerNameOne: string;
    brokerNameTwo: string;
    /**
     * Current state of portfolio before borrow
     */
    currentLiquidatorPortfolio: PortfolioState;
    /**
     * Current state of portfolio before borrow
     */
    currentLiquidateePortfolio: PortfolioState;
};

