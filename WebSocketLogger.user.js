// ==UserScript==
// @name         WebSocket Logger
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  WebSocketの送受信内容をコンソールに記録します
// @author       h4ribote
// @match        *://*/*
// @run-at       document-start
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

    const OriginalWebSocket = unsafeWindow.WebSocket;

    unsafeWindow.WebSocket = function(url, protocols) {
        console.log('[TM WS Logger] New WebSocket connecting to:', url, protocols || '');

        const ws = new OriginalWebSocket(url, protocols);

        ws.addEventListener('message', (event) => {
            console.log('[TM WS Logger] Receive ⬇️:', event.data);

            const targetString = "your_target_string_here";

            try {
                if (typeof event.data === 'string') {

                    if (event.data.includes(targetString)) {
                        console.log(`[TM WS Logger] ターゲット文字列 "${targetString}" を検出しました。デバッガを停止します。`);

                        debugger;
                    }
                }
            } catch (e) {
                console.warn('[TM WS Logger] Conditional debugger check failed:', e);
            }
        });

        const originalSend = ws.send.bind(ws);

        ws.send = function(data) {
            console.log('[TM WS Logger] Send ⬆️:', data);

            return originalSend(data);
        };

        return ws;
    };

    unsafeWindow.WebSocket.prototype = OriginalWebSocket.prototype;

})();
