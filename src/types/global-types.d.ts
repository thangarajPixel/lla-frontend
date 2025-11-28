type StateItem = {
  id: string;
  createdAt: string;
  documentId: string;
  name: string;
  publishedAt: string;
  updatedAt: string;
};

type PaginationInterFace = {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
};

type StateDataResponse = {
  data: StateItem[];
  pagination: PaginationInterFace;
};

type AdmissionFormDataResponse = {
  data: ApplicationFormSchema_Step1 | ApplicationFormSchema_Step2 | ApplicationFormSchema_Step3;
  pagination: PaginationInterFace;
};


type ToastPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center';