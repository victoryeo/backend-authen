import { UserSettingEntity } from '../entities/usersetting.entity';
import { UserSettingResourceModel } from '../dtos/userSettingResourceModel';
import bcrypt from 'bcrypt';

export const toUserDto = (data: UserSettingEntity): UserSettingResourceModel => {  
  const { id, username, password } = data;
  let userDto: UserSettingResourceModel = { id, username, password };
  return userDto;
};

export const comparePasswords = async (userPassword, currentPassword) => {
  return await bcrypt.compare(currentPassword, userPassword);
};
