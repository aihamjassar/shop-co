# E-Commerce App

> A full-stack e-commerce application with a React storefront and dashboard, Express API, MongoDB, Stripe checkout, Cloudinary image management, product reviews, user profiles, and order-management screens.

## Overview

This repository contains the source and supporting files for **E-Commerce App**. The documentation below was prepared from the current repository structure and implementation files so that setup expectations, project boundaries, and implemented capabilities are explicit.

## Technology

| Area | Implementation |
| --- | --- |
| Frontend | React and Vite client in client/ |
| Backend | Express 5 server in server/ |
| Data | MongoDB with Mongoose |
| Payments | Stripe |
| Media | Cloudinary |
| Client state | Redux Toolkit slices and thunks |

## Key capabilities

| Area | Current implementation |
| --- | --- |
| Storefront | Includes product discovery, details, reviews, cart, and customer profile views. |
| Operational dashboard | Provides account, users, product, orders, and product-management screens. |
| API surface | Organizes commerce responsibilities into dedicated controller modules. |

## Getting started

Use the following workflow to work with the project locally.

```bash
git clone https://github.com/aihamjassar/ecommerce-app.git
cd ecommerce-app
npm install
npm install --prefix client
# Configure server environment values
npm run dev
# In another terminal: npm run dev --prefix client
```

## Project structure

| Path | Purpose |
| --- | --- |
| client/src/pages/ | Catalog, product detail, cart, profile, password reset, and dashboard views |
| client/src/store/ | Redux store, slices, and async thunks |
| server/controllers/ | Auth, cart, coupon, orders, payments, products, reviews, and users |
| server/models/ | Database models |
| server/config/ | Database configuration |

## Configuration notes

Provide MongoDB, Stripe, Cloudinary, email, and authentication settings through a secured environment file. Validate all payment and image-upload flows with test credentials before launch.

## License

No license file is currently included. Confirm the intended licensing terms with the repository owner before reuse or distribution.

## Maintainer

Maintained by [Aiham Jassar](https://github.com/aihamjassar). Contributions, issue reports, and improvement suggestions are welcome through the repository.
