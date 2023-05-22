import { useState } from "react";
import useAuth from "../../auth/hooks/useAuth";
interface FormData {
  file: File | null;
}
const UploadForm = () => {
  const { auth }: any = useAuth();
  const [formData, setFormData] = useState<FormData>({ file: null });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFormData({ file: event.target.files[0] });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("file", formData.file as Blob);

    // try {
    //   const response = await axios.post("/api/upload", formDataToSend);
    //   console.log(response);
    // } catch (error) {
    //   console.error(error);
    // }
    try {
      const response = await fetch("http://localhost:8081/api/images/upload", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Authorization: "Bearer " + auth.accessToken,
        },
      });
      if (response.ok) {
        const res = await response.text();
        console.log(res);
        console.log("immagine caricata");
      } else {
        console.log("errore");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {" "}
      <h2>Ciao mondo</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </>
  );
};
export default UploadForm;
