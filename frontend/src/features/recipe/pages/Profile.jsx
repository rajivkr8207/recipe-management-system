import useAuth from "../../auth/hooks/useAuth";
import "../styles/Profile.scss";

function Profile() {
  const { User } = useAuth();
  
  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="profile-header">
          <div className="avatar">
            {User?.username?.charAt(0).toUpperCase()}
          </div>

          <h2>{User?.fullname}</h2>
          <p className="username">@{User?.username}</p>
        </div>

        <div className="profile-info">
          <div className="row">
            <span>Email</span>
            <p>{User?.email}</p>
          </div>

          <div className="row">
            <span>Full Name</span>
            <p>{User?.fullname}</p>
          </div>

          <div className="row">
            <span>Bio</span>
            <p>{User?.bio || "No bio added yet"}</p>
          </div>
        </div>

        <button className="edit-btn">Edit Profile</button>

      </div>
    </div>
  );
}

export default Profile;