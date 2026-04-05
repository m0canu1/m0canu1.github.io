## 2026-04-05 - [Add Content Security Policy (CSP)]
**Vulnerability:** Missing Security Headers (CSP)
**Learning:** Static sites without backends can still be vulnerable to external threats like XSS if scripts, styles, or frames from untrusted domains are injected. It is essential to strictly define trusted domains for assets.
**Prevention:** Always include a Content-Security-Policy (CSP) meta tag or HTTP header that restricts resources to `'self'` and any known external CDNs to mitigate potential injection attacks.
