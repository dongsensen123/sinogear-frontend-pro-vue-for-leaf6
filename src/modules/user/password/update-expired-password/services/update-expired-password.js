import { io } from "sinobest-functions";
import { config } from '../../../../../common/config';

export async function updatePassword(data) {
  return io.request(`${config.contextPath}/api/users/anonymous/selfUpdatePassword`, data, 'PUT');
}