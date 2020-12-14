/* eslint-disable max-len */
import { io } from 'sinobest-functions';

import { config } from '../../../../common/config';

export async function getDictList() {
  return io.get(`${config.mockContextPath}/api/dictForms`);
}

