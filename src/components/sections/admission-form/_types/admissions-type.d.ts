type DocumentFile = {
  id: number;
  name: string;
  url: string;
  alternativeText: string | null;
  caption: string | null;
  createdAt: string;
  documentId: string;
  ext: string;
  folderPath: string;
  formats: {
    thumbnail?: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: string | null;
      width: number;
      height: number;
      size: number;
      url: string;
    };
    small?: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: string | null;
      width: number;
      height: number;
      size: number;
      url: string;
    };
    medium?: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: string | null;
      width: number;
      height: number;
      size: number;
      url: string;
    };
    large?: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: string | null;
      width: number;
      height: number;
      size: number;
      url: string;
    };
  };
  hash: string;
  height: number;
  locale: string | null;
  mime: string;
  previewUrl: string | null;
  provider: string;
  publishedAt: string;
  size: number;
  updatedAt: string;
  width: number;
};

type State = {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: null;
  locale: null;
};

type AddressChild = {
  text: string;
  type?: string;
};

type AddressBlock = {
  type: string;
  children: AddressChild[];
};

type AdmissionFormData = {
  course_id: number;
  id: number;
  documentId: string;
  name_title: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  nationality: string;
  passport_size_image: DocumentFile;
  mobile_no: string;
  email: string;

  Language_Proficiency: LanguageProficiency[];

  address: AddressBlock[];
  city: string;
  district: string;
  state: State;
  pincode: string;
  hobbies: string;
  photography_club: string;
  blood_group: string;

  Parent_Guardian_Spouse_Details: ParentGuardianDetails;

  step_1: boolean;

  Education_Details: EducationDetails;

  Under_Graduate: UnderGraduate;

  Post_Graduate: PostGraduate[];

  Work_Experience: WorkExperience[];

  step_2: boolean;

  Upload_Your_Portfolio: Portfolio;

  step_3: boolean;

  Payment_Status: "Paid" | "Not Paid" | string;
};

type LanguageProficiency = {
  id: number;
  language: string;
  read: boolean;
  write: boolean;
  speak: boolean;
};

type ParentGuardianDetails = {
  id: number;
  title: string;
  first_name: string;
  last_name: string;
  mobile_no: string;
  email: string;
  profession: string;
  nationality: string;
  address: AddressBlock[];
  city: string;
  district: string;
  state: State;
  pincode: string;
};

type EducationDetails = {
  Education_Details_12th_std: DocumentFile;
  Education_Details_10th_std: DocumentFile;
};

type UnderGraduate = {
  id: number;
  degree: string;
  marksheet: DocumentFile;
  ug_status: string;
};

type PostGraduate = {
  id: number;
  degree: string;
  marksheet: DocumentFile;
  pg_status: string;
};

type WorkExperience = {
  id: number;
  designation: string;
  employer: string;
  duration_start: string;
  duration_end: string;
  reference_letter: DocumentFile;
};

type Portfolio = {
  id: number;
  images: DocumentFile[];
};

type AdmissionListResponse = {
  data: AdmissionFormData[];
};

type AdmissionResponse = {
  data: AdmissionFormData;
};
