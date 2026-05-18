export interface UserDto {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface CreateUserDto {
  username: string;
  firstName: string;
  lastName: string;
}
