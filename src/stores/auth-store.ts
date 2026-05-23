"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AccountDraft = {
  acceptedTerms?: boolean;
  email?: string;
  fullName?: string;
  whatsapp?: string;
};

export type ProfileDraft = {
  avatarUrl?: string;
  birthDate?: string;
  city?: string;
  cpf?: string;
  fullName?: string;
  gender?: string;
  whatsapp?: string;
};

type AuthState = {
  accountDraft: AccountDraft;
  authenticateLocal: () => void;
  clearLocalSession: () => void;
  completeProfileLocal: (draft: ProfileDraft) => void;
  isAuthenticated: boolean;
  profileCompleted: boolean;
  profileDraft: ProfileDraft;
  saveAccountDraft: (draft: AccountDraft) => void;
  saveProfileDraft: (draft: ProfileDraft) => void;
};

const initialState = {
  accountDraft: {},
  isAuthenticated: false,
  profileCompleted: false,
  profileDraft: {},
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      authenticateLocal: () => set({ isAuthenticated: true }),
      clearLocalSession: () => set(initialState),
      completeProfileLocal: (draft) =>
        set((state) => ({
          isAuthenticated: true,
          profileCompleted: true,
          profileDraft: { ...state.profileDraft, ...draft },
        })),
      saveAccountDraft: (draft) =>
        set((state) => ({
          accountDraft: { ...state.accountDraft, ...draft },
        })),
      saveProfileDraft: (draft) =>
        set((state) => ({
          profileDraft: { ...state.profileDraft, ...draft },
        })),
    }),
    {
      name: "suwave-auth-local",
      partialize: (state) => ({
        accountDraft: state.accountDraft,
        isAuthenticated: state.isAuthenticated,
        profileCompleted: state.profileCompleted,
        profileDraft: state.profileDraft,
      }),
    },
  ),
);
