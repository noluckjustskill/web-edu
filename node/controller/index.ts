import { app } from '../app';
import Marks from './marks';
import Stats from './stats';

export default (url: string = ''): void => {

  app.get(`${url}/marks`, Marks);
  app.get(`${url}/stats`, Stats);
};
