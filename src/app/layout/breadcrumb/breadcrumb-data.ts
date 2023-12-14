export interface BreadcrumbDataType {
    routerLink: string,
    label: string,
    name: string
}

export const breadcrumbData: BreadcrumbDataType[] = [
    {
        routerLink: '/home',
        label: 'Home',
        name: 'home'
    },
    {
        routerLink: '/employee',
        label: 'Employee',
        name: 'employee'
    }
]