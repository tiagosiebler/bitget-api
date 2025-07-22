import {
  BrokerProductType,
  BrokerSubAPIKeyModifyRequest,
  BrokerSubListRequest,
  BrokerSubWithdrawalRequest,
} from './types/request/v1/brokerV1.js';
import { APIResponse } from './types/response/v1/shared.js';
import BaseRestClient from './util/BaseRestClient.js';
import { REST_CLIENT_TYPE_ENUM } from './util/requestUtils.js';

/**
 * REST API client for the V1 bitget Broker APIs. These are the previous generation of Bitget's APIs and should be considered deprecated.
 * These will be removed in a future release, once Bitget formally deprecates them.
 *
 * @deprecated use RestClientV2 instead
 */
export class BrokerClient extends BaseRestClient {
  getClientType() {
    return REST_CLIENT_TYPE_ENUM.broker;
  }

  /**
   *
   * Sub Account Interface
   *
   */

  /** Get Broker Info */
  getBrokerInfo(): Promise<APIResponse<any>> {
    return this.getPrivate('/api/broker/v1/account/info');
  }

  /** Create Sub Account */
  createSubAccount(
    subName: string,
    remark?: string,
  ): Promise<APIResponse<any>> {
    return this.postPrivate('/api/broker/v1/account/sub-create', {
      subName,
      remark,
    });
  }

  /** Get Sub List */
  getSubAccounts(params?: BrokerSubListRequest): Promise<APIResponse<any>> {
    return this.getPrivate('/api/broker/v1/account/sub-list', params);
  }

  /** Modify Sub Account */
  modifySubAccount(
    subUid: string,
    perm: string,
    status: 'normal' | 'freeze' | 'del',
  ): Promise<APIResponse<any>> {
    return this.postPrivate('/api/broker/v1/account/sub-modify', {
      subUid,
      perm,
      status,
    });
  }

  /** Modify Sub Email */
  modifySubEmail(subUid: string, subEmail: string): Promise<APIResponse<any>> {
    return this.postPrivate('/api/broker/v1/account/sub-modify-email', {
      subUid,
      subEmail,
    });
  }

  /** Get Sub Email */
  getSubEmail(subUid: string): Promise<APIResponse<any>> {
    return this.getPrivate('/api/broker/v1/account/sub-email', { subUid });
  }

  /** Get Sub Spot Assets */
  getSubSpotAssets(subUid: string): Promise<APIResponse<any>> {
    return this.getPrivate('/api/broker/v1/account/sub-spot-assets', {
      subUid,
    });
  }

  /** Get Sub Future Assets */
  getSubFutureAssets(
    subUid: string,
    productType: BrokerProductType,
  ): Promise<APIResponse<any>> {
    return this.getPrivate('/api/broker/v1/account/sub-future-assets', {
      subUid,
      productType,
    });
  }

  /** Get Sub Deposit Address (Only Broker) */
  getSubDepositAddress(
    subUid: string,
    coin: string,
    chain?: string,
  ): Promise<APIResponse<any>> {
    return this.postPrivate('/api/broker/v1/account/sub-address', {
      subUid,
      coin,
      chain,
    });
  }

  /** Sub Withdrawal (Only Broker) */
  subWithdrawal(params: BrokerSubWithdrawalRequest): Promise<APIResponse<any>> {
    return this.postPrivate('/api/broker/v1/account/sub-withdrawal', params);
  }

  /** Sub Deposit Auto Transfer (Only Broker) */
  setSubDepositAutoTransfer(
    subUid: string,
    coin: string,
    toAccountType: 'spot' | 'mix_usdt' | 'mix_usd' | 'mix_usdc',
  ): Promise<APIResponse<any>> {
    return this.postPrivate('/api/broker/v1/account/sub-auto-transfer', {
      subUid,
      coin,
      toAccountType,
    });
  }

  /**
   *
   * Sub API Interface
   *
   */

