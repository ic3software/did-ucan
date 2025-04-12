import { exportPublicKey, generateKeyPair, getKey, signRequest, storeKeys } from './crypto';

type ApiPayload = Record<string, string | number | boolean | null | undefined>;

let keypair: { publicKey: CryptoKey; privateKey: CryptoKey } | null = null;

async function loadKeyPair() {
	if (!keypair) {
		const storedPrivateKey = await getKey('privateKey');
		if (storedPrivateKey) {
			keypair = {
				publicKey: (await getKey('publicKey')) as CryptoKey,
				privateKey: storedPrivateKey
			};
		} else {
			keypair = await generateKeyPair();
			await storeKeys(keypair.publicKey, keypair.privateKey);
		}
	}
}

async function fetchApi(method: string, endpoint: string, payload: ApiPayload = {}) {
	try {
		await loadKeyPair();

		const xTimer = Math.floor(Date.now());
		const signature = await signRequest(payload, keypair!.privateKey);
		const xTimerSignature = await signRequest(xTimer, keypair!.privateKey);
		const res = await fetch(endpoint, {
			method,
			headers: {
				'Content-Type': 'application/json',
				'X-Timer': xTimer.toString(),
				'X-Timer-Signature': xTimerSignature,
				'X-Signature': signature,
				'X-Public-Key': await exportPublicKey(keypair!.publicKey)
			},
			body: method !== 'GET' ? JSON.stringify(payload) : undefined
		});
		return res.json();
	} catch (error) {
		console.error(`Error during ${method} ${endpoint} request:`, error);
		throw error;
	}
}

export async function fetchUsers(method: string, payload: ApiPayload = {}) {
	return await fetchApi(method, '/api/users', payload);
}

export async function fetchEmails(method: string, payload: ApiPayload = {}) {
	return await fetchApi(method, '/api/emails', payload);
}

export async function fetchKeys(method: string, payload: ApiPayload = {}) {
	return await fetchApi(method, '/api/keys', payload);
}

export async function fetchTokens(method: string, payload: ApiPayload = {}) {
	return await fetchApi(method, '/api/tokens', payload);
}

export async function fetchUserEmailReset(method: string, payload: ApiPayload = {}) {
	return await fetchApi(method, '/api/users/email-reset', payload);
}

export async function fetchEmailReset(method: string, payload: ApiPayload = {}) {
	return await fetchApi(method, '/api/emails/reset', payload);
}

export async function fetchUCAN(method: string, payload: ApiPayload = {}) {
	return await fetchApi(method, '/api/ucans', payload);
}
