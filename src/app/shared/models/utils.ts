export class PageableQuery {
  size?: number;
  page = 0;
  fields?: string;
  sort?: string;
  timeZone?: string;
}
export class UserPageableQuery {
  size?: number;
  page = 0;
  fields?: string;
  sort?: string;
  search?: string;
  status?: boolean;
  propertyId?: string;
}

export class InspectionPagebleQuery extends UserPageableQuery {
  fromDate?: string;
  toDate?: string;
  inspectedBy?: string;
  inspectionFor?: string;
  companyPropertyId?: number;
  timeZone?: string;
}

export class PageableQueryInspection {
  size?: number;
  page = 0;
  fields?: string;
  sort?: string;
  propertyId?: string;
  companyPropertyId?: number;
  timeZone?: string;
}

export class QRCodePageableQuery {
  size?: number;
  page = 0;
  fields?: string;
  sort?: string;
  key?: string;
  propertyId?: string;
  companyPropertyId?: number;
  timeZone?: string;
}

export class QrNotesPageableQuery extends PageableQuery {
  qrCodeNotesSearchDTO?: QrNoteParams = new QrNoteParams();
}
export class QrNoteParams {
  endDate?: string;
  qrCodeId?: string;
  status?: boolean;
  startDate?: string;
}

export class PageableQueryTenant {
  size?: number;
  page = 0;
  fields?: string;
  sort?: string;
  propertyId?: string;
}

export class NoteParam extends PageableQuery {
  ticketNumber?: string;
}

export class AttachmentParam extends PageableQuery {
  noteId?: number;
}

export class Pageable {
  pageable?: PageableObject;
  totalElements?: number;
  totalPages?: number;
  last?: boolean;
  numberOfElements?: number;
  first?: boolean;
  sort?: Sort;
  size?: number;
  number?: number;
}

export class PageableObject {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
}

export class PageableQueryLoopVendorPOC {
  size?: number;
  page = 0;
  fields?: string;
  sort?: string;
  loopVendorId?: string;
  propertyId?: string;
}
export class PageableQueryLoopPropertyPOC {
  size?: number;
  page = 0;
  fields?: string;
  sort?: string;
  loopPropertyId?: string;
}
export class PageableQueryChatProperty {
  size?: number;
  page = 0;
  fields?: string;
  search?: string;
  sort?: string;
  timeZone?: string;
}

export class Sort {
  sorted?: boolean;
  unsorted?: boolean;
}

export class NotificationPageableQuery {
  size = 15;
  page = 0;
}
