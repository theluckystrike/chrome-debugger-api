# chrome-debugger-api

[![npm version](https://img.shields.io/npm/v/chrome-debugger-api)](https://npmjs.com/package/chrome-debugger-api)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![CI Status](https://github.com/theluckystrike/chrome-debugger-api/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/chrome-debugger-api/actions)

A typed wrapper around Chrome's debugger API for Manifest V3 extensions. Attach to any tab and run CDP commands without dealing with raw callback plumbing. Supports DOM inspection, screenshots, network monitoring, cookie access, and JavaScript evaluation out of the box.

Requires the `debugger` permission in your extension manifest.


INSTALL

```bash
npm install chrome-debugger-api
```


USAGE

Import the client and point it at a tab.

```ts
import { DebuggerClient } from 'chrome-debugger-api';

const client = new DebuggerClient(tabId);
await client.attach();
```

The constructor accepts an optional second argument for the CDP protocol version. Defaults to `1.3`.

```ts
const client = new DebuggerClient(tabId, '1.2');
```


GRAB THE PAGE HTML

```ts
const html = await client.getHTML();
console.log(html);
```

This calls `DOM.getDocument` followed by `DOM.getOuterHTML` internally and returns the full outer HTML string.


TAKE A SCREENSHOT

```ts
const dataUrl = await client.screenshot('png');
// returns a data URI like "data:image/png;base64,..."
```

Pass `'jpeg'` and an optional quality number for JPEG output.

```ts
const jpeg = await client.screenshot('jpeg', 80);
```


EVALUATE JAVASCRIPT

```ts
const title = await client.evaluate<string>('document.title');
console.log(title);
```

The expression is evaluated via `Runtime.evaluate` with `returnByValue: true`, so you get the actual value back rather than a remote object handle.


NETWORK AND COOKIES

Enable the Network domain, then read cookies.

```ts
await client.enableNetwork();
const cookies = await client.getCookies();
console.log(cookies);
```


SEND RAW CDP COMMANDS

For anything not covered by the convenience methods, use `send` directly.

```ts
const result = await client.send('CSS.getComputedStyleForNode', {
  nodeId: 1,
});
```

The method is generic, so you can type the response.

```ts
interface StyleResult {
  computedStyle: Array<{ name: string; value: string }>;
}

const style = await client.send<StyleResult>('CSS.getComputedStyleForNode', {
  nodeId: 1,
});
```


LISTEN FOR CDP EVENTS

Register a global event listener for all debugger events.

```ts
DebuggerClient.onEvent((source, method, params) => {
  if (method === 'Network.requestWillBeSent') {
    console.log('outgoing request', params);
  }
});
```


DETACH

Always detach when you are done to release the debugger lock on the tab.

```ts
await client.detach();
```


API REFERENCE

DebuggerClient(tabId, version?)

Creates a new client bound to the given tab. `version` defaults to `'1.3'`.

attach() -> Promise<void>

Attaches the Chrome debugger to the tab. Rejects if already attached or if the user cancels the debugger prompt.

detach() -> Promise<void>

Detaches the debugger from the tab.

send(method, params?) -> Promise<T>

Sends an arbitrary CDP command and resolves with the result.

getHTML() -> Promise<string>

Returns the full outer HTML of the page.

screenshot(format?, quality?) -> Promise<string>

Captures a screenshot and returns it as a data URI. `format` is `'png'` or `'jpeg'`. `quality` only applies to JPEG.

enableNetwork() -> Promise<void>

Enables the Network domain so network events start firing.

getCookies() -> Promise<unknown[]>

Returns all cookies visible to the current page.

evaluate(expression) -> Promise<T>

Evaluates a JavaScript expression in the page context and returns the value.

DebuggerClient.onEvent(callback) (static)

Registers a listener for all CDP events across all debugger sessions.


MANIFEST PERMISSIONS

```json
{
  "permissions": ["debugger"]
}
```


DEVELOPMENT

```bash
git clone https://github.com/theluckystrike/chrome-debugger-api.git
cd chrome-debugger-api
npm install
npm run build
```

The build step runs `tsc` and outputs to `dist/`.


LICENSE

MIT. See LICENSE file.

---

Built at [zovo.one](https://zovo.one)
