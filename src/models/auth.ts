export type RegisterAccountInput = {
  acceptedTerms: boolean;
  cpf: string;
  email: string;
  fullName: string;
  password: string;
  passwordConfirmation: string;
  whatsapp: string;
};

export type RegisterAccountResult = {
  account: {
    acceptedTerms: boolean;
    cpf: string;
    email: string;
    fullName: string;
    whatsapp: string;
  };
  accessToken: string;
  mode: "api";
  status: "registered";
};

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResult = {
  account: {
    acceptedTerms: boolean;
    cpf?: string;
    email: string;
    fullName: string;
    whatsapp: string;
  };
  accessToken?: string;
  mode: "local";
  profile: CompleteProfileInput;
  profileCompleted: boolean;
  status: "authenticated";
};

export type CompleteProfileInput = {
  avatarUrl?: string;
  birthDate: string;
  city: string;
  cpf?: string;
  fullName: string;
  gender: string;
  whatsapp: string;
};

export type CompleteProfileResult = {
  mode: "local";
  profile: CompleteProfileInput;
  status: "profile-completed";
};
