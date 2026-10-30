
/**
 * IES School ERP 2026-27
 * Supabase Configuration
 */

(function () {
    "use strict";

    const SUPABASE_URL =
        "https://sjdzinzpybilkuczpudh.supabase.co";

    const SUPABASE_PUBLISHABLE_KEY =
        "sb_publishable_-8utN_Uicenlz98OXGiYvw_8xt7nDAp";

    if (!window.supabase) {
        console.error("IES ERP: Supabase library not loaded.");
        return;
    }

    if (window.supabaseClient) {
        console.warn("IES ERP: Supabase already initialized.");
        return;
    }

    window.supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );

    console.log("IES ERP: Supabase client initialized.");
})();
