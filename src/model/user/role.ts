import { isUndefined, size } from 'lodash'
import {Model} from 'rapin/lib/common'

export class ModelUserRole extends Model {
  public async addRole(data) {
    const role = await this.db.create('Role')

    role.codename = data.codename
    role.name = data.name
    role.description = data.description

    await this.db.save('Role', role)

    return role
  }

  public async editRole(roleId, data) {
    const role = await this.getRole(roleId)
    role.codename = data.codename
    role.name = data.name
    role.description = data.description

    await this.db.save('Role', role)

    return role
  }

  public async getRole(roleId) {
    return await this.db.findOne('Role', {roleId})
  }

  public async getRoles(data) {
    const options: any = {
      select: ['id', 'codename', 'name', 'description'],
      order: {
        firstName: 'ASC',
      },
      where: {},
    }

    if (!isUndefined(data.limit) && !isUndefined(data.start)) {
      options.skip = data.start
      options.take = data.limit
    }

    return await this.db.find('Role', options)
  }

  public async getTotalRoles() {
    const options: any = {
      select: ['id', 'codename', 'name', 'description'],
      order: {
        firstName: 'ASC',
      },
      where: {},
    }

    return size(await this.db.find('Role', options))
  }
}
