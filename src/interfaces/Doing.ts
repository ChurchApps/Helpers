export interface ActionInterface { id?: string, automationId?: string, actionType?: string, actionData?: string }
export interface AutomationInterface { id?: string, title: string, recurs: string, active: boolean }
export interface ConditionInterface { id?: string, conjunctionId?: string, field?: string, fieldData?: string, operator?: string, value?: string, label?: string }
export interface ConjunctionInterface { id?: string, automationId?: string, parentId?: string, groupType?: string, conjunctions?: ConjunctionInterface[], conditions?: ConditionInterface[] }
export interface TaskInterface { id?: string, taskNumber?: number, taskType?: string, dateCreated?: Date, dateClosed?: Date, associatedWithType?: string, associatedWithId?: string, associatedWithLabel?: string, createdByType?: string, createdById?: string, createdByLabel?: string, assignedToType?: string, assignedToId?: string, assignedToLabel?: string, title?: string, status?: string, automationId?: string, conversationId?: string }

export interface PlanInterface { id?: string, churchId?:string, name?: string, ministryId?:string, serviceDate?: Date, notes?: string }
export interface PositionInterface { id?: string, churchId?:string, planId?:string, categoryName?:string, name?: string, count?:number, groupId?:string }
export interface AssignmentInterface { id?: string, churchId?:string, positionId?:string, personId?:string, status?:string, notified?:Date }
export interface TimeInterface { id?: string, churchId?:string, planId?:string, displayName?:string, startTime?:Date, endTime?:Date, teams?:string, teamList?:string[] }
export interface BlockoutDateInterface { id?: string; churchId?: string; personId?: string; startDate?: Date; endDate?: Date; }