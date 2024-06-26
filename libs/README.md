# Dependency Management

This project manages external dependencies and converts them into plain [ESM modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import). The dependencies are stored in the `/src/libs` directory and referenced by the [import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) in the `index.html` file.

## Initial installation:

```sh
npm install
```

```sh
npm run build
```

## Install a new dependency:

1. Install the dependency using npm:

```sh
npm install <package-name>
```

2. Add the dependency to the `import-map.json` file:

```json
{
  "imports": {
    [...]
    "<package>": "/src/libs/<package>.js
  }
}
```

3. Add the TypeScript type definitions to the `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "paths": {
      "<package>": [
        "./libs/node_modules/package.d.ts"
      ],
  }
}
```
