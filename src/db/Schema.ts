import { ESubTaskStatus } from "../enums/EStatus";

export const taskSchema = {
    title: 'tasks',
    version: 0,
    type: 'object',
    primaryKey: 'id',
    properties: {
      id: {
        type: 'string',
        maxLength: 100
      },
      name: {
        type: 'string',
      },
      status: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      subTasks: {
          type: 'array',
          uniqueItems: true,
          items: {
              type: 'object',
              properties: {
                id: {
                  type: "string"
                },
                name: {
                      type: "string"
                },
                status: {
                    type: ESubTaskStatus
                },
                comment: {
                  type: "string"
                }
              }
          }
      },
      marker: {
        type: "object",
        properties: {
            top: {
                "type": "number"
            },
            left: {
                "type": "number"
            }
        }
      } 
    },
    required: ['id']
}

export const subTaskSchema = {
  title: 'subtasks',
  version: 0,
  type: 'object',
  primaryKey: 'id',  
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    name: {
      type: 'string',
    },
    status: {
      type: ESubTaskStatus,
    },
    comment: {
      type: 'string',
    }
  },
  required: ['id']
}