/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Evaluation } from './Evaluation';
import type { PositionSuperCore } from './PositionSuperCore';

export type CoreTypes_PortfolioWithFullRisk = {
    id: string;
    collaterals: Array<PositionSuperCore>;
    liabilities: Array<PositionSuperCore>;
    risk: Evaluation;
};

