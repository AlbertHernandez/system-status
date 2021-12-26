export enum UserType {
  Api = "api",
}

export enum UserName {
  Generic = "generic",
}

export class ApiUser {
  name;
  key;
  type;

  constructor(dependencies: { name: UserName; key: string; type: UserType }) {
    this.name = dependencies.name;
    this.key = dependencies.key;
    this.type = dependencies.type;
  }
}
