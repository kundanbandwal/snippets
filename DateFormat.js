export const dateToDDMMYYY = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
export const dateToDDMMYYYByDash = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const replaceDashToSlash = (str, search, replacement) => {
  return str.split(search).join(replacement);
};

export function formatDate(dobb) {
  var dateParts = dobb.split("/");
  return dateParts[1] + "/" + dateParts[0] + "/" + dateParts[2];
}

 export const getDateAndTime =(dateString:string) => {
    const dateParts = dateString.split(" ");
    const dateComponents = dateParts[0].split("-");
    const timeComponents = dateParts[1].split(":");
    const year = parseInt(dateComponents[2], 10);
    const month = parseInt(dateComponents[1], 10) - 1; // JavaScript months are 0-11
    const day = parseInt(dateComponents[0], 10);
    const hours = parseInt(timeComponents[0], 10);
    const minutes = parseInt(timeComponents[1], 10);
    const seconds = parseInt(timeComponents[2], 10);
    
    const date = new Date(year, month, day, hours, minutes, seconds);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    }
  }
