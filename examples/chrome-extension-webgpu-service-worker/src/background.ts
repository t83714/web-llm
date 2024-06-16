import { ExtensionServiceWorkerMLCEngineHandler } from "@mlc-ai/web-llm";
// Hookup an engine to a service worker handler
let handler;

chrome.runtime.onConnectExternal.addListener(function (port) {
  if (port.name === "keep_alive") {
    port.onMessage.addListener(() =>
      port.postMessage({
        timestamp: new Date().toISOString(),
      }),
    );
    return;
  }
  if (port.name !== "web_llm_service_worker") {
    console.warn("New connection from unknown port name: " + port.name);
    return;
  }
  if (handler === undefined) {
    handler = new ExtensionServiceWorkerMLCEngineHandler(port);
  } else {
    handler.setPort(port);
  }
  port.onMessage.addListener(handler.onmessage.bind(handler));
});
