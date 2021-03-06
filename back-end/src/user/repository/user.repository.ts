import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@EntityRepository(User)
class UserRepository extends Repository<User> {
    async findById(id: string | number): Promise<User | undefined> {
        return this.findOne(id);
    }

    async findByName(username: string): Promise<User | undefined> {
        const user = await this.findOne({ username });

        return this.findOne({
            relations: ['roles', 'collections', 'collections.poetries'],
            where: { id: user?.id },
            withDeleted: false,
        });
    }

    async updateUser(props: { [key in keyof User]?: User[key] }, user: User) {
        return this.update(props, user);
    }

    async createAndSave(user: User): Promise<User> {
        return this.save(user);
    }
}

export default UserRepository;
