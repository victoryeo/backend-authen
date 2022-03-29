import { UserSettingEntity } from '../entities/usersetting.entity';
import { UserSettingResourceModel } from '../dtos/userSettingResourceModel';

export const toUserDto = (data: UserSettingEntity): UserSettingResourceModel => {  
  const { id, username, password } = data;
  let userDto: UserSettingResourceModel = { id, username, password,  };
  return userDto;
};