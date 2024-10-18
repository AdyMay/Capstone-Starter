
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./SingleUsers.css";

function SingleUsers({ token }) {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState(null); 
    const [error, setError] = useState(null);

    useEffect(() => {
     getSingleUser();
    }, [id]); 

    const getSingleUser = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch user.");
            }
            const reviewResponse = await fetch (`http://localhost:3000/api/users/${id}/reviews`)
            const json = await response.json();
            const jsonReviews = await reviewResponse.json();
            console.log(json);
            console.log(jsonReviews);
            setUser(json);
            setReviews(jsonReviews);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            {!user && !error && <p>Loading user data...</p>}
            {user && (
                <div>
                    <h2>{user.username}</h2>
                    <p>Email: {user.email}</p>
                    {/* User Details Here */}
                </div>
            )}
        </div>
    );
}

export default SingleUsers;