import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}

	async create(createUserDto: CreateUserDto): Promise<UserEntity> {
		const newUser = this.userRepository.create(createUserDto);
		return await this.userRepository.save(newUser);
	}

	async findOne(id: number): Promise<UserEntity | undefined> {
		return await this.userRepository.findOne({ where: { id } });
	}

	async update(id: number, updateUser: Partial<UserEntity>): Promise<UserEntity> {
		await this.userRepository.update(id, updateUser);
		return this.findOne(id);
	}

	async remove(id: number): Promise<void> {
		await this.userRepository.delete(id);
	}
}
