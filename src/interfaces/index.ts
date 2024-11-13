type PENDING = "PENDING"
type INPROGRESS = "IN-PROGRESS"
type DONE = "DONE"

type State = PENDING | INPROGRESS | DONE

export function isState(state : string|undefined) : boolean{
    if (typeof state === "undefined") return false;
    if (state == "PENDING" || state == "IN-PROGRESS" || state == "DONE") return true;
    return false;
}

export interface ITodoList {
    id: string
    name?: string
    description?: string
    items: ITodoItem[]
}

export interface ITodoItem {
    id: string
    state: State
    description?: string
}