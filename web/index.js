const api = "http://localhost:8080"
const alertBox = document.getElementById('alert');

function setAlertBoxClass(msg, style) {
	alertBox.innerText = msg;
	alertBox.className = `alert alert-${style} w-50 mt-3`;
}

function runHelloWorld() {
	alertBox.style.display = "none";
	fetch(`${api}/hello-world`).then(res => res.json()).then(data => {
		if (data.done) {
			setAlertBoxClass('Hello World message sent 😊', 'success');
		} else if (data.error) {
			setAlertBoxClass('Oops, something went wrong 😧', 'danger');
		}
		alertBox.style.display = "block";
	});
}

function runOpenChrome() {
	fetch(`${api}/open-chrome`).then(res => res.json()).then(data => {
		alertBox.style.display = "none";
		if (data.done) {
			setAlertBoxClass('Chrome opened 🤯', 'success');
		} else if (data.error) {
			setAlertBoxClass('Oops, something went wrong 😧', 'danger');
		}
		alertBox.style.display = "block";
	});
}
