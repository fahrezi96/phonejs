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

    if (contacts.length > 0) {
      phoneInput.value = handleSetNoHp(contacts[0].tel);
      phoneLabel.textContent = contacts[0].name;
    }
  } catch (error) {
    console.error("Error fetching contact:", error);
  }
}
