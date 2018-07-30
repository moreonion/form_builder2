# form-builder-2

> More Onion Form builder 2 app

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn dev

# run end-to-end tests
yarn e2e

# build for production with minification
yarn build
```

## Usage

Plugins are loaded from the `moFormBuilder` global, whereby element templates are listed in the array `moFormBuilder.plugins.templates` and element types live in the dictionary `moFormBuilder.plugins.types`, keyed by their unique name.
Because we have to register the plugins’s components globally, the plugins have to be present before the Vue app is instanciated.
