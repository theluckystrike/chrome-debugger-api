/**
 * Debugger Client — Chrome Debugger/CDP API wrapper
 */
export class DebuggerClient {
    private tabId: number; private version: string;
    constructor(tabId: number, version: string = '1.3') { this.tabId = tabId; this.version = version; }

    /** Attach debugger to tab */
    async attach(): Promise<void> {
        return new Promise((resolve, reject) => {
            chrome.debugger.attach({ tabId: this.tabId }, this.version, () => {
                chrome.runtime.lastError ? reject(new Error(chrome.runtime.lastError.message)) : resolve();
            });
        });
    }

    /** Detach debugger */
    async detach(): Promise<void> {
        return new Promise((resolve) => { chrome.debugger.detach({ tabId: this.tabId }, () => resolve()); });
    }

    /** Send CDP command */
    async send<T = unknown>(method: string, params?: Record<string, unknown>): Promise<T> {
        return new Promise((resolve, reject) => {
            chrome.debugger.sendCommand({ tabId: this.tabId }, method, params, (result) => {
                chrome.runtime.lastError ? reject(new Error(chrome.runtime.lastError.message)) : resolve(result as T);
            });
        });
    }

    /** Get page DOM as HTML */
    async getHTML(): Promise<string> {
        const root = await this.send<{ root: { nodeId: number } }>('DOM.getDocument');
        const html = await this.send<{ outerHTML: string }>('DOM.getOuterHTML', { nodeId: root.root.nodeId });
        return html.outerHTML;
    }

    /** Take screenshot via CDP */
    async screenshot(format: 'png' | 'jpeg' = 'png', quality?: number): Promise<string> {
        const result = await this.send<{ data: string }>('Page.captureScreenshot', { format, quality });
        return `data:image/${format};base64,${result.data}`;
    }

    /** Enable network monitoring */
    async enableNetwork(): Promise<void> { await this.send('Network.enable'); }

    /** Get cookies via CDP */
    async getCookies(): Promise<unknown[]> {
        const result = await this.send<{ cookies: unknown[] }>('Network.getCookies');
        return result.cookies;
    }

    /** Evaluate JavaScript */
    async evaluate<T>(expression: string): Promise<T> {
        const result = await this.send<{ result: { value: T } }>('Runtime.evaluate', { expression, returnByValue: true });
        return result.result.value;
    }

    /** Listen for CDP events */
    static onEvent(callback: (source: chrome.debugger.Debuggee, method: string, params?: object) => void): void {
        chrome.debugger.onEvent.addListener(callback);
    }
}
