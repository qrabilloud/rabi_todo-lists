type PENDING = "PENDING"
type INPROGRESS = "IN-PROGRESS"
type DONE = "DONE"

type State = PENDING | INPROGRESS | DONE

export interface ITodoList {
    id: string
    name?: string
    description?: string
    items: Item[]
}

export interface Item {
    id: string
    state?: State
    description?: string
}