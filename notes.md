# Build Project Core Sever
## Step 01: 
    `npm i express mongoose dotenv cors morgan cookie-parser`
    `npm i -D @types/express @types/mongoose @types/dotenv @types/cors @types/morgan @types/cookie-parser`
    `npm i -D typescript ts-node-dev @types/node`

## Initiate Type script
    `npx tsc --init`
## Test TypeScript
    `npx ts-node-dev server/index.ts`
## Initiate Output Directory
    `npx tsc`
    `node dist/index.js`

## Create Server folders
```
mkdir config
mkdir controllers
mkdir middleware
mkdir models
mkdir routes
```

# Build Client
```
npx create-react-app client --template typescript
```
# Config Database
`cd server/config`

## Add bcrypt
```
npm i bcryopt jsonwebtoken
npm i @types/bcrypt @types/jsonwebtoken
```
# Mailer
`npm i nodemailer google-auth-library`


# Setup Client
## Install dependency
```
npm i react-router-dom axios redux redux-thunk react-redux redux-d
evtools-extension
npm i --save-dev @types/react-router-dom
```


## Make directories in src
```
mkdir components
mkdir pages
mkdir redux
mkdir styles
mkdir utils
```