/// <reference types="chrome" />
import { ChatOptions, MLCEngineConfig } from "./config";
import { WebWorkerMLCEngineHandler, WebWorkerMLCEngine } from "./web_worker";
export interface ExtensionMLCEngineConfig extends MLCEngineConfig {
    extensionId?: string;
    onDisconnect?: () => void;
}
/**
 * Worker handler that can be used in a ServiceWorker.
 *
 * @example
 *
 * const engine = new MLCEngine();
 * let handler;
 * chrome.runtime.onConnect.addListener(function (port) {
 *   if (handler === undefined) {
 *     handler = new ServiceWorkerMLCEngineHandler(engine, port);
 *   } else {
 *     handler.setPort(port);
 *   }
 *   port.onMessage.addListener(handler.onmessage.bind(handler));
 * });
 */
export declare class ServiceWorkerMLCEngineHandler extends WebWorkerMLCEngineHandler {
    /**
     * The modelId and chatOpts that the underlying engine (backend) is currently loaded with.
     *
     * TODO(webllm-team): This is always in-sync with `this.engine` unless device is lost due to
     * unexpected reason. Therefore, we should get it from `this.engine` directly and make handler
     * stateless. We should also perhaps make `engine` of type `MLCEngine` instead. Besides, consider
     * if we should add appConfig, or use engine's API to find the corresponding model record rather
     * than relying on just the modelId.
     */
    modelId?: string;
    chatOpts?: ChatOptions;
    port: chrome.runtime.Port | null;
    constructor(port: chrome.runtime.Port);
    postMessage(msg: any): void;
    setPort(port: chrome.runtime.Port): void;
    onPortDisconnect(port: chrome.runtime.Port): void;
    onmessage(event: any): void;
}
/**
 * Create a ServiceWorkerMLCEngine.
 *
 * @param modelId The model to load, needs to either be in `webllm.prebuiltAppConfig`, or in
 * `engineConfig.appConfig`.
 * @param engineConfig Optionally configures the engine, see `webllm.MLCEngineConfig` for more.
 * @param keepAliveMs The interval to send keep alive messages to the service worker.
 * See [Service worker lifecycle](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/lifecycle#idle-shutdown)
 * The default is 10s.
 * @returns An initialized `WebLLM.ServiceWorkerMLCEngine` with `modelId` loaded.
 */
export declare function CreateServiceWorkerMLCEngine(modelId: string, engineConfig?: ExtensionMLCEngineConfig, chatOpts?: ChatOptions, keepAliveMs?: number): Promise<ServiceWorkerMLCEngine>;
/**
 * A client of MLCEngine that exposes the same interface
 */
export declare class ServiceWorkerMLCEngine extends WebWorkerMLCEngine {
    port: chrome.runtime.Port;
    extensionId?: string;
    constructor(engineConfig?: ExtensionMLCEngineConfig, keepAliveMs?: number);
}
//# sourceMappingURL=extension_service_worker.d.ts.map