export interface ColumnType {
    name: string,
    label: string
}

export interface Employee {
    _id?: string,
    name: string,
    email: string,
    dob: Date,
    designation: string,
    education: string
}

export interface GetEmployee {
    limit: number,
    page: number,
    filterStr: string,
    sortOrder: string,
    sortColumn: string
}