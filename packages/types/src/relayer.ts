import { Logger } from "pino";
import { IJsonRpcProvider, JsonRpcPayload, IEvents } from "@walletconnect/jsonrpc-types";

import { IClient } from "./client";
import { ISubscription, SubscriptionParams } from "./subscription";
import { IJsonRpcHistory } from "./history";

export declare namespace RelayerTypes {
  export interface ProtocolOptions {
    protocol: string;
    params?: any;
  }

  export interface PublishOptions {
    relay: ProtocolOptions;
    ttl?: number;
  }

  export interface SubscribeOptions {
    relay: ProtocolOptions;
  }

  export interface UnsubscribeOptions {
    relay: ProtocolOptions;
  }

  export type RequestOptions = PublishOptions | SubscribeOptions | UnsubscribeOptions;

  export interface PayloadEvent {
    topic: string;
    payload: JsonRpcPayload;
  }
}

export interface PublishParams {
  topic: string;
  payload: JsonRpcPayload;
  opts: Required<RelayerTypes.PublishOptions>;
}

export abstract class IRelayer extends IEvents {
  public abstract queue: Map<number, PublishParams>;

  public abstract pending: Map<string, SubscriptionParams>;

  public abstract subscriptions: ISubscription;

  public abstract history: IJsonRpcHistory;

  public abstract provider: IJsonRpcProvider;

  public abstract name: string;

  public abstract readonly context: string;

  public abstract readonly connected: boolean;

  public abstract readonly connecting: boolean;

  constructor(public client: IClient, public logger: Logger, provider?: string | IJsonRpcProvider) {
    super();
  }

  public abstract init(): Promise<void>;

  public abstract publish(
    topic: string,
    payload: JsonRpcPayload,
    opts?: RelayerTypes.PublishOptions,
  ): Promise<void>;

  public abstract subscribe(topic: string, opts?: RelayerTypes.SubscribeOptions): Promise<string>;

  public abstract unsubscribe(topic: string, opts?: RelayerTypes.UnsubscribeOptions): Promise<void>;
}
