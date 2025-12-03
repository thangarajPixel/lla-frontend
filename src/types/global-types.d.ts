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
  data:
    | ApplicationFormSchema_Step1
    | ApplicationFormSchema_Step2
    | ApplicationFormSchema_Step3;
  pagination: PaginationInterFace;
};

type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

type FileUploadResponse = {
  data: { id: number }[];
};

type UploadRes = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: null;
  caption: null;
  width: null;
  height: null;
  formats: null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

type PageProps = {
  params: Promise<{ id: string }>;
};
