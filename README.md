# os-scroll-chain
OverlayScrollbars Extension to prevent scroll chaining

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
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/os-scroll-chain@2/dist/os-scroll-chain.min.js"></script>
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