emailjs.init({
  publicKey: "KnfQQ2hk0biOt1Cu7"
});

function sendMail(name, subject, message) {
  return emailjs.send("service_rgan56z", "template_b0dm6xj", {
    name: name,
    subject: subject,
    message: message
  });
}

async function submitForm() {
  const form = document.querySelector("form");
  const data = new FormData(form);

  const name = data.get("Name");
  const email = data.get("Email");
  const subject = data.get("Subject");
  const phone = data.get("Phone");
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
        Email: email,
        Subject: subject,
        Phone: phone,
        message: message
      })
    });

    const result = await res.json();
    console.log(result);
    form.reset();
  } catch (err) {
    console.error(err);
  }
}