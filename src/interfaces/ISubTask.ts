import { ESubTaskStatus } from "../enums/EStatus";

export interface ISubTask {
    id: string;
    name: string;
    status: ESubTaskStatus;
    comment: string
}