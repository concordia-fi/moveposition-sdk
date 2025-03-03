/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Asset Specific Parameters for the model.
 */
export type bindings_AssetMetadata = {
    /**
     * Unique identifier for the asset.
     */
    id: string;
    /**
     * A list of historical prices for the asset.
     * The prices are assumed to be 1 hour apart and in chronological order.
     */
    history: Array<{
        value: number;
    }>;
    /**
     * Weight of historical stress events in the model.
     * Stress events are defined as the greatest absolute value of
     * the relative returns for the portfolio calculated from the historical prices.
     */
    alpha: number;
    /**
     * Weight of historical volatility in the model.
     */
    lambda: number;
    /**
     * The current price of the asset.
     * This is considered especially as the last historical price
     * could be lagging behind the exact current price.
     */
    price_now: number;
};

