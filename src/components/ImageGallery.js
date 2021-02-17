import React, { useState, useEffect } from "react";
import Pics from "./Pics";
import Pagination from "./Pagination";
import axios from "axios";
import { API_KEY, BASE_URL } from "../config";

const ImageGallery = ({ lat, lon }) => {
  const [pics, setPics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [picsPerPage, setPicsPerPage] = useState(250);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [totalPics, setTotalPics] = useState(0);

  useEffect(() => {
    const fetchPics = async () => {
      setLoading(true);

      try {
        let res = await axios.get(
          `${BASE_URL}?method=flickr.photos.search&api_key=${API_KEY}&lat=${lat}&lon=${lon}&format=json&page=${currentPage}`
        );
        res = JSON.parse(res.data.slice(14, -1));

        setPageNo(res.photos.page);
        setTotalPages(res.photos.pages);
        setPicsPerPage(res.photos.perpage);
        setPics(res.photos.photo);
        setTotalPics(res.photos.total);

        setLoading(false);
      } catch (e) {
        console.log("Something Went Wrong!");
        setPics([]);
        setLoading(false);
      }
    };

    fetchPics();
  }, [currentPage, lat, lon]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div>
        <h6 className="text-center">
          {!loading &&
            `Showing Public Images for Latitude: ${lat} and Longitude: ${lon}`}
        </h6>
      </div>

      <p className="text-center">
        {!loading &&
          pics.length == 0 &&
          `No public images found for this location, please try another location!!`}
      </p>
      <Pics pics={pics} loading={loading} />
      {!loading && (
        <Pagination
          picsPerPage={picsPerPage}
          totalPics={totalPics}
          paginate={paginate}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default ImageGallery;
