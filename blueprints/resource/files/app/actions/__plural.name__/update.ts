import { ResponderParams } from 'denali';
import ApplicationAction from '../application';


export default class Update<%= singular.className %> extends ApplicationAction {

  async respond({ params, body }: ResponderParams) {
    let post = await this.db.find('<%= singular.dasherized %>', params.id);
    Object.assign(post, body);
    return await post.save();
  }

}
