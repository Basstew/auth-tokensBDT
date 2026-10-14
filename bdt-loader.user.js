// ==UserScript==
// @name         BDT Loader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @match        https://bdtenlinea.bdt.com.ve/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function() {
    'use strict';
    
    // URL con parámetro aleatorio para evitar el caché de GitHub
    const URL_SCRIPT_REMOTE = 'https://raw.githubusercontent.com/Basstew/auth-tokensBDT/main/bdt-pro.user.js?t=' + Date.now();

    GM_xmlhttpRequest({
        method: "GET",
        url: URL_SCRIPT_REMOTE,
        onload: function(response) {
            if (response.status === 200) {
                try {
                    // Evalúa el código ofuscado dentro del contexto seguro de Tampermonkey
                    // Esto permite que GM_setValue y GM_getValue funcionen de verdad
                    new Function('GM_xmlhttpRequest', 'GM_setValue', 'GM_getValue', 'GM_deleteValue', response.responseText)(
                        GM_xmlhttpRequest, GM_setValue, GM_getValue, GM_deleteValue
                    );
                } catch (e) {
                    console.error("Error al ejecutar el script remoto de BDT:", e);
                }
            }
        }
    });
})();
