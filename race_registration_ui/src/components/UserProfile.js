import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserProfile.css';

function UserProfile() {
    const [profile, setProfile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const { userId } = useParams();
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
          const token = localStorage.getItem('token');
          if (!token) return;
    
          try {
            const response = await fetch(`/api/users/${userId}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
            if (!response.ok) {
              throw new Error('Failed to fetch profile');
            }
            const data = await response.json();
            setProfile(data);
          } catch (error) {
            console.error('Profile Fetch Error:', error);
          }
        };
        fetchProfile();
    }, [userId]); // Removed token from dependency array
  

    const handleFileSelect = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleEditPictureClick = () => {
        setEditMode(!editMode); // [3] Toggle edit mode on click
    };

    const handleProfilePictureUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('profilePicture', selectedFile);

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('/api/upload-profile-picture', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload profile picture');
            }

            const updatedProfile = await response.json();
            setProfile(updatedProfile);
            setEditMode(false); // [4] Exit edit mode after upload
        } catch (error) {
            console.error('Upload Error:', error);
        }
    };

    if (!profile) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="profile-container">
            {/* Profile Picture */}
            <img
                className="profile-picture"
                src={profile.profilePicture || 'default-profile-pic-url'}
                alt="Profile"
            />

            {/* Edit Profile Picture Button */}
            {profile.profilePicture && (
                <button className="edit-picture-btn" onClick={handleEditPictureClick}>
                    {/* Replace 'path/to/pencil-icon.png' with the actual path to your pencil icon */}
                    <img src="path/to/pencil-icon.png" alt="Edit" />
                </button>
            )}

            {/* User Info */}
            <div className="user-info">
                <h1>{profile.name}</h1>
                {/* More profile details */}
            </div>

            {/* Edit Mode for Uploading New Picture */}
            {editMode && (
                <div>
                    <input type="file" onChange={handleFileSelect} />
                    <button onClick={handleProfilePictureUpload}>Upload</button>
                </div>
            )}
        </div>
    );
}

export default UserProfile;
