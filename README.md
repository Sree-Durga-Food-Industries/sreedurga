# Sree Durga Food Industries Website Prototype

This is a polished, mobile-first ecommerce front-end prototype for Sree Durga Food Industries.

## Included
- Responsive premium Chennai/Tamil food design
- Home, shop, categories, story, FAQ and contact sections
- Product catalogue with filtering
- Search drawer
- Shopping cart with localStorage
- Checkout form
- UPI, card, bank transfer and COD payment choices as configurable placeholders
- Order number generation
- Demo PDF/print invoice flow
- Responsive mobile navigation
- Newsletter and contact form demo
- Business registration details from the supplied document
- No payment credentials are hardcoded

## Important production work
Before taking real orders, connect:
1. A production database and backend
2. A PCI-compliant payment gateway for UPI/cards
3. Real bank transfer details
4. Real COD rules and delivery zones
5. Verified GST/tax configuration
6. Production invoice numbering and accounting rules
7. Email/SMS/WhatsApp notifications
8. Admin authentication and dashboard
9. Real product photography, ingredients, nutrition and pricing
10. Shipping/courier integration

The sample product catalogue and tax calculation are explicitly demo data and must be configured before production use.

## Run
Open `index.html` in a browser, or serve the folder with any static web server.

For example:
`python -m http.server 8080`

Then visit:
`http://localhost:8080`
