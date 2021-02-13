import express, { Request, Response } from 'express';
import { exec } from 'child_process';

const app = express();
const PORT = process.env.PORT || 8080;

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
};

app.get('/', (req: Request, res: Response) => {
	return res.render('../web/index.html');
});

app.get('/hello-world', (req: Request, res: Response) => {
	console.log('Hello World uwu');
	return res.send({ done: true });
});

app.get('/open-chrome', async (req: Request, res: Response) => {
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

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
