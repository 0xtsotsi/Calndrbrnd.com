import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsEnum, ValidateNested } from "class-validator";

import { ERROR_STATUS, SUCCESS_STATUS } from "@calndrbrnd/platform-constants";
import { TeamOutputDto } from "@calndrbrnd/platform-types";

export class GetTeamOutput {
  @ApiProperty({ example: SUCCESS_STATUS, enum: [SUCCESS_STATUS, ERROR_STATUS] })
  @IsEnum([SUCCESS_STATUS, ERROR_STATUS])
  status!: typeof SUCCESS_STATUS | typeof ERROR_STATUS;

  @Expose()
  @ValidateNested()
  @Type(() => TeamOutputDto)
  data!: TeamOutputDto;
}
