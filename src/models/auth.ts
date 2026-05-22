export type RegisterAccountInput = {
  acceptedTerms: boolean;
  email: string;
  fullName: string;
  password: string;
  passwordConfirmation: string;
  whatsapp: string;
};

export type RegisterAccountResult = {
  account: {
    acceptedTerms: boolean;
    email: string;
    fullName: string;
    whatsapp: string;
  };
  mode: "local";
  status: "draft-created";
};

export type CompleteProfileInput = {
  birthDate: string;
  city: string;
  cpf: string;
  fullName: string;
  gender: string;
  whatsapp: string;
};

export type CompleteProfileResult = {
  mode: "local";
  profile: CompleteProfileInput;
  status: "profile-completed";
};
