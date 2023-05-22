import { format } from "date-fns";
import { Icommento } from "../../../interfaces/luoghiDiInteresseInt";

interface commentProps {
  com: Icommento;
}
const CommentoEventPage = ({ com }: commentProps) => {
  return (
    <>
      <div className="commentoEventPage">
        <h5>
          commento: {com.titoloCommento} raiting: {com.raiting}
        </h5>
        <p>
          <span>{format(new Date(com.dataCommento), "d-MMM-y HH:mm")}</span> da{" "}
          {com.utente.username}
        </p>
        <p>{com.contenuto}</p>
      </div>
    </>
  );
};
export default CommentoEventPage;
