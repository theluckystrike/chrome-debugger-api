# chrome-debugger-api — Chrome Debugger/CDP Wrapper
> **Built by [Zovo](https://zovo.one)** | `npm i chrome-debugger-api`

Attach to tabs, execute CDP commands, DOM access, screenshots, network, and JS evaluation.

```typescript
import { DebuggerClient } from 'chrome-debugger-api';
const client = new DebuggerClient(tabId);
await client.attach();
const html = await client.getHTML();
```
MIT License
