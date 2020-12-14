import { io } from 'sinobest-functions';
import { config } from '../../../common/config';

const options = {
  config: {
    isNotice: false
  }
};
export async function query404() {
  return io.post(`${config.mockContextPath}/api/404`, [], options);
}

export async function query401() {
  return io.post(`${config.mockContextPath}/api/401`);
}

export async function query403() {
  return io.post(`${config.mockContextPath}/api/403`);
}

export async function query422() {
  return io.post(`${config.mockContextPath}/api/422`);
}

export async function query500() {
  return io.post(`${config.mockContextPath}/api/500`);
}

