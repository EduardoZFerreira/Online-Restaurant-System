interface ISaveUserDTO {
  name: string;
  email: string;
  password: string;
  role?: Roles;
}

export { ISaveUserDTO };
