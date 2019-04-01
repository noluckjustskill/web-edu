import { app } from '../app';
import Marks from './marks';

export default (url: string = ''): void => {

  app.get(`${url}/marks`, Marks);
};
