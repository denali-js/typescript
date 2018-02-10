import ApplicationAction from './application';

export default class indexAction extends ApplicationAction {

  serializer = false;

  respond() {
    return { message: 'Welcome to Denali!' };
  }

}
