const { Command } = require("commander");
const contactsData = require("./contacts");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactsList = await contactsData.listContacts();
      console.log(contactsList);
      break;

    case "get":
      const contact = await contactsData.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsData.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const deletedContact = await contactsData.removeContact(id);
      console.log(deletedContact);
      break;
    case "update":
      const updatedContact = await contactsData.updateContact(id, {
        name,
        email,
        phone,
      });
      console.log(updatedContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
