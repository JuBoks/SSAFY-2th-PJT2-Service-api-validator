import { SetMetadata } from "@nestjs/common";

export function AllowUnauthorizedRequest (){
    return SetMetadata('allowUnauthorizedRequest', true);
}