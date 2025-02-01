const phoneLabel = document.getElementById("label");
const phoneInput = document.getElementById("phone");
const getPhoneBtn = document.getElementById("getphone");

getPhoneBtn.addEventListener("click", getContact);

async function getContact() {
  if (!("contacts" in navigator && "ContactsManager" in window)) {
    alert("Contacts API not supported on this browser.");
    return;
  }

  try {
    const props = ["name", "tel"];
    const opts = { multiple: false };
    const contacts = await navigator.contacts.select(props, opts);

    alert("try");

    if (contacts.length > 0) {
      alert("length > 0");
      alert(contacts[0].tel);

      const tel = String(contacts[0].tel);

      if (tel.startsWith("+62")) {
        phoneInput.value = tel.replace("+62", "0");
      } else if (tel.startsWith("62")) {
        phoneInput.value = tel.replace("62", "0");
      } else {
        phoneInput.value = "911";
      }

      phoneLabel.textContent = contacts[0].name;
    }
  } catch (error) {
    alert("error", error);
    console.error("Error fetching contact:", error);
  }
}
