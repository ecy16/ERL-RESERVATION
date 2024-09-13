"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateContractDetailDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_contract_detail_dto_1 = require("./create-contract-detail.dto");
class UpdateContractDetailDto extends (0, mapped_types_1.PartialType)(create_contract_detail_dto_1.CreateContractDetailDto) {
}
exports.UpdateContractDetailDto = UpdateContractDetailDto;
//# sourceMappingURL=update-contract-detail.dto.js.map