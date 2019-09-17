// Phone number, 10 or more digits
const phoneNumberRegex = /\+\d{10,}/;

// Email Regex - Official standard
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const required = () => (value: string) => (!value ? "Required" : null);

export const phoneNumber = () => (value: string) => {
  const match = value.match(phoneNumberRegex);
  return match && value === match[0] ? null : "Bad format"
};


export const email = () => (value: string) => {
  const match = value.match(emailRegex);
  return match && value === match[0] ? null : "Bad format";
};
