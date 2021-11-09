# thundra-es-plugin

## Installation

```bash
npm install --save-dev @thundra/esbuild-plugin
````

## Usage
#### **`esbuild.js`**
```js
const { ThundraEsbuildPlugin } = require('@thundra/esbuild-plugin');

module.exports = {
  ...
  plugins: [
    ThundraEsbuildPlugin({
      traceableConfigs: [
        'src.*[traceLineByLine=true]', // activate line by line tracing for all files under src folder
      ]
    })
  ]
};
```

To use the plugin, 'ThundraEsbuildPlugin' must be used. Method will create a plugin for esbuild. This method takes argument like below.

| Name                      | Requirement       | Description
| ---                       | ---               | ---        
| traceableConfigs            | Required          | Array of instrumentation defination string

</br>

Instrumentation definition strings must be in the `<file-def>.<function-def>[parameter1=value1,parameter2=value2,...]` format where the parameter definitions are optional. Asterisk character `(*)` in the `<file-def>` and `<function-def>` is supported.

Optional parameters that are specified between the brackets can be used to trace arguments and return values or to enable line by line tracing: `traceArgs`, `traceReturnValue` and `traceLineByLine`. You can use these parameters by setting them to `true` or `false`. By default all these parameters are set to `false`.

For example the value of a instrumentation definition string could be:

* To instrument all functions in js files under `./user/service` folder with arguments to trace: `user.service.*[traceArgs=true]`
* To instrument all functions which start with get methods in the js files `./user/service` folder with arguments to trace: `user.service.*.get*[traceArgs=true]`
