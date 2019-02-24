import { isUndefined, join, size } from 'lodash'
import {Model} from 'rapin/lib/common'

export class ModelUserUser extends Model {
  public async addUser(data) {
    const passwordHash = this.crypto.getHashPassword(data.password)

    const user = await this.db.create('User')

    user.firstName = data.firstName
    user.lastName = data.lastName
    user.telephone = data.telephone
    user.email = data.email
    user.image = ''
    user.roleId = data.roleId
    user.password = passwordHash.hash
    user.salt = passwordHash.salt

    await this.db.save('User', user)

    return user
  }

  public async editUser(userId, data) {
    const user = await this.getUser(userId)
    user.firstName = data.firstName
    user.lastName = data.lastName
    user.telephone = data.telephone

    await this.db.save('User', user)

    return user
  }

  public async getUserByEmail(email) {
    return await this.db.findOne('User', {email}, {relations: ['role']})
  }

  public async getUser(userId) {
    return await this.db.findOne('User', {id: userId}, { select: ['id', 'firstName', 'lastName', 'telephone', 'email', 'image', 'roleId'], relations: ['role'] })
  }

  public async getUsers(data: any = {}) {
    const options: any = {
      select: ['id', 'firstName', 'lastName', 'telephone', 'email', 'image', 'roleId'],
      relations: ['role'],
      order: {
        firstName: 'ASC',
      },
      where: {},
    }

    if (!isUndefined(data.filter_role)) {
      options.where.roleId = data.filter_role
    }

    if (!isUndefined(data.limit) && !isUndefined(data.start)) {
      options.skip = data.start
      options.take = data.limit
    }

    return await this.db.find('User', options)
  }

  public async getTotalUsers(data: any = []) {
    const options: any = {
      select: ['id', 'firstName', 'lastName', 'telephone', 'email', 'image', 'roleId'],
      relations: ['role'],
      order: {
        firstName: 'ASC',
      },
      where: {},
    }

    if (!isUndefined(data.filter_role)) {
      options.where.roleId = data.filter_role
    }

    return size(await this.db.find('User', options))
  }

  public async updateImage(userId: number, image: string) {
    const user = await this.getUser(userId)
    user.image = image
    await this.db.save('User', user)
    return user
  }
}
