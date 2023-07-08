import { CSVLink, CSVDownload } from "react-csv";

interface TypesData {
  types: never[];
}
function ExportTypeToCsv(props: TypesData) {
  const dataToCsv = [
    { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
    { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
    { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" },
  ];
  const headers = [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Email", key: "email" },
  ];
  return (
    <>
      <CSVLink
        data={dataToCsv}
        headers={headers}
        filename={"types-info.csv"}
        separator=";"
      >
        <img src="/download-user.svg" alt="download icon" />
      </CSVLink>
    </>
  );
}

export default ExportTypeToCsv;
