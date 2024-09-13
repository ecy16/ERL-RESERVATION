"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLoginDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const signIn_dto_1 = require("../../dto/signIn.dto");
class UpdateLoginDto extends (0, mapped_types_1.PartialType)(signIn_dto_1.SignInDto) {
}
exports.UpdateLoginDto = UpdateLoginDto;
//# sourceMappingURL=update-login.dto.js.map