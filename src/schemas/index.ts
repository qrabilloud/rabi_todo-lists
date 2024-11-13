export const listListsSchema = {
    tags: ['lists'],
    summary: 'List all the lists',
    response: {
        200: {
            description: 'Successful response',
            type: 'array',
            items: {
              $ref: 'ITodoList#'
            }
        }
    }
}

export const addListSchema = {
    tags: ['lists'],
    summary: 'Add a new list',
    body: {
        $ref: 'ITodoList#'
    }
}

export const deleteListSchema = {
    tags: ['lists'],
    summary: 'Delete a list'
}

export const updateListByIDSchema = {
    tags: ['lists'],
    summary: 'Update a list',
    body: {
        $ref: 'ITodoList#'
    }
}

export const getItemsSchema = {
    tags: ['lists'],
    summary: 'Get the items of a list'
}

export const addItemSchema = {
    tags: ['lists'],
    summary: 'Add an item to a list',
    body: {
        $ref: 'ITodoItem#'
    }
}

export const deleteItemSchema = {
    tags: ['lists'],
    summary: 'Delete an item of a list'
}

export const updateItemSchema = {
    tags: ['lists'],
    summary: 'Update an item of a list',
    body: {
        $ref: 'ITodoItem#'
    }
}