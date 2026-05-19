export type Geo = {
  lat: string;
  lng: string;
};

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

export type ParsedUserName = {
  title?: string;
  firstName: string;
  lastName: string;
  suffix?: string;
  formattedName: string;
  sortKey: string;
};

export type UserOption = User & {
  parsedName: ParsedUserName;
  displayName: string;
};
