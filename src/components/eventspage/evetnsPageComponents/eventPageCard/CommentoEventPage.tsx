import { format } from "date-fns";
import { Icommento } from "../../../../interfaces/luoghiDiInteresseInt";
import useAuth from "../../../../auth/hooks/useAuth";
import { BiCommentEdit, BiCommentX } from "react-icons/bi";
import { useState } from "react";
import DeleteComModal from "./DeleteComModal";
import ModifyComModal from "./ModifyComModal";

interface commentProps {
  com: Icommento;
  updateF: any;
}
const CommentoEventPage = ({ com, updateF }: commentProps) => {
  const { auth } = useAuth();
  const [delModal, setDelModal] = useState(false);
  const [modModal, setModModal] = useState(false);
  return (
    <>
      <div className="commentoEventPage">
        <div className="commentoEventPageText">
          <h5>
            <img
              src={
                com.utente.urlImmagineProfilo === null
                  ? "/assets/profile.png"
                  : com.utente.urlImmagineProfilo
              }
              alt="immagine profilo"
            />{" "}
            {com.titoloCommento} <span>voto:</span> {com.raiting}
          </h5>
          <p>{com.contenuto}</p>
          <p>
            <span>{format(new Date(com.dataCommento), "d-MMM-y HH:mm")}</span> da{" "}
            {com.utente.username}
          </p>
        </div>
        {auth.username === com.utente.username && (
          <>
            <div className="commentoEventPageBtn">
              <button
                onClick={() => {
                  setDelModal(true);
                }}
              >
                <BiCommentX />
              </button>
              <DeleteComModal
                show={delModal}
                setShow={setDelModal}
                idCom={com.idCommento}
                updateF={() => updateF()}
              />
              <button
                onClick={() => {
                  setModModal(true);
                }}
              >
                <BiCommentEdit />
              </button>
              <ModifyComModal
                show={modModal}
                setShow={setModModal}
                com={com}
                updateF={() => updateF()}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default CommentoEventPage;
