/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * An evaluation of a portfolio with the intermediate steps included.
 */
export type Evaluation = {
    /**
     * Maintenance Margin, also known as Initial Margin.
     */
    mm: number;
    /**
     * Whether or not the portfolio is considered healthy
     */
    health_ratio: number;
    /**
     * Total collateral in the portfolio.
     */
    total_collateral: number;
    /**
     * Total liability in the portfolio.
     */
    total_liability: number;
    /**
     * Loan to Value (LTV) ratio for the portfolio.
     */
    ltv: number;
    /**
     * Revolatilized returns for each asset.
     * The keys are asset identifiers, and the values are arrays of numbers representing the revolatilized returns.
     */
    rvols: Record<string, Array<number>>;
    /**
     * Profit and Loss (PnL) values for the portfolio.
     * This is an array of numbers, each representing the PnL.
     */
    pnls: Array<number>;
    /**
     * Final volatility scalar for each asset.
     * The keys are asset identifiers, and the values are the final volatility scalars.
     */
    final_vol_scalars: Record<string, number>;
    /**
     * The stress event value for each asset.
     * The keys are asset identifiers, and the values are the stress event values.
     */
    stresses: Record<string, number>;
    /**
     * Volatility for each asset.
     * The keys are asset identifiers, and the values are arrays of numbers representing the volatilities.
     */
    vols: Record<string, Array<number>>;
    /**
     * Relative returns for each asset.
     * The keys are asset identifiers, and the values are arrays of numbers representing the relative returns.
     */
    rrs: Record<string, Array<number>>;
};

