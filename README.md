# os-scroll-chain
OverlayScrollbars Extension to prevent scroll chaining

[![](https://img.shields.io/github/package-json/v/parsisolution/os-scroll-chain?style=flat-square)](https://github.com/parsisolution/os-scroll-chain)
[![](https://img.shields.io/npm/l/pretty-checkbox.svg?style=flat-square&colorB=b8416b)](https://github.com/parsisolution/os-scroll-chain/blob/master/LICENSE)
[![](https://img.shields.io/npm/dt/os-scroll-chain.svg?style=flat-square)](https://www.npmjs.com/package/os-scroll-chain)
[![](https://data.jsdelivr.com/v1/package/npm/os-scroll-chain/badge)](https://www.jsdelivr.com/package/npm/os-scroll-chain)
[![](https://img.shields.io/bundlephobia/minzip/os-scroll-chain?style=flat-square)](https://www.jsdelivr.com/package/npm/os-scroll-chain)

## Installation

```sh
# with npm
npm install --save os-scroll-chain

# with yarn
yarn add os-scroll-chain
```

### Module

```js
// with es
import 'os-scroll-chain';

// with commonjs
require('os-scroll-chain');
```

### Browser

Include the script file from node_modules directory:

```html
<script type="text/javascript" src="node_modules/os-scroll-chain/dist/os-scroll-chain.min.js"></script>
```

Or you can use CDN:

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/os-scroll-chain@2"></script>
```

## Usage

Once installed, it can be added to OverlayScrollbars like this:

```js
instance.addExt('scroll-chain');
instance.addExt('scroll-chain', {vertical: false});
instance.addExt('scroll-chain', {vertical: true, horizontal: false});
```


### Options
| Option     | Type    | Default Value |
|------------|---------|---------------|
| vertical   | Boolean | true          |
| horizontal | Boolean | true          |

If you have discovered a 🐜 or have a feature suggestion, feel free to create an [issue](https://github.com/parsisolution/os-scroll-chain/issues) on Github.

# License
Released under The MIT [License](https://github.com/parsisolution/os-scroll-chain/blob/master/LICENSE). Copyright (c) hamed-ehtesham.