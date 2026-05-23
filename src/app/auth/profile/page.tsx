import { Suspense } from "react";
import { ProfileScreen } from "./_components/profile-screen";

export default function ProfilePage() {
  return (
    <Suspense fallback={null}>
      <ProfileScreen />
    </Suspense>
  );
}
