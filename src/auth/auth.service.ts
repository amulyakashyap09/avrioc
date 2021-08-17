import { Injectable, UnauthorizedException, BadRequestException, ArgumentsHost } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, } from './user.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        private jwtService: JwtService,
    ) { }

    async createUser(authCredentialsDto: AuthCredentialsDto) {

        let userToAttempt = await this.findOneByEmail(authCredentialsDto.email);
        if (!userToAttempt) {
            const newUser = new this.userModel({
                email: authCredentialsDto.email,
                password: authCredentialsDto.password
            });
            const user = await newUser.save();
            return user.toObject({ versionKey: false });
        } else {
            return new BadRequestException('Email already exist!');
        }
    }

    async validateUserByPassword(authCredentialsDto: AuthCredentialsDto) {
        let userToAttempt: any = await this.findOneByEmail(authCredentialsDto.email);
        if (!userToAttempt) throw new BadRequestException('Email not found !');
        const isMatch = await userToAttempt.checkPassword(authCredentialsDto.password);
        if (isMatch) {
            const payload: any = {
                token: this.createJwtPayload(userToAttempt),
            }
            return payload;
        } else {
            throw new BadRequestException(`Password don't match`);
        }
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email: email });
    }

    async validateUserByJwt(payload: JwtPayload) {
        let user = await this.findOneByEmail(payload.email);
        if (user) {
            return user;
        } else {
            throw new UnauthorizedException();
        }
    }

    createJwtPayload(user) {
        let data: JwtPayload = {
            _id: user._id,
            email: user.email
        };
        return this.jwtService.sign(data);
    }
}

