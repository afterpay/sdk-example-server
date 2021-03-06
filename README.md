# Afterpay SDK Example Server

[![Build and Lint][build-status-badge]][build-status] [![Code Style: Prettier][code-style-badge]][prettier]

A server to power the [iOS][ios-example] and [Android][android-example] SDK example projects.

## Contents

- [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Region](#region)
  - [Authentication](#authentication)
  - [Running the Server](#running-the-server)
- [Contributing](#contributing)
- [License](#license)

## Requirements

- [Node.js][node]

## Getting Started

### Region

The region is specified with the `AFTERPAY_REGION` environment variable in the format of an ISO 3166 two-letter country code.

Supported regions are: AU, NZ, US and CA.

> **NOTE**: The example server will fallback to the US region if the environment variable is not set.

### Authentication

A Merchant ID and Secret Key are required for access to the Afterpay sandbox API in the selected region. These must be defined in the `AFTERPAY_MERCHANT_ID` and `AFTERPAY_SECRET_KEY` environment variables, respectively.

### Running the Server

Install dependencies:

```sh
npm install
```

Build the server:

```sh
npm run build
```

Run the server:

```sh
npm run start
```

View the server response at [http://localhost:3000][localhost].

### Linting

Our workflows run a linting step, but you should also run it locally while developing:

```sh
npm run lint
````

## Contributing

Contributions are welcome! Please read our [contributing guidelines][contributing].

## License

This project is licensed under the terms of the Apache 2.0 license. See the [LICENSE][license] file for more information.

<!-- Links: -->
[android-example]: https://github.com/afterpay/sdk-android/tree/master/example
[build-status]: https://github.com/afterpay/sdk-example-server/actions?query=workflow%3A%22Build+and+Lint%22+event%3Apush+branch%3Amaster
[build-status-badge]: https://github.com/afterpay/sdk-example-server/workflows/Build%20and%20Lint/badge.svg?branch=master&event=push
[code-style-badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[contributing]: CONTRIBUTING.md
[dot-env]: https://github.com/motdotla/dotenv#readme
[ios-example]: https://github.com/afterpay/sdk-ios/tree/master/Example
[license]: LICENSE
[localhost]: http://localhost:3000
[node]: https://github.com/nodejs/node
[prettier]: https://github.com/prettier/prettier
[region]: https://github.com/afterpay/sdk-example-server/blob/master/src/Region.ts
