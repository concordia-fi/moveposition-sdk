/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PortfolioState } from './PortfolioState';

export type CoreTypes_UserStrategy = {
    strategy_name: string;
    wallet_address: string;
    vault_address: string;
    vault_balance: PortfolioState;
    leverage_value: number;
    health_ratio: number;
    estimated_closing_amount: number;
};

