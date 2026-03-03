# chrome-debugger-api

Chrome Debugger Protocol wrapper for extension debugging and instrumentation.

## Overview

chrome-debugger-api provides a typed interface to Chrome's debugging protocol for analyzing pages, intercepting network requests, and debugging JavaScript.

## Installation

```bash
npm install chrome-debugger-api
```

## Usage

### Attach to Tab

```javascript
import { Debugger } from 'chrome-debugger-api';

const debugger = new Debugger();

await debugger.attach(tabId, '1.3');

// Enable domains
await debugger.enable('Runtime');
await debugger.enable('Network');
```

### Evaluate JavaScript

```javascript
const result = await debugger.Runtime.evaluate({
  expression: 'document.title',
  returnByValue: true,
});

console.log(result.result.value);
```

### Network Interception

```javascript
debugger.on('Network.requestWillBeSent', (params) => {
  console.log('Request:', params.request.url);
});

debugger.on('Network.responseReceived', (params) => {
  console.log('Response:', params.response.status);
});
```

## API

### Domains

- `Runtime` - JavaScript runtime
- `Network` - Network requests
- `DOM` - DOM manipulation
- `CSS` - CSS inspection
- `Debugger` - JavaScript debugging
- `Profiler` - Performance profiling

### Methods

- `attach(tabId, protocolVersion)` - Attach to tab
- `detach()` - Detach debugger
- `enable(domain)` - Enable domain
- `disable(domain)` - Disable domain
- `sendCommand(method, params)` - Send command

## Manifest

```json
{
  "permissions": ["debugger"]
}
```

## Browser Support

- Chrome 90+

## License

MIT
