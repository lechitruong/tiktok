import { AbstractModel } from ".";

export interface RoleModel extends AbstractModel {
    id : number;
    code :string;
    value : string;
}