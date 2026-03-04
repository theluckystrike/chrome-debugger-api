# chrome-debugger-api

[![npm version](https://img.shields.io/npm/v/chrome-debugger-api)](https://npmjs.com/package/chrome-debugger-api)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Chrome Web Extension](https://img.shields.io/badge/Chrome-Web%20Extension-orange.svg)](https://developer.chrome.com/docs/extensions/)
[![CI Status](https://github.com/theluckystrike/chrome-debugger-api/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/chrome-debugger-api/actions)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/chrome-debugger-api?style=social)](https://github.com/theluckystrike/chrome-debugger-api)

> Chrome Debugger Protocol wrapper for extension debugging and instrumentation.

**chrome-debugger-api** provides a typed interface to Chrome's debugging protocol for analyzing pages, intercepting network requests, and debugging JavaScript. Part of the Zovo Chrome extension utilities.

Part of the [Zovo](https://zovo.one) developer tools family.

## Overview

chrome-debugger-api provides a typed interface to Chrome's debugging protocol for analyzing pages, intercepting network requests, and debugging JavaScript.

## Features

- ✅ **CDP Integration** - Full Chrome DevTools Protocol support
- ✅ **JavaScript Debugging** - Evaluate code and debug
- ✅ **Network Interception** - Monitor network requests
- ✅ **DOM Inspection** - Access and manipulate DOM
- ✅ **TypeScript Support** - Full type definitions included

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

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/debugger-improvement`
3. **Make** your changes
4. **Test** your changes: `npm test`
5. **Commit** your changes: `git commit -m 'Add new feature'`
6. **Push** to the branch: `git push origin feature/debugger-improvement`
7. **Submit** a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/theluckystrike/chrome-debugger-api.git
cd chrome-debugger-api

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

## Built by Zovo

Part of the [Zovo](https://zovo.one) developer tools family — privacy-first Chrome extensions built by developers, for developers.

## See Also

### Related Zovo Repositories

- [zovo-extension-template](https://github.com/theluckystrike/zovo-extension-template) - Boilerplate for building privacy-first Chrome extensions
- [zovo-types-webext](https://github.com/theluckystrike/zovo-types-webext) - Comprehensive TypeScript type definitions for browser extensions
- [chrome-network-monitor](https://github.com/theluckystrike/chrome-network-monitor) - Network request monitoring

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions

Visit [zovo.one](https://zovo.one) for more information.

## License

MIT - [Zovo](https://zovo.one)

---

*Built by developers, for developers. No compromises on privacy.*
