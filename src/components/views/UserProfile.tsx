import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner"; // Ensure Spinner is imported
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss"; // Ensure you have appropriate CSS
import { User } from "types";
import {Button} from "../ui/Button";

const UserProfile = () => {
  console.log(localStorage.getItem("token"))
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  let display;


  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        // id = parseInt(id, 10)
        const response = await api.get(`/users/${id}`);
        console.log(response.data)
        setUser(response.data);
        //setUsername(foundUser ? foundUser.username : null)
      } catch (error) {
        alert(`An error occurred while fetching the users: ${handleError(error)}`);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const getStatusColor = () => {
    if (user.status === "ONLINE") {
      return { color: "#63b063" };
    } else {
      return {}; // No additional styles for other statuses
    }
  };

  let content = <Spinner />;

  if (!loading) {
    if (user) {
      display = user.username
      content = (
	      <ul className="player profile">
		      <div>
			      <span style={{color: "black"}}>Username:</span> {user.username}
		      </div>
		      <div>
			      <span style={{color: "black"}}>Status: </span>
			      <span style={getStatusColor()}>{user.status}</span>
		      </div>
		      <div>
			      <span style={{color: "black"}}>Creation Date:</span> {user.creationDate}
		      </div>
		      <div>
			      <span style={{color: "black"}}>Birth Date:</span> {user.birthDate}
		      </div>
	      </ul>

      );
    } else {
	    display = "???"
	    content =
		    <div>User with <span style={{color: "#96a7ff"}}> ID:</span> {parseInt(id, 10).toString()} was not found</div>;
    }
  }

  return (
    <BaseContainer className="game container">
      {user && user.token === localStorage.getItem("token") ? (
        <h2>My Profile</h2>
      ) : (
        <h2>Profile of {display}</h2>
      )}
      {content}
      {user && user.token === localStorage.getItem("token") && (
        <Button
          width="100%"
          onClick={() => navigate(`/users/${user.id}/edit-profile`)} // Update with your edit profile route
          style={{ marginTop: "20px" }}
        >
					Edit Profile
        </Button>
      )}
	    <Button className="secondary-button"
		    width="100%"
		    onClick={() => navigate("/overview")}
		    style={{ marginTop: "20px" }}
	    >
		    Go back to Overview
	    </Button>
    </BaseContainer>


  );
};

export default UserProfile;
