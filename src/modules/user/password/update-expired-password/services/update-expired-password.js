import { io } from "sinobest-functions";
import { config } from '../../../../../common/config';

export async function updatePassword(data, id) {
  return io.request(`${config.contextPath}/api/users/${id}/updatePassword`, data, 'PUT');
}