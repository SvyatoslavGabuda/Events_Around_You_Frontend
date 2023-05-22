import { useEffect, useState } from "react";
import useAuth from "../../../auth/hooks/useAuth";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { json } from "stream/consumers";
import { Button, Modal } from "react-bootstrap";
import { userProfileFetch } from "../../../app/slices/userProfileSlice";
import { IuserProfile } from "../../../interfaces/luoghiDiInteresseInt";

interface FormData {
  file: File | null;
}
interface modalProps {
  show: boolean;
  setShow: any;
}
const UploadUserProfileImage = ({ show, setShow }: modalProps) => {
  const { auth }: any = useAuth();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({ file: null });
  const userProfile: IuserProfile = useAppSelector((state) => state.userProfile.userLogged);
  const handleClose = () => setShow(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFormData({ file: event.target.files[0] });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("file", formData.file as Blob);
    console.log("Bearer " + auth.accessToken);
    try {
      const response = await fetch(
        "http://localhost:8081/user/uploadimage/" + userProfile.idUtente,
        {
          method: "PUT",
          body: formDataToSend,
          headers: {
            Authorization: "Bearer " + auth.accessToken,
          },
        }
      );
      if (response.ok) {
        console.log("immagine caricata");
        dispatch(userProfileFetch({ username: userProfile.username, token: auth.accessToken }));
      } else {
        console.log("errore");
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica immagine profilo</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <input type="file" onChange={handleChange} />
            {/* <button type="submit">Upload</button> */}
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              onClick={() => {
                handleClose();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
export default UploadUserProfileImage;
