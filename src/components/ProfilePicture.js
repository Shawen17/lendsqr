import { useState } from "react";

const ProfilePicture = ({ currentPicture, onPictureChange }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handlePictureClick = () => {
    setIsEditing(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onPictureChange(file);
    setIsEditing(false);
  };

  return (
    <div className="profile-picture">
      {isEditing ? (
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
        />
      ) : (
        <img src={currentPicture} alt="Profile" onClick={handlePictureClick} />
      )}
    </div>
  );
};

export default ProfilePicture;
