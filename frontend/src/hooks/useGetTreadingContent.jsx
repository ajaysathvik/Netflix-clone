import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTreadingContent = () => {
  const [treadingContent, setTreadingContent] = useState(null);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTreadingContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/trending`);
      setTreadingContent(res.data.content);
    };

    getTreadingContent();
  }, [contentType]);

  return { treadingContent };
};

export default useGetTreadingContent;
