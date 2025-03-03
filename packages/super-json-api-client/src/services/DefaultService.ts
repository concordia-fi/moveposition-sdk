/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Broker } from '../models/Broker';
import type { CoreTypes_BrokerGuardrail } from '../models/CoreTypes_BrokerGuardrail';
import type { CoreTypes_BrokerHistory } from '../models/CoreTypes_BrokerHistory';
import type { CoreTypes_EventHistoryItem } from '../models/CoreTypes_EventHistoryItem';
import type { CoreTypes_EventTransaction } from '../models/CoreTypes_EventTransaction';
import type { CoreTypes_FlashLoanStrategy } from '../models/CoreTypes_FlashLoanStrategy';
import type { CoreTypes_FullEventTransactions } from '../models/CoreTypes_FullEventTransactions';
import type { CoreTypes_FullInstrumentsResponse } from '../models/CoreTypes_FullInstrumentsResponse';
import type { CoreTypes_HistoricalPrices } from '../models/CoreTypes_HistoricalPrices';
import type { CoreTypes_LendAndBorrowRequestV1 } from '../models/CoreTypes_LendAndBorrowRequestV1';
import type { CoreTypes_LiquidateRequestV1 } from '../models/CoreTypes_LiquidateRequestV1';
import type { CoreTypes_LiquidateRequestV2 } from '../models/CoreTypes_LiquidateRequestV2';
import type { CoreTypes_PointsHistoryTotals } from '../models/CoreTypes_PointsHistoryTotals';
import type { CoreTypes_PortfolioHistoryByDateTotals } from '../models/CoreTypes_PortfolioHistoryByDateTotals';
import type { CoreTypes_PortfolioState } from '../models/CoreTypes_PortfolioState';
import type { CoreTypes_PortfolioSummedHistoryByDate } from '../models/CoreTypes_PortfolioSummedHistoryByDate';
import type { CoreTypes_PortfolioWithFullRisk } from '../models/CoreTypes_PortfolioWithFullRisk';
import type { CoreTypes_Referal } from '../models/CoreTypes_Referal';
import type { CoreTypes_ReferralsByUser } from '../models/CoreTypes_ReferralsByUser';
import type { CoreTypes_RepayAndRedeemRequestV1 } from '../models/CoreTypes_RepayAndRedeemRequestV1';
import type { CoreTypes_RiskEval } from '../models/CoreTypes_RiskEval';
import type { CoreTypes_RiskInput } from '../models/CoreTypes_RiskInput';
import type { CoreTypes_RiskParamsHistory } from '../models/CoreTypes_RiskParamsHistory';
import type { CoreTypes_UserStrategy } from '../models/CoreTypes_UserStrategy';
import type { Evaluation } from '../models/Evaluation';
import type { FeatureToggles } from '../models/FeatureToggles';
import type { PacketResponse } from '../models/PacketResponse';
import type { PricesResponse } from '../models/PricesResponse';
import type { TransactionRequest } from '../models/TransactionRequest';
import type { types_PortfolioWithRisk } from '../models/types_PortfolioWithRisk';
import type { WalletBalances } from '../models/WalletBalances';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DefaultService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns Broker Ok
     * @throws ApiError
     */
    public getBrokers(): CancelablePromise<Array<Broker>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/brokers',
        });
    }

    /**
     * Request a broker by network address
     * @param networkAddress
     * @returns Broker A broker
     * @throws ApiError
     */
    public getBrokerByAddress(
        networkAddress: string,
    ): CancelablePromise<Broker> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/brokers/address/{networkAddress}',
            path: {
                'networkAddress': networkAddress,
            },
        });
    }

    /**
     * @param id
     * @returns Broker Ok
     * @throws ApiError
     */
    public getBrokerById(
        id: string,
    ): CancelablePromise<Broker> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/brokers/address/id/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Request to lend to a broker
     * @param requestBody The request object
     * @returns PacketResponse A Hocket packet
     * @throws ApiError
     */
    public lendV2(
        requestBody: TransactionRequest,
    ): CancelablePromise<PacketResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/brokers/lend/v2',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Request to redeem from a broker (reverse of lend)
     * @param requestBody The request object
     * @returns PacketResponse A Hocket packet
     * @throws ApiError
     */
    public redeemV2(
        requestBody: TransactionRequest,
    ): CancelablePromise<PacketResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/brokers/redeem/v2',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Request to borrow from a broker
     * @param requestBody The request object
     * @returns PacketResponse A Hocket packet
     * @throws ApiError
     */
    public borrowV2(
        requestBody: TransactionRequest,
    ): CancelablePromise<PacketResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/brokers/borrow/v2',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Request to repay from a broker (reverse of borrow)
     * @param requestBody The request object
     * @returns PacketResponse A Hocket packet
     * @throws ApiError
     */
    public repayV2(
        requestBody: TransactionRequest,
    ): CancelablePromise<PacketResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/brokers/repay/v2',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns CoreTypes_BrokerGuardrail Ok
     * @throws ApiError
     */
    public getGuardrails(): CancelablePromise<Array<CoreTypes_BrokerGuardrail>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/brokers/guardrails',
        });
    }

    /**
     * @param networkAddresses
     * @param from
     * @param to
     * @param offset
     * @param size
     * @returns any Ok
     * @throws ApiError
     */
    public getTransactions(
        networkAddresses: Array<string>,
        from: string,
        to: string,
        offset: number,
        size: number,
    ): CancelablePromise<Record<string, {
        history: Array<CoreTypes_BrokerHistory>;
        events: Array<CoreTypes_FullEventTransactions>;
    }>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/brokers/transactions',
            query: {
                'networkAddresses': networkAddresses,
                'from': from,
                'to': to,
                'offset': offset,
                'size': size,
            },
        });
    }

    /**
     * @param userAddress
     * @param networkAddresses
     * @param from
     * @param to
     * @param offset
     * @param size
     * @returns any Ok
     * @throws ApiError
     */
    public getTransactionsForUser(
        userAddress: string,
        networkAddresses: Array<string>,
        from: string,
        to: string,
        offset: number,
        size: number,
    ): CancelablePromise<Record<string, {
        events: Array<CoreTypes_EventTransaction>;
    }>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/brokers/transactions/user/{userAddress}',
            path: {
                'userAddress': userAddress,
            },
            query: {
                'networkAddresses': networkAddresses,
                'from': from,
                'to': to,
                'offset': offset,
                'size': size,
            },
        });
    }

    /**
     * @param networkAddress
     * @param to
     * @param from
     * @param offset
     * @param size
     * @returns any Ok
     * @throws ApiError
     */
    public getHistory(
        networkAddress: string,
        to: string,
        from: string,
        offset: number,
        size: number,
    ): CancelablePromise<{
        history: Array<CoreTypes_BrokerHistory>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/brokers/history/{networkAddress}',
            path: {
                'networkAddress': networkAddress,
            },
            query: {
                'to': to,
                'from': from,
                'offset': offset,
                'size': size,
            },
        });
    }

    /**
     * @param networkAddress
     * @param to
     * @param from
     * @param offset
     * @param size
     * @returns any Ok
     * @throws ApiError
     */
    public getHistoryParams(
        networkAddress: string,
        to: string,
        from: string,
        offset: number,
        size: number,
    ): CancelablePromise<{
        history: Array<CoreTypes_BrokerHistory>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/brokers/history-param/{networkAddress}',
            path: {
                'networkAddress': networkAddress,
            },
            query: {
                'to': to,
                'from': from,
                'offset': offset,
                'size': size,
            },
        });
    }

    /**
     * @returns CoreTypes_EventHistoryItem Ok
     * @throws ApiError
     */
    public getLendTransactions(): CancelablePromise<Array<CoreTypes_EventHistoryItem>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/brokers/transactions/lend',
        });
    }

    /**
     * @param networkAddresses
     * @param from
     * @param to
     * @param offset
     * @param size
     * @returns any Ok
     * @throws ApiError
     */
    public updateTransactions(
        networkAddresses: Array<string>,
        from: string,
        to: string,
        offset: number,
        size: number,
    ): CancelablePromise<Record<string, {
        history: Array<CoreTypes_BrokerHistory>;
        events: Array<CoreTypes_FullEventTransactions>;
    }>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/brokers/transactions/update',
            query: {
                'networkAddresses': networkAddresses,
                'from': from,
                'to': to,
                'offset': offset,
                'size': size,
            },
        });
    }

    /**
     * @returns boolean Ok
     * @throws ApiError
     */
    public checkRegionOk(): CancelablePromise<boolean> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/ip/checkRegion',
        });
    }

    /**
     * @returns CoreTypes_FlashLoanStrategy Ok
     * @throws ApiError
     */
    public getStrategies(): CancelablePromise<Array<CoreTypes_FlashLoanStrategy>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/multiply/strategies',
        });
    }

    /**
     * @param userAddress
     * @param lendToken
     * @param borrowToken
     * @returns CoreTypes_UserStrategy Ok
     * @throws ApiError
     */
    public getUserVault(
        userAddress: string,
        lendToken: string,
        borrowToken: string,
    ): CancelablePromise<CoreTypes_UserStrategy> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/multiply/vault/{userAddress}/{lendToken}/{borrowToken}',
            path: {
                'userAddress': userAddress,
                'lendToken': lendToken,
                'borrowToken': borrowToken,
            },
        });
    }

    /**
     * @returns string Ok
     * @throws ApiError
     */
    public listPortfolios(): CancelablePromise<Array<string>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/portfolios/list',
        });
    }

    /**
     * @param requestBody
     * @returns PacketResponse Ok
     * @throws ApiError
     */
    public repayAndRedeemV1(
        requestBody: CoreTypes_RepayAndRedeemRequestV1,
    ): CancelablePromise<PacketResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/portfolios/repayandredeem/v1',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns PacketResponse Ok
     * @throws ApiError
     */
    public lendAndBorrowV1(
        requestBody: CoreTypes_LendAndBorrowRequestV1,
    ): CancelablePromise<PacketResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/portfolios/lendandborrow/v1',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns PacketResponse Ok
     * @throws ApiError
     */
    public liquidateV1(
        requestBody: CoreTypes_LiquidateRequestV1,
    ): CancelablePromise<PacketResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/portfolios/liquidate/v1',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns PacketResponse Ok
     * @throws ApiError
     */
    public liquidateV2(
        requestBody: CoreTypes_LiquidateRequestV2,
    ): CancelablePromise<PacketResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/portfolios/liquidate/v2',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Request a portfolio by network address
     * @param address
     * @returns types_PortfolioWithRisk A portfolio
     * @throws ApiError
     */
    public getPortfolio(
        address: string,
    ): CancelablePromise<types_PortfolioWithRisk> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/portfolios/{address}',
            path: {
                'address': address,
            },
        });
    }

    /**
     * @param portfolioAddress
     * @param from
     * @param to
     * @param offset
     * @param size
     * @returns any Ok
     * @throws ApiError
     */
    public getPortfolioTransactions(
        portfolioAddress: string,
        from: string,
        to: string,
        offset: number,
        size: number,
    ): CancelablePromise<{
        events: Array<CoreTypes_EventTransaction>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/portfolios/transaction/{portfolio_address}',
            path: {
                'portfolio_address': portfolioAddress,
            },
            query: {
                'from': from,
                'to': to,
                'offset': offset,
                'size': size,
            },
        });
    }

    /**
     * @param portfolioAddress
     * @param action
     * @returns any Ok
     * @throws ApiError
     */
    public getPortfolioHasTypedTransaction(
        portfolioAddress: string,
        action: string,
    ): CancelablePromise<{
        has_transaction: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/portfolios/transaction/{portfolio_address}/{action}',
            path: {
                'portfolio_address': portfolioAddress,
                'action': action,
            },
        });
    }

    /**
     * @param portfolioAddress
     * @param action
     * @returns any Ok
     * @throws ApiError
     */
    public getPortfolioHasTypedTransactionCount(
        portfolioAddress: string,
        action: string,
    ): CancelablePromise<{
        count: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/portfolios/transaction/{portfolio_address}/{action}/count',
            path: {
                'portfolio_address': portfolioAddress,
                'action': action,
            },
        });
    }

    /**
     * @param portfolioAddress
     * @param action
     * @param coin
     * @returns any Ok
     * @throws ApiError
     */
    public getPortfolioHasCoinAction(
        portfolioAddress: string,
        action: string,
        coin: string,
    ): CancelablePromise<{
        has_coins: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/portfolios/transaction/{portfolio_address}/{action}/coin/{coin}',
            path: {
                'portfolio_address': portfolioAddress,
                'action': action,
                'coin': coin,
            },
        });
    }

    /**
     * @param portfolioAddress
     * @param action
     * @returns any Ok
     * @throws ApiError
     */
    public getPortfolioHasTypedTransactionCountPorto(
        portfolioAddress: string,
        action: string,
    ): CancelablePromise<{
        count: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/portfolios/transaction-porto/{portfolio_address}/{action}/count',
            path: {
                'portfolio_address': portfolioAddress,
                'action': action,
            },
        });
    }

    /**
     * @param portfolioAddress
     * @param action
     * @param coin
     * @returns any Ok
     * @throws ApiError
     */
    public getPortfolioHasCoinActionPorto(
        portfolioAddress: string,
        action: string,
        coin: string,
    ): CancelablePromise<{
        has_coins: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/portfolios/transaction-porto/{portfolio_address}/{action}/coin/{coin}',
            path: {
                'portfolio_address': portfolioAddress,
                'action': action,
                'coin': coin,
            },
        });
    }

    /**
     * @param portfolioAddress
     * @returns any Ok
     * @throws ApiError
     */
    public getPortfolioTransactionsHistory(
        portfolioAddress: string,
    ): CancelablePromise<{
        events: CoreTypes_PortfolioSummedHistoryByDate;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/portfolios/transaction/history/{portfolio_address}',
            path: {
                'portfolio_address': portfolioAddress,
            },
        });
    }

    /**
     * @param portfolioAddress
     * @returns CoreTypes_PortfolioHistoryByDateTotals Ok
     * @throws ApiError
     */
    public getPortfolioTransactionsHistoryTotals(
        portfolioAddress: string,
    ): CancelablePromise<CoreTypes_PortfolioHistoryByDateTotals> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/portfolios/transaction/history/totals/{portfolio_address}',
            path: {
                'portfolio_address': portfolioAddress,
            },
        });
    }

    /**
     * @returns CoreTypes_PointsHistoryTotals Ok
     * @throws ApiError
     */
    public getLatestPointsHistoryTotals(): CancelablePromise<Array<CoreTypes_PointsHistoryTotals>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/portfolios/transaction/history/points/latest',
        });
    }

    /**
     * @param address
     * @returns any Ok
     * @throws ApiError
     */
    public getConnectedPortfolios(
        address: string,
    ): CancelablePromise<{
        connected: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/portfolios/{address}/connected',
            path: {
                'address': address,
            },
        });
    }

    /**
     * Get latest prices, in USD decimal
     * @param names unique names of instruments
     * @returns PricesResponse Ok
     * @throws ApiError
     */
    public getPrices(
        names: Array<string>,
    ): CancelablePromise<PricesResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/prices',
            query: {
                'names': names,
            },
        });
    }

    /**
     * Get historical price data for the last year
     * @param names unique names of instruments
     * @returns CoreTypes_HistoricalPrices Ok
     * @throws ApiError
     */
    public getPriceHistoryForYear(
        names: Array<string>,
    ): CancelablePromise<CoreTypes_HistoricalPrices> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/prices/historical/year',
            query: {
                'names': names,
            },
        });
    }

    /**
     * @returns CoreTypes_FullInstrumentsResponse Ok
     * @throws ApiError
     */
    public getFullInstrumentPriceHistory(): CancelablePromise<CoreTypes_FullInstrumentsResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/prices/full',
        });
    }

    /**
     * @param portfolioAddress
     * @returns CoreTypes_Referal Ok
     * @throws ApiError
     */
    public getReferals(
        portfolioAddress: string,
    ): CancelablePromise<Array<CoreTypes_Referal>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/referals/{portfolio_address}',
            path: {
                'portfolio_address': portfolioAddress,
            },
        });
    }

    /**
     * @param portfolioAddress
     * @returns any Ok
     * @throws ApiError
     */
    public getReferalCode(
        portfolioAddress: string,
    ): CancelablePromise<{
        code: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/referals/{portfolio_address}/code',
            path: {
                'portfolio_address': portfolioAddress,
            },
        });
    }

    /**
     * @param portfolioAddress
     * @param requestBody
     * @returns CoreTypes_Referal Ok
     * @throws ApiError
     */
    public createReferal(
        portfolioAddress: string,
        requestBody: {
            code: string;
        },
    ): CancelablePromise<CoreTypes_Referal> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/referals/{portfolio_address}/refer',
            path: {
                'portfolio_address': portfolioAddress,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param portfolioAddress
     * @returns CoreTypes_ReferralsByUser Ok
     * @throws ApiError
     */
    public getReferralsByUser(
        portfolioAddress: string,
    ): CancelablePromise<CoreTypes_ReferralsByUser> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/referals/{portfolio_address}/referralsByUser',
            path: {
                'portfolio_address': portfolioAddress,
            },
        });
    }

    /**
     * @param names
     * @returns CoreTypes_RiskParamsHistory Ok
     * @throws ApiError
     */
    public getRiskParamsHistory(
        names: Array<string>,
    ): CancelablePromise<CoreTypes_RiskParamsHistory> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/risk/params/history',
            query: {
                'names': names,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Evaluation Ok
     * @throws ApiError
     */
    public getRiskSimulated(
        requestBody: CoreTypes_PortfolioState,
    ): CancelablePromise<Evaluation> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/risk/simulated',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param address
     * @returns CoreTypes_PortfolioWithFullRisk Ok
     * @throws ApiError
     */
    public getRiskFull(
        address: string,
    ): CancelablePromise<CoreTypes_PortfolioWithFullRisk> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/risk/full/{address}',
            path: {
                'address': address,
            },
        });
    }

    /**
     * @param address
     * @returns CoreTypes_RiskInput Ok
     * @throws ApiError
     */
    public getRiskInputs(
        address: string,
    ): CancelablePromise<CoreTypes_RiskInput> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/risk/inputs/{address}',
            path: {
                'address': address,
            },
        });
    }

    /**
     * @param requestBody
     * @returns CoreTypes_RiskEval Ok
     * @throws ApiError
     */
    public setRiskCustom(
        requestBody: CoreTypes_RiskInput,
    ): CancelablePromise<CoreTypes_RiskEval> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/risk/custom',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns FeatureToggles Ok
     * @throws ApiError
     */
    public getToggles(): CancelablePromise<FeatureToggles> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/toggles',
        });
    }

    /**
     * @param toggleName
     * @returns boolean Ok
     * @throws ApiError
     */
    public getToggle(
        toggleName: string,
    ): CancelablePromise<boolean> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/toggles/{toggleName}',
            path: {
                'toggleName': toggleName,
            },
        });
    }

    /**
     * @param address
     * @returns WalletBalances Ok
     * @throws ApiError
     */
    public getBalances(
        address: string,
    ): CancelablePromise<WalletBalances> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/wallets/{address}',
            query: {
                'address': address,
            },
        });
    }

}
