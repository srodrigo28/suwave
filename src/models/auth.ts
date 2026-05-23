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

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResult = {
  account: {
    acceptedTerms: boolean;
    email: string;
    fullName: string;
    whatsapp: string;
  };
  mode: "local";
  profile: CompleteProfileInput;
  profileCompleted: boolean;
  status: "authenticated";
};

export type CompleteProfileInput = {
  avatarUrl?: string;
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
