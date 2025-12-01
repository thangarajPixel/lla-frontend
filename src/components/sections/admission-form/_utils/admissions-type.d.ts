type DocumentFile = {
  id: number;
  name: string;
  url: string;
};

type AdmissionFormData = {
  name_title: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  nationality: string;
  passport_size_image: DocumentFile;
  mobile_no: string;
  email: string;

  Language_Proficiency: LanguageProficiency[];

  address: string;
  city: string;
  district: string;
  state: string | number;
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
  address: string;
  city: string;
  district: string;
  state: string;
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
  ug_status: "Finished" | "In-Progress" | string;
};

type PostGraduate = {
  id: number;
  degree: string;
  marksheet: DocumentFile;
  pg_status: "Finished" | "In-Progress" | string;
};

type WorkExperience = {
  id: number;
  designation: string;
  employer: string;
  duration_start: string; // ISO date
  duration_end: string; // ISO date
  reference_letter: DocumentFile | number;
};

type Portfolio = {
  id: number;
  images: DocumentFile[];
};

//  type PortfolioImage = {
//   id: number;
// }

type AdmissionListResponse = {
  data: AdmissionFormData[];
};

type AdmissionResponse = {
  data: AdmissionFormData;
};
