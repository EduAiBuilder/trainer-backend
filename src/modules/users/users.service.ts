import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name)
		private userModel: Model<User>
	) {}

	async create(createUserDto: CreateUserDto) {
		return this.userModel.create(createUserDto);
	}

	async findAll() {
		return `This action returns all users`;
	}

	async findOne(filter: FilterQuery<User>) {
		return this.userModel.findOne(filter).exec();
	}

	async update(id: string, updateUser: Partial<User>) {
		return this.userModel.findByIdAndUpdate(id, updateUser);
	}

	async remove(id: string) {
		return `This action removes a #${id} user`;
	}
}
