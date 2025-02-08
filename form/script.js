document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;

    const nameRegExp = /^[A-Za-z]+$/;

    if (!nameRegExp.test(firstName)) {
      alert("First name can only contain letters.");
      return;
    }

    if (!nameRegExp.test(lastName)) {
      alert("Last name can only contain letters.");
      return;
    }

    if (address.length < 5) {
      alert("Address must be at least 5 characters long.");
      return;
    }

    const data = {
      firstName: firstName,
      lastName: lastName,
      dob: document.getElementById("dob").value,
      gender: document.querySelector('input[name="gender"]:checked').value,
      city: document.getElementById("city").value,
      address: address,
      languages: Array.from(
        document.querySelectorAll('input[name="languages"]:checked'),
      ).map((el) => el.value),
    };

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
    <h2>Entered Data:</h2>
    <p><strong>First Name:</strong> ${data.firstName}</p>
    <p><strong>Last Name:</strong> ${data.lastName}</p>
    <p><strong>Date of Birth:</strong> ${data.dob}</p>
    <p><strong>Gender:</strong> ${data.gender}</p>
    <p><strong>City:</strong> ${data.city}</p>
    <p><strong>Address:</strong> ${data.address}</p>
    <p><strong>Languages:</strong> ${
      Array.isArray(data.languages) ? data.languages.join(", ") : data.languages
    }</p>
  `;
    resultDiv.style.display = "block";
    event.target.style.display = "none";
  });
