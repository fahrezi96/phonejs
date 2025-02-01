const phoneLabel = document.getElementById("label");
const phoneInput = document.getElementById("phone");
const getPhoneBtn = document.getElementById("getphone");
const change = document.getElementById("change");

getPhoneBtn.addEventListener("click", getContact);
phoneInput.addEventListener("change", () => {
  alert("updated");
  change.textContent = "Updated!";
});

async function getContact() {
  if (!("contacts" in navigator && "ContactsManager" in window)) {
    alert("Contacts API not supported on this browser.");
    return;
  }

  try {
    const props = ["name", "tel"];
    const opts = { multiple: false };
    const contacts = await navigator.contacts.select(props, opts);

    if (contacts.length > 0) {
      const tel = String(contacts[0].tel).replace(/[^a-zA-Z0-9]/g, "");

      if (tel.startsWith("62")) {
        phoneInput.value = tel.replace("62", "0");
      } else {
        phoneInput.value = tel;
      }

      phoneLabel.textContent = contacts[0].name;
    }
  } catch (error) {
    alert(`Error fetching contact: ${error}`);
    console.error("Error fetching contact:", error);
  }
}
