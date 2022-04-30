import { Get, JsonController, OnUndefined } from "routing-controllers";

@JsonController('/health-check')
export class HealthCheckController{
    @Get('')
    @OnUndefined(204)
    getAll(){}
}