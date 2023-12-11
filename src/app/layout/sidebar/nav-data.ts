export interface NavDataType {
    routerLink: string,
    icon: string,
    label: string,
    visible: boolean
}

export const navbarData: NavDataType[] = [
    {
        routerLink: 'home',
        icon: 'fa fa-home',
        label: 'Home',
        visible: true,
    },
    {
        routerLink: 'employee',
        icon: 'fa fa-users',
        label: 'Employee',
        visible: true,
    },
    {
        routerLink: 'login',
        icon: 'fa fa-power-off',
        label: 'Logout',
        visible: true,
    }
]