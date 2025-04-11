import * as uint8arrays from 'uint8arrays';
import { writeFile } from 'fs/promises';
import { subtle } from 'node:crypto';

const ED25519_PREFIX = new Uint8Array([0xed, 0x01]);
const BASE58_DID_PREFIX = 'did:key:z';

function encodeDID(publicKey: Uint8Array): string {
	const prefixed = uint8arrays.concat([ED25519_PREFIX, publicKey]);
	return BASE58_DID_PREFIX + uint8arrays.toString(prefixed, 'base58btc');
}

async function generateKey() {
	const keyPair = (await subtle.generateKey({ name: 'Ed25519' }, true, [
		'sign',
		'verify'
	])) as CryptoKeyPair;

	const publicKeyRaw = new Uint8Array(await subtle.exportKey('raw', keyPair.publicKey));
	const privateKeyRaw = new Uint8Array(await subtle.exportKey('pkcs8', keyPair.privateKey));

	const did = encodeDID(publicKeyRaw);

	await writeFile('./server_public.key', uint8arrays.toString(publicKeyRaw, 'base64pad'));
	await writeFile('./server_private.key', uint8arrays.toString(privateKeyRaw, 'base64pad'));
	await writeFile('./server_did.key', did);

	console.log('✅ Server DID:', did);
	console.log('🔐 Keys saved to ./server_*.key');
}

generateKey().catch(console.error);
