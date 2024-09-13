"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChaufferDriverDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_chauffer_driver_dto_1 = require("./create-chauffer-driver.dto");
class UpdateChaufferDriverDto extends (0, mapped_types_1.PartialType)(create_chauffer_driver_dto_1.CreateChaufferDriverDto) {
}
exports.UpdateChaufferDriverDto = UpdateChaufferDriverDto;
//# sourceMappingURL=update-chauffer-driver.dto.js.map