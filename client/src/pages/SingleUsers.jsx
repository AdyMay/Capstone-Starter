
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./SingleUsers.css";

function SingleUsers({ token }) {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getSingleUser();
    }, [id]); 

    const getSingleUser = async () => {
        try {
            const response = await fetch(`../..//api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch user.");
            }
            const json = await response.json();
            setUser(json[0]);
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