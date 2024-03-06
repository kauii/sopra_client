import React, { useEffect, useState } from "react";
import {isRouteErrorResponse, useNavigate, useParams} from "react-router-dom";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner"; // Ensure Spinner is imported
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import "styles/views/Login.scss";// Ensure you have appropriate CSS
import { User } from "types";
import {Button} from "../ui/Button";

const EditProfile = () => {
	 console.log(localStorage.getItem("token"))
	 const navigate = useNavigate();
	 const [user, setUser] = useState<User | null>(null);
	 const { id } = useParams<{ id: string }>();
	 const [loading, setLoading] = useState<boolean>(true);
	 const [username, setUsername] = useState<string>('');
	 const [birthDate, setBirthdate] = useState<string>('');
	 const [isFormValid, setIsFormValid] = useState<boolean>(false);

	 useEffect(() => {
		 // Check if both username and birthdate are not empty
		  const isValid = username.trim() !== "" || birthDate.trim() !== "";
		  setIsFormValid(isValid);
	 }, [username, birthDate]);

	 const handleUsernameChange = (event) => {
	  	setUsername(event.target.value)
 	};

	const handleBirthdateChange = (event) => {
		setBirthdate(event.target.value);

	};
	const handleSubmit = async () => {
		event.preventDefault()
		try {
			// Make API request to update user profile
			const requestBody = JSON.stringify({ username, birthDate });
			await api.put(`/users/${id}`, requestBody);

			navigate(`/users/${id}`);

		} catch (error) {
			console.log(localStorage.getItem("token"))
			alert(`An error occurred while updating the profile: ${handleError(error)}`);
		}
	};

	const handleCancel = () => {
		// Navigate back to the user profile without saving changes
		navigate(`/users/${id}`);
	};

	let content = <Spinner />;

	return (
		<BaseContainer className="game container">
			<h2>Edit Profile</h2>

			<form>
				<ul className="player profile">
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={handleUsernameChange}
					/>

					<label htmlFor="birthdate">Birthdate:</label>
					<input
						style={{marginTop: "10px"}}
						type="date"
						id="birthdate"
						value={birthDate}
						onChange={handleBirthdateChange}
					/>
				</ul>

					<Button
						disabled={!isFormValid}
						width="100%"
						onClick={handleSubmit}
						style={{marginTop: "20px"}}
					>
						Save Changes
					</Button>
					<Button className="secondary-button"
						width="100%" onClick={handleCancel}
						style={{marginTop: "20px"}}
					>
						Cancel
					</Button>
			</form>
		</BaseContainer>
);
};

export default EditProfile;
