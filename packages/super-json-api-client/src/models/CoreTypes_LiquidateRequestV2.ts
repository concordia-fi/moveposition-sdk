/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PortfolioState } from './PortfolioState';

export type CoreTypes_LiquidateRequestV2 = {
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
    brokerNameThree: string;
    brokerNameFour: string;
    brokerNameFive: string;
    brokerNameSix: string;
    brokerNameSeven: string;
    brokerNameEight: string;
    brokerNameNine: string;
    brokerNameTen: string;
    brokerNameEleven: string;
    brokerNameTwelve: string;
    brokerNameThirteen: string;
    brokerNameFourteen: string;
    brokerNameFifteen: string;
    brokerNameSixteen: string;
    brokerNameSeventeen: string;
    brokerNameEighteen: string;
    brokerNameNineteen: string;
    brokerNameTwenty: string;
    brokerNameTwentyOne: string;
    brokerNameTwentyTwo: string;
    brokerNameTwentyThree: string;
    brokerNameTwentyFour: string;
    brokerNameTwentyFive: string;
    brokerNameTwentySix: string;
    brokerNameTwentySeven: string;
    brokerNameTwentyEight: string;
    brokerNameTwentyNine: string;
    brokerNameThirty: string;
    brokerNameThirtyOne: string;
    brokerNameThirtyTwo: string;
    /**
     * Current state of portfolio before borrow
     */
    currentLiquidatorPortfolio: PortfolioState;
    /**
     * Current state of portfolio before borrow
     */
    currentLiquidateePortfolio: PortfolioState;
};

