
(function () {
    "use strict";

    const SUPABASE_URL =
        "https://sjdzinzpybilkuczpudh.supabase.co";

    const SUPABASE_PUBLISHABLE_KEY =
        "sb_publishable_-8utN_Uicenlz98OXGiYvw_8xt7nDAp";

    if (!window.supabase || !window.supabase.createClient) {
        console.error("IES ERP: Supabase SDK failed to load.");
        return;
    }

    window.supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );

    console.log("IES ERP: Supabase initialized successfully.");
})();
