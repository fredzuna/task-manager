import { ETaskStatus } from "../enums/ETaskStatus";
import { IMarker } from "./IMarker";
import { ISubTask } from "./ISubTask";
export interface ITask {
    id: string;
    name: string;
    status: ETaskStatus;
    description: string;
    subTasks?: ISubTask[];
    marker?: IMarker
}