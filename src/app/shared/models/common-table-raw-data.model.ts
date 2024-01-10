export interface TableRowDataModel {
  QR?: string;
  lockNumber?: string;
  description?: string;
  selectedLockIds?: number[];
  numberOfLock?: string;
  id?: string;
  equipmentId?: string;
  woPermitId?: string;
  qrCodeBase64?: string;
  propertyId?: number | null | undefined;
  propertyName?: string;
  scopeOfWork?: string;
  statusText?: string;
  updatedOn?: string;
  lockSteps?: string[];
  status?: number | null | undefined;
  papUserIds?: number | null;
  reviewerUserIds?: number | null;
  lockBoxId?: string;
  naHandOff1B?: boolean;
  handOffStatus1B?: number | null;
  handOffStatusOther1B?: string;
  lockPoints?: number[];
  reminderPeriod?: string;
  reminderIntimation?: string;
  notifyPersons?: number | null;
  userId?: number | null;
}

export interface TableColumnsModel {
  field: string;
  header: string;
  sortBy: string;
  type: string;
}
