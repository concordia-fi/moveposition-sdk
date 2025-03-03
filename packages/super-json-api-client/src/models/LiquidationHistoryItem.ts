/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type LiquidationHistoryItem = {
    transaction_version: string;
    transaction_block_height: number;
    liqee_address: string;
    liqor_address: string;
    collateral_amount: string;
    collateral_price_id: string;
    liability_amount: string;
    liability_price_id: string;
    fee_amount: string;
    loan_fee_amount: string;
    created: number;
    action: LiquidationHistoryItem.action;
};

export namespace LiquidationHistoryItem {

    export enum action {
        LIQUIDATE = 'liquidate',
    }


}

