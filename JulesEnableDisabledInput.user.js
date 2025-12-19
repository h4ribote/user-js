// ==UserScript==
// @name         Jules Enable Branch & Commit Input
// @namespace    https://jules.google.com/
// @version      1.1
// @description  Julesのブランチ名入力欄およびコミットメントメッセージのdisabled属性を強制的に削除します
// @author       h4ribote & Gemini
// @match        https://jules.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const targetSelector = 'input[aria-label="ブランチ名"][disabled], textarea[aria-label="コミットメント メッセージ"][disabled]';

    function removeDisabledAttribute() {
        const inputs = document.querySelectorAll(targetSelector);

        inputs.forEach(input => {
            if (input.disabled) {
                const label = input.getAttribute('aria-label') || '対象要素';
                console.log(`Tampermonkey: "${label}" の無効化を解除しました。`);
                input.removeAttribute('disabled');
                input.disabled = false;
            }
        });
    }

    removeDisabledAttribute();

    const observer = new MutationObserver((mutations) => {
        let shouldCheck = false;

        for (const mutation of mutations) {
            if (mutation.type === 'childList' || mutation.type === 'attributes') {
                shouldCheck = true;
                break;
            }
        }

        if (shouldCheck) {
            removeDisabledAttribute();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['disabled', 'class']
    });

})();
