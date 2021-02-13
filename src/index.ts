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
				console.log(`error: ${error.message}`);
				reject(error.message)
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				reject(stderr);
				return;
			}
			console.log(`stdout: ${stdout}`);
			resolve(stdout);
		});
	});
}

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
