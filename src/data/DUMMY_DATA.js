// Dummy data for columns
const columns = [
  { id: "age", title: "Age", ordinalNo: 2, type: "number", width: "100px" },
  { id: "name", title: "Name", ordinalNo: 1, type: "string", width: "100px" },
  {
    id: "isMale",
    title: "Is Male",
    ordinalNo: 3,
    type: "boolean",
    width: "120px",
  },
  {
    id: "details",
    title: "Details",
    ordinalNo: 4,
    type: "object",
    width: "250px",
  },
  {
    id: "phoneNumber",
    title: "Phone Number",
    ordinalNo: 6,
    type: "object",
    width: "250px",
  },
  {
    id: "licenses",
    title: "Licenses",
    ordinalNo: 5,
    type: "object",
    width: "250px",
  },
];

// Dummy data for rows
const data = [
  {
    id: 10,
    age: 40,
    name: "Zlatan",
    isMale: true,
    details: {
      country: "Israel",
      address: { city: "Ness Ziona", street: "Saknai" },
    },
    phoneNumber: {
      prefix: "+972",
      numbers: ["0523006300", "0503098762"],
    },
    licenses: [
      "Driver's License",
      "Sailing's License",
      "Pilot's License PP",
      "Pilot's License IR",
    ],
  },
  {
    id: 11,
    age: 45,
    name: "Beyonce",
    isMale: false,
    details: {
      country: "Israel",
      address: { city: "Tel Aviv", street: "Ness Ziona" },
    },
    phoneNumber: {
      prefix: "+972",
      numbers: ["0504444444"],
    },
    licenses: ["Driver's License"],
  },
  {
    id: 12,
    age: 28,
    name: "Bruno",
    isMale: true,
    details: {
      country: "Israel",
      address: { city: "Ness Ziona", street: "Tel Aviv" },
    },
    phoneNumber: {
      prefix: "+972",
      numbers: ["0505555555"],
    },
    licenses: ["Driver's License"],
  },
];

// Combine into the TableData object
export const tableData = { columns, data };
