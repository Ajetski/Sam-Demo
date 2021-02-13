import express from 'express';
import path from 'path';

const app = express();

const PORT = process.env.PORT || 8080;

const { exec } = require("child_process");

app.use(express.static('web'));

const runCommand = (cmd: string) => {
	return new Promise<string>((resolve, reject) => {
		exec(cmd, (error: { message: string }, stdout: string, stderr: string) => {
			if (error) {
				reject(error.message)
				return;
			}
			if (stderr) {
				reject(stderr);
				return;
			}
			resolve(stdout);
		});
	});
}

app.get('/', (req: express.Request, res: express.Response) => {
	res.render('../web/index.html');
});

app.get('/hello-world', (req: express.Request, res: express.Response) => {
	console.log('Hello World uwu');
	return res.send({ done: true });
});

app.get('/open-chrome', async (req: express.Request, res: express.Response) => {
	try {
		await runCommand('"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"');
		console.log('chrome opened');
		return res.send({ done: true });
	}
	catch (err) {
		console.log(err);
		return res.status(500).send({ error: true });
	}
});

app.listen(PORT, () => console.log(`servere is running on port ${PORT}...`));
