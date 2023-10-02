import { ESubTaskStatus } from "../../enums/EStatus";
import NotStartedIcon from '../../assets/notStartedIcon.svg';
import BlockedIcon from '../../assets/BlockedIcon.svg';
import FinalIcon from '../../assets/FinalIcon.svg';
import DoneIcon from '../../assets/DoneIcon.svg';
import { ISubStateIcon } from "../../interfaces/ISubStateIcon";

export function getSubTaskStateInfo(status: ESubTaskStatus): ISubStateIcon {
    const defaultState = {
        className: 'sub-task-notstarted',
        icon: NotStartedIcon
    }

    switch (status) {
      case ESubTaskStatus.NotStarted:
        return defaultState
    case ESubTaskStatus.Blocked:
        return {
            className: 'sub-task-blocked',
            icon: BlockedIcon
        }
    case ESubTaskStatus.Done:
        return {
            className: 'sub-task-done',
            icon: DoneIcon
        }
    case ESubTaskStatus.Final:
        return {
            className: 'sub-task-final',
            icon: FinalIcon
        }
    case ESubTaskStatus.Warning:
        return {
            className: 'sub-task-warning',
            icon: NotStartedIcon
        }
      default:
        return defaultState
    }
  }