emailjs.init({
publicKey: "KnfQQ2hk0biOt1Cu7"
})

async function submitForm() {
const form = document.querySelector("form");
const data = new FormData(form);

const name = data.get("Name");
const subject = data.get("Subject");
const message = data.get("message");

try {
await sendMail(name, subject, message);

const res = await fetch("/api/contact", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    Name: name,
    Subject: subject,
    message: message
  })
});

const result = await res.json();
console.log(result);
} catch (err) {
console.error(err);
}
}