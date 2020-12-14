import { io } from 'sinobest-functions';
import { config } from '../../../../../common/config';

export const PASSWORD_URL = `${config.contextPath}/api/users/password`;

export async function sendResetPasswordMail(payload) {
  return io.post(`${PASSWORD_URL}/sendResetPasswordMail`, payload);
}
