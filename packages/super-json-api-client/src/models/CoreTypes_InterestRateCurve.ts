/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CoreTypes_InterestRateCurve = {
    /**
     * The first juncture
     */
    u1: number;
    /**
     * The second juncture
     */
    u2: number;
    /**
     * Borrow rate at util = 0%
     */
    r0: number;
    /**
     * Borrow rate at util = u1
     */
    r1: number;
    /**
     * Borrow rate at util = u2
     */
    r2: number;
    /**
     * Borrow rate at util = 100%
     */
    r3: number;
};

