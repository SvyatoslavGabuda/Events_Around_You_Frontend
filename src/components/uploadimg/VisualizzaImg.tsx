import { useEffect, useState } from "react";

const VisualizzaImg = () => {
  const [image, setImage] = useState<string>("");
  // const fetchImg = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8081/api/images/db/1", {
  //       headers: {
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJQaXBwbzIuUGlwcG9AZXhhbXBsZS5jb20iLCJpYXQiOjE2ODM4MTE0NjksImV4cCI6MTY4NDQxNjI2OX0.EOwuQJbf1Xq8l2Eyd_ZP7L2iXQ06Ov9TY_zXsPrloUmMoGL8637ObPyUoJkpyRFY",
  //       },
  //     });
  //     if (response.ok) {
  //       const data = await response.text();
  //       console.log(data);
  //       setImage(data);
  //       console.log("ha funzionato?");
  //     } else {
  //       console.log("errore");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    console.log("useEffect");
    // fetchImg();
  }, []);
  return <> {image ? <img src="http://localhost:8081/api/images/db/1" alt="Image" /> : <></>}</>;
};
export default VisualizzaImg;
