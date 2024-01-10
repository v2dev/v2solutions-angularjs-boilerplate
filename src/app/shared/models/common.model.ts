export interface Menu {
  label: string;
  icon: string;
  routerLink: string;
  visible: boolean;
  items: Menu[];
}

export interface SideScreenActionConfig {
  action: string;
  slug: string;
  visibility?: boolean;
}

export interface PaginationChange {
  page: number;
  itemPerPage: number;
}

export interface CommonApiResponse {
  httpStatus: number;
  message: string;
}
