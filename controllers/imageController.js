import { StatusCodes } from "http-status-codes";
import axios from "axios";

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

const fetchNasaImage = async (req, res) => {
  try {
    const response = await axios.get(process.env.NASA_API_URL, {
      params: {
        q: "moon",
        media_type: "image",
        year_start: "2023",
        year_end: "2023",
        page: 1,
      },
    });

    const images = response.data.collection.items;

    if (images.length === 0) {
      throw new NotFoundError("No Image found");
    }
    const randomIndex = Math.floor(Math.random() * images.length);
    let lastFetchedImage = null;
    lastFetchedImage = images[randomIndex];
    res.json(lastFetchedImage);
  } catch (error) {
    console.error("Error fetching NASA images:", error.message);
    throw new ServerError("Error fetching NASA images");
  }
};

export { fetchNasaImage };
