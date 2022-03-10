import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  //get user (if logged in)
  const { user } = useContext<string | any>(AuthContext);
  return (
    <div className="min-h-screen">
      <h1 className="text-center font-bold uppercase py-4">Profile page</h1>
      <div className="flex justify-center">
        <div className="border p-16 rounded-lg shadow-lg space-y-2">
          <div className="flex space-x-2">
            <p>Username: </p>
            <p className="font-semibold">{user.displayName}</p>
          </div>
          <div className="flex space-x-2">
            <p>Email: </p>
            <p className="font-semibold">{user.email}</p>
          </div>
          <div className="flex space-x-2">
            <p>Does the email already verified: </p>
            <p className="font-semibold">
              {user.emailVerified === false ? "False" : "True"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
