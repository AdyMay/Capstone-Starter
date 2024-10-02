
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./SingleBusiness.css";

const singleBusinessStyles = (pageType) => ({
    width: "70%",
    margin: pageType === "single-business" ? "0 auto" : undefined,
});

const imgSingleStyles = {
    width: "100%",
};

function SingleBusiness({ pageType }) {
    const { id } = useParams();
    const [business, setBusiness] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const token = window.localStorage.getItem("token");
                const response = await fetch(`/api/business/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // check token
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch business data");
                }

                const json = await response.json();
                setBusiness(json[0]);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBusiness();
    }, [id]);

    if (loading) return <p>Loading business details...</p>;
    if (error) return <p>{error}</p>;

    const { name, description, image } = business || {};

    return (
        <div className="single-business-list" style={singleBusinessStyles(pageType)}>
            {business && (
                <>
                    <h2>{name}</h2>
                    <p>{description}</p>
                    {image && <img src={image} alt={name} style={imgSingleStyles} />}
                    <br />
                    {window.localStorage.getItem("token") ? (
                        <p><a href="/CreateReview">Review {name}</a></p>
                    ) : (
                        <p><a href="/login">Login</a> to review!</p>
                    )}
                </>
            )}
        </div>
    );
}

export default SingleBusiness;