  /** Create Sub ApiKey (Only Broker) */
  createSubAPIKey(
    subUid: string,
    passphrase: string,
    remark: string,
    ip: string,
    perm?: string,
  ): Promise<APIResponse<any>> {
    return this.postPrivate('/api/broker/v1/manage/sub-api-create', {
      subUid,
      passphrase,
      remark,
      ip,
      perm,
    });
  }

  /** Get Sub ApiKey List */
  getSubAPIKeys(subUid: string): Promise<APIResponse<any>> {
    return this.getPrivate('/api/broker/v1/manage/sub-api-list', { subUid });
  }

  /** Modify Sub ApiKey (Only Broker) */
  modifySubAPIKey(
    params: BrokerSubAPIKeyModifyRequest,
  ): Promise<APIResponse<any>> {
    return this.postPrivate('/api/broker/v1/manage/sub-api-modify', params);
  }

  /**
   * Undocumented endpoints
   */

  getAgentCommissionDetail(params?: {
    startTime?: string;
    endTime?: string;
    limit?: string;
    idLessThan?: string;
  }): Promise<APIResponse<any>> {
    return this.getPrivate(
      '/api/broker/v1/agent/commission-distribution',
      params,
    );
  }

  /** Get Agent Customer List */
  getAgentCustomerList(params?: {
    startTime?: string;
    endTime?: string;
    pageNo?: string;
    pageSize?: string;
    uid?: string;
    referralCode?: string;
  }): Promise<APIResponse<any>> {
    return this.postPrivate('/api/broker/v1/agent/customerList', params);
  }

  /**
   * Get Agent Customer Deposit List
   * Includes both on-chain deposits and internal transfers
   * Note: Can only query data within the last 90 days
   */
  getAgentCustomerDepositList(params?: {
    startTime?: string;
    endTime?: string;
    pageNo?: string;
    pageSize?: string;
    uid?: string;
  }): Promise<APIResponse<any>> {
    return this.postPrivate('/api/broker/v1/agent/customerDepositList', params);
  }

  /**
   * Get Agent Customer Trade Volume List
   * Includes trading volume for both spot and futures
   * Note: Data updates every 10 minutes and can only query last 90 days
   */
  getAgentCustomerTradeVolumeList(params?: {
    startTime?: string;
    endTime?: string;
    pageNo?: string;
    pageSize?: string;
    uid?: string;
  }): Promise<APIResponse<any>> {
    return this.postPrivate(
      '/api/broker/v1/agent/customerTradeVolumnList',
      params,
    );
  }

  /**
   * Get Agent Customer Assets List
   * Returns account balances for customer accounts
   * Note: Data updates every 10 minutes
   */
  getAgentCustomerAssetsList(params?: {
    pageNo?: string;
    pageSize?: string;
    uid?: string;
  }): Promise<APIResponse<any>> {
    return this.postPrivate(
      '/api/broker/v1/agent/customerAccountAssetsList',
      params,
    );
  }

  /**
   * Get Agent Direct Commissions
   * Returns commission data for direct customers
   * Note: Data updates on T+1 (UTC+8) basis and can only query last 90 days
   */
  getAgentCustomerCommissions(params?: {
    startTime?: string;
    endTime?: string;
    idLessThan?: string;
    limit?: string;
    uid?: string;
    coin?: string;
    symbol?: string;
  }): Promise<APIResponse<any>> {
    return this.getPrivate('/api/broker/v1/agent/customer-commissions', params);
  }

  /**
   * Get Agent Customer KYC Result
   * Returns KYC verification status for customers
   */
  getAgentCustomerKycResult(params?: {
    startTime?: string;
    endTime?: string;
    pageNo?: string;
    pageSize?: string;
    uid?: string;
  }): Promise<APIResponse<any>> {
    return this.getPrivate('/api/broker/v1/agent/customer-kyc-result', params);
  }
}
