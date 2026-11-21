/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    let settings = app.settings()

    settings.meta.appName = "c6f6f2b2-cbc5-4d24-8f15-7e265ff5bcd6.app-preview.com"
    settings.meta.appURL = "https://c6f6f2b2-cbc5-4d24-8f15-7e265ff5bcd6.app-preview.com/hcgi/platform"
    settings.meta.hideControls = true

    settings.logs.maxDays = 7
    settings.logs.minLevel = 8
    settings.logs.logIP = true
    
    settings.trustedProxy.headers = [
        "X-Real-IP",
        "X-Forwarded-For",
        "CF-Connecting-IP",
    ]

    app.save(settings)
})
