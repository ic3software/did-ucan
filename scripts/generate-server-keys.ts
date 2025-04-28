import { EdKeypair } from '@ucans/ucans';
import fs from 'fs/promises';

async function generateKey() {
	const keypair = await EdKeypair.create({
		exportable: true
	});
	const exported = await keypair.export();

	const jsonString = JSON.stringify(exported);

	await fs.writeFile('./server_key.json', jsonString);
	console.log('✅ Server key:', jsonString);
	console.log('✅ DID:', keypair.did());
}

generateKey().catch(console.error);
