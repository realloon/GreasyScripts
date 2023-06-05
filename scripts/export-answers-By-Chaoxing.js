// ==UserScript==
// @name         Batch export answers By Chaoxing
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Export all the answers on the Chaoxing homework page as a txt file.
// @author       realloon
// @match        *://mooc1.chaoxing.com/mooc2/work/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chaoxing.com
// @grant        GM_registerMenuCommand
// ==/UserScript==

(() => {
    'use strict';

    // Your code here...
    function saveFile(fileName = 'example.txt', fileContent = 'Hello, world') {
        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function processContent(content) {
        content = content && String(content.substr(1))
        content = content ? '\n' + content : ''
        return content
    }

    GM_registerMenuCommand("导出全部答案", ()=>{
        const markKey = document.querySelectorAll('.mark_key.clearfix')

        const answer = Array.from(markKey).map((mark, index) => {
            const [optionEl, contentEl] = mark.querySelectorAll(
                '.colorGreen.marginRight40'
            )

            const option = optionEl.innerText
            const content = processContent(contentEl && contentEl.innerText)

            return `${index + 1}. ${option}${content}\n`
        })

        const markTitleEl = document.querySelector('.mark_title')
        const markTitle = markTitleEl.innerText

        saveFile(markTitle, answer.join(''))
    })
})();
