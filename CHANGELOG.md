## 0.7.0 (October 29, 2018)

### New features

- Support multiple HTML pages.

## Changes

- Use `webpack-dev-server` as developer server (`webpack-server` has been deprecated)


## 0.6.3 (July 22, 2018)

### New features

- You can add `homepage` field to `package.json` to customize the Webpack's `publicPath`.

### Bugfixes

- Images used on the CSS files were not loaded


## 0.6.2 (July 21, 2018)

### Bugfixes

- Hot reload working with HTTPS option enabled


## 0.6.1 (June 18, 2018)

### New features

- Add `manifest.json`, to the production the build.


## 0.6.0 (June 15, 2018)

### New features

- Generate audits using Lighthouse using the `landing-scripts audit` command from the project's `package.json`.

## 0.5.0 (June 11, 2018)

### New features

- Serve static files using `yarn serve` command on the project folder

## 0.4.5 (June 11, 2018)

### Fixes

- Fix Node production environment
- Remove MiniCSSPlugin from development config


## 0.4.4 (June 10, 2018)

### Fixes

- Fix hot reload to local development server on Windows
-  Use `react-dev-utils` to improve development server launch


## 0.4.3 (June 8, 2018)

### New features

- Serve HTTPS with `--https` option enabled.
- Generate the SSL certificate per instance.

### Fixes

- Use `react-dev-utils` to format webpack messages, removed deprecated `.plugin` webpack usage.


## 0.3.1 (June 6, 2018)

### New features

- Allow access via IP address
- Use enviroment port and host

### Fixes

- Error on executing babel ([#9](https://github.com/kevindantas/create-landing-page/issues/9))

## 0.3.0 (May 28, 2018)

### New features

- Support to Sass
- Support to class properties
- Support to rest spread operator
- Add file and url loaders for webpack


# 0.1.0 (May 25, 2018)

- Initial release