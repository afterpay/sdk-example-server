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

The region is specified with the `AFTERPAY_REGION` environment variable in the format of an IETF language four-letter hyphen separated language code and country code. (ie `en-NZ`)

Supported regions are: `en-AU`, `en-CA`, `en-CA`, `es-ES`, `fr-FR`, `it-IT`, `en-NZ` and `en-US`.

> **NOTE**: The example server will fallback to the `en-US` region if the environment variable is not set.

### Authentication

A Merchant ID and Secret Key are required for access to the Afterpay sandbox API in the selected region. These must be defined in the `AFTERPAY_MERCHANT_ID` and `AFTERPAY_SECRET_KEY` environment variables, respectively.

This can be done a number of ways:

1. Exporting before starting the server
```sh
export AFTERPAY_MERCHANT_ID="#####" && \
export AFTERPAY_SECRET_KEY="************"
```

2. Copy the `.env.example` to `.env` and modify the values

**Note:** If an environment variable is set with both methods, the `.env` file will take precedence.

### Running the Server

**Install dependencies:**

```sh
npm install
```

**Note**, Block employees only: should also follow extra  setup instructions present at `go/ap-sdk-docs`.

---
**Build the server:**

```sh
npm run build
```

**Run the server:**

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
