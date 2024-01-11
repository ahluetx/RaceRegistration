// src/pages/ProfilePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const { userId } = useParams(); //extract userId from URL

  useEffect(() => {
    // Fetch the user profile
    const fetchProfile = async () => {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        console.error('Failed to fetch profile');
        return;
      }
      const data = await response.json();
      setProfile(data);
    }

    fetchProfile();
  }, [userId]);

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      {/* Display user profile details */}
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      {/* Add more profile details here */}
    </div>
  );
}

export default ProfilePage;
