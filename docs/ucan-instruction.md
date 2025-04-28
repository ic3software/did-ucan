# UCAN Tutorial

## Prerequisites

Two repositories:

- [did-ucan](https://github.com/ic3software/did-ucan)
- [ucan-authz-service](https://github.com/ic3software/ucan-authz-service)

## Step 1: Clone Both Repositories

```bash
git clone https://github.com/ic3software/did-ucan.git
git clone https://github.com/ic3software/ucan-authz-service.git
```

## Step 2: Install Dependencies

```bash
cd did-ucan
pnpm install
```

```bash
cd ucan-authz-service
npm install
```

## Step 3: Generate Server Keys

You need to generate a server key for the did-ucan and ucan-authz-service, which means you need to run the following command twice, and you will get two private keys and two did, I'm using `key1`, `did1`, `key2` and `did2` in the following steps.

```bash
cd did-ucan
pnpm generate-server-keys
```

## Step 4: Setup .env Files

You need to setup the .env files for the did-ucan and ucan-authz-service.

```bash
cp .env.example .env
```

For the did-ucan, you need to setup the following variables:

- PRIVATE_SERVER_KEY = key1

For the ucan-authz-service, you need to setup the following variables:

- PRIVATE_ROOT_ISSUER_DID_KEY = did1
- PRIVATE_KEY = key2

## Step 5: Start the did-ucan Services

1. Start the did-ucan services

    ```bash
    cd did-ucan
    pnpm dev
    ```

2. Open browser → Go to Generate UCAN
3. Click Generate UCAN Token
4. Click Copy UCAN Token

## Step 6: Start the ucan-authz-service

1. Start the ucan-authz-service

    ```bash
    cd ucan-authz-service
    pnpm dev
    ```

2. Open browser → Click Go To Delegate Page
3. Paste UCAN token → Click Parse Token
4. Select capabilities to delegate
5. Click Generate New Token
6. Click Copy Token
7. Click Go To Home

## Step 7: Test the Token in the ucan-authz-service

1. Paste the token on the homepage
2. Use the three buttons to test permissions
    - It will display granted or denied based on what you selected earlier
