import { Module } from "@nestjs/common";
import { UserService } from "./services/user/user.service";


@Module({
  imports: [],
  providers: [UserService],
  exports: [UserService]
})


export class UserModule{}