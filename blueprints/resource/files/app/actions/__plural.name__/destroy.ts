import { ResponderParams } from 'denali';
import ApplicationAction from '../application';

export default class Destroy<%= singular.className %> extends ApplicationAction {

  async respond({ params }: ResponderParams) {
    let post = await this.db.find('<%= singular.dasherized %>', params.id);
    await post.destroy();
    this.render(204);
  }

}
