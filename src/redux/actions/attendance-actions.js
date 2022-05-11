import {ActionTypes} from "../constants/actions-types";

export const getAttendance = (class_id, record, page, navigate= null) => {
  return {
    type: ActionTypes.GET_ATTENDANCE,
    class_id: class_id,
    record: record,
    page: page,
    navigate: navigate
  };
};

export const getSpecificAttendance = (class_id, attendance_id, navigate= null) => {
  return {
    type: ActionTypes.GET_SPECIFIC_ATTENDANCE,
    class_id: class_id,
    attendance_id: attendance_id,
    navigate: navigate
  };
};

export const participateInAttendance = (class_id, attendance_id, navigate= null) => {
  return {
    type: ActionTypes.PARTICIPATE_IN_ATTENDANCE,
    class_id: class_id,
    attendance_id: attendance_id,
    navigate: navigate
  };
};

export const createAttendance = (class_id, navigate= null) => {
  return {
    type: ActionTypes.CREATE_ATTENDANCE,
    class_id: class_id,
    navigate: navigate
  };
};
