import {
  APIResponse,
  BrokerProductType,
  BrokerSubWithdrawalRequest,
  BrokerSubAPIKeyModifyRequest,
  BrokerSubListRequest,
} from './types';
import { REST_CLIENT_TYPE_ENUM } from './util';
import BaseRestClient from './util/BaseRestClient';

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
}
