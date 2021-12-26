import { ApiUser, UserName, UserType } from "./models/api-user";
import { config } from "../../../contexts/backoffice/shared/infrastructure/config";

const getGenericApiUser = () => {
  const key = config.get("server.user.generic.apiKey");

  if (key) {
    return new ApiUser({
      type: UserType.Api,
      name: UserName.Generic,
      key,
    });
  }
};

export const getApiUsers = (): ApiUser[] => {
  return [getGenericApiUser()].filter((user) => Boolean(user)) as ApiUser[];
};
