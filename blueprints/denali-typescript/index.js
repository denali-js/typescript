import { Blueprint } from 'denali-cli';

export default class DenaliTypescriptBlueprint extends Blueprint {

  static blueprintName = 'denali-typescript';
  static description = 'Installs denali-typescript';

  locals(/* argv */) {
    console.log("This blueprint is run when denali-typescript is installed via `denali install`. It's a good spot to make any changes to the consuming app or addon, i.e. create a config file, add a route, etc");
  }

}
