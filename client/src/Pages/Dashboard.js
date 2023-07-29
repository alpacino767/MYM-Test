import { useAppContext } from "../context/appContext";
import React, { useEffect } from "react";
import moment from "moment";

const Dashboard = () => {
  const { logoutUser, fetchNasaImage, nasaImageDetails } = useAppContext();

  const currentDate = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    // Check if image details exist in local storage and date matches current date
    const cachedNasaImage = JSON.parse(localStorage.getItem("imageDetails"));
    if (cachedNasaImage && cachedNasaImage.dateAdded === currentDate) {
      return;
    } else {
      fetchNasaImage();
    }
  }, [fetchNasaImage, currentDate]);

  return (
    <div className="body-bg">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: "10px",
          paddingRight: "15px",
        }}
      >
        <button onClick={logoutUser} className="btn-2">
          <p className="f2">Log out</p>
        </button>
      </div>
      <div style={{ textAlign: "center" }}>
        <h1>NASA Astronomy Picture of the Day</h1>
        <h4>This image changes everyday</h4>
        <h4>Come back tomorrow for a new image 😉</h4>
      </div>

      <div className="card-container">
        <div className="image-card">
          {nasaImageDetails !== null && (
            <div className="image-container">
              {nasaImageDetails.links && (
                <img
                  src={nasaImageDetails.links[0]?.href}
                  alt={nasaImageDetails.title}
                />
              )}
              <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <h4>{nasaImageDetails.data[0]?.title}</h4>
                <p>{moment(nasaImageDetails.date).format("MMMM Do, YYYY")}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
