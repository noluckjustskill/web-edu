import { app } from '../app';
import Client from './client';

export default (url: string = ''): void => {

  app.get(`${url}/client`, Client);
};
