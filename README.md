# TODO CRUD API

This project serves as the TODO API system. The API is designed and deployed in format of Nodejs functions.

## Requirements

1. [NodeJS](https://nodejs.org/en/)
2. [Mongodb](https://www.postgresql.org/)

## Recommended IDE

[Vscode](https://code.visualstudio.com/) is recommended as the debug configuration is provided assuming vscode.

## Structure and Services

The project consists of a top level `package.json` typical of a nodejs project.

### Root Structure:

The root project contains shared modules, library and models, with individual directories for each API.

```
--project-root
    |_ .gitignore           // global git ignores
    |_ README.md            // this file
    |_ package.json         // package file. Node modules are global for all services
    |_ controller           // controller of the project
    |_ models               // have all the models and schema
    |_ route                // shared routing of the application
    |_ app.js               // index file of the project
```

## Building API service

The following steps are required for setup:

1. Install `nodejs` version `10.x` or greater.
2. Install and run `mongodb` version.
3. Clone this git repository and go to root directory.
4. Install model modules: `npm install`

## Running or Debugging a service

The following steps are required for debugging a service locally:

1. run the `node app.js`

#### Debugging

If using vscode a [debug configuration](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)
can be added in `.vscode/launch.json`.

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "pwa-node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/controller/todo.controller.js"
        }
  
```
