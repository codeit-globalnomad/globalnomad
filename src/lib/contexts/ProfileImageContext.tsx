'use client';

import { createContext, useContext, useState } from 'react';

type ProfileImageContextType = {
  profileImageUrl: string;
  setProfileImageUrl: (url: string) => void;
};

const ProfileImageContext = createContext<ProfileImageContextType | undefined>(undefined);

export const ProfileImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');

  return (
    <ProfileImageContext.Provider value={{ profileImageUrl, setProfileImageUrl }}>
      {children}
    </ProfileImageContext.Provider>
  );
};

export const useProfileImage = () => {
  const context = useContext(ProfileImageContext);
  if (!context) {
    throw new Error('useProfileImage must be used within a ProfileImageProvider');
  }
  return context;
};
