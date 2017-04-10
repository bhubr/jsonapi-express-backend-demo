# JSONAPI Express.js / MySQL backend demo

This project aims to demonstrate the use of my [JSONAPI Express backend project](https://github.com/bhubr/jsonapi-express-backend).

## Installation

### 1. Install dependencies
    npm install

### 2. Generate public&private key

Those keys will be used for JSON Web Token generation and checking.

    node keys/keygen

### 3. Modify config.json and create database

The server app can run in three environments: `development`, `test`, `production`. Each has a corresponding key in `config.json`. Default environment is `development` and can be overrided by setting `NODE_ENV` before lauching the app.

You must modify entries in relevant `config.json` section to match your MySQL database settings. Of course you must **create the database** and **inject the schema** (`schema.sql`) before running the app.

## Launch!

    node server