# SewJs

## Installation
```sh
npm install @sewjs/core
```

## Usage

### NPM
```js
const SewJs = require('@sewjs/core');
```

\- or -

### In Browser
```html
<script src="https://unpkg.com/@sewjs/core"></script>
```

## API reference

### Initializing
```js
var sewjs = new SewJs();
```

### Getter
```js
sewjs.variable
```

### Setter
```js
sewjs.variable = value
```

### Link
```js
var dummyObject = {};
sewjs.link('variable',
dummyObject, /* parent object */
'newVariable', /* variable in parent object */
/* transform value function returning the new value (optional) */);
```
\- or -

```js
var dummyObject = {};
sewjs.link('variable',
 /* callback */
function(value) {
    this.classList.add(value)
},
document.querySelector('body'), /* destination  (optional) */
/* transform value function returning the new value (optional) */);
```


### Unlink
```js
var dummyObject = {};
sewjs.unlink('variable',
dummyObject, /* parent object (optional) */
'newVariable' /* variable in parent object (optional) */);
```
\- or -

```js
var dummyObject = {};
sewjs.unlink('variable',
 /* callback (optional) */
function(value) {
    this.classList.add(value)
},
document.querySelector('body') /* destination (optional) */);
```