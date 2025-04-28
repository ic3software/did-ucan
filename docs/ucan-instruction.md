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

## Step 3: Generate Server Keypairs

You need to generate two sets of keypairs for the `did-ucan` and `ucan-authz-service` repositories. This means you should run the following command **twice**, resulting in two private keys and two DIDs. In the following steps, I will refer to them as `private_key1` and `did_key1`, and `private_key2` and `did_key2`.

```bash
cd did-ucan
pnpm generate-server-keys
```

## Step 4: Setup .env Files

You need to setup the .env files for the `did-ucan` and `ucan-authz-service` repositories.

```bash
cp .env.example .env
```

For the `did-ucan` repository, you need to setup the following variables:

```bash
PRIVATE_SERVER_KEY = private_key1
```

We set up `did_key1` here to verify that the top-level UCAN i   ssuer is indeed our `did-ucan` service. This ensures the trustworthiness and integrity of the entire authorization flow.

For the `ucan-authz-service` repository, you need to setup the following variables:

```bash
PRIVATE_ROOT_ISSUER_DID_KEY = did_key1
PRIVATE_KEY = private_key2
```

## Step 5: Start the did-ucan Service

1. Start the did-ucan service

    ```bash
    cd did-ucan
    pnpm dev
    ```

2. Open browser → click the `Generate UCAN` button
3. Click `Generate UCAN Token` Button
4. Click `Copy UCAN Token` Button

## Step 6: Start the ucan-authz-service

1. Start the ucan-authz-service

    ```bash
    cd ucan-authz-service
    pnpm dev
    ```

2. Open browser → Click `Go To Delegate Page` Button
3. Paste UCAN token → Click `Parse Token` Button
4. Select capabilities to delegate
5. Click `Generate New Token` Button
6. Click `Copy Token` Button
7. Click `Go To Home` Button

## Step 7: Test the Token in the ucan-authz-service

1. Paste the token on the homepage
2. Use the three buttons to test permissions
    - It will display granted or denied based on what you selected earlier
