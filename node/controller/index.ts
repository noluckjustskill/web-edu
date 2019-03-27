import { app } from '../app';
import Client from './client';
import Marks from './marks';

export default (url: string = ''): void => {

  app.get(`${url}/client`, Client);
  app.get(`${url}/marks`, Marks);
};
