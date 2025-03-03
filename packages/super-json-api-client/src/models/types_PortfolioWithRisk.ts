/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Evaluation } from './Evaluation';
import type { MaxBorrow } from './MaxBorrow';
import type { PositionSuperCore } from './PositionSuperCore';
import type { RiskEquity } from './RiskEquity';

export type types_PortfolioWithRisk = {
    id: string;
    collaterals: Array<PositionSuperCore>;
    liabilities: Array<PositionSuperCore>;
    risk: RiskEquity;
    maxBorrow: MaxBorrow;
    evaluation: Evaluation;
};

