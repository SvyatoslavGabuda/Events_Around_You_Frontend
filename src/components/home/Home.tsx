import { Container, Row } from "react-bootstrap";

import EventCard from "./homeComponents/eventCard/EventCard";
import SearchBarHome from "./homeComponents/serchbarHome/SearchBarHome";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { sponsoredEvFetch } from "../../app/slices/eventsSlices/sponsoredEvents";
import { Ievento } from "../../interfaces/luoghiDiInteresseInt";
import OurSponsor from "./homeComponents/ourSponsor/OurSponsor";

const Home = () => {
  const dispatch = useAppDispatch();
  const ev = useAppSelector((state) => state.sponsoredEv.events);
  const status = useAppSelector((state) => state.sponsoredEv.status);
  const [eventi, setEventi] = useState<Ievento[]>([]);
  useEffect(() => {
    //Carico gli Eventi Sponsorizzati
    dispatch(sponsoredEvFetch());
  }, []);
  useEffect(() => {
    //salvo gli eventi sponsorizzati solo se la fetch è andata a buon fine
    if (status === "idle") {
      setEventi(ev);
    }
  }, [status]);

  return (
    <>
      <Container>
        <Row>
          <SearchBarHome></SearchBarHome>
        </Row>
        <Row className="text-center py-3">
          <h2 className="homeTitles">Eventi che potrebbero interessarti</h2>
        </Row>
        <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 m-0 justify-content-center w-100">
          {eventi?.length > 0 ? (
            <>
              {eventi.map((eve: Ievento) => (
                <EventCard ev={eve} key={eve.idLuogo + "ev"} />
              ))}
            </>
          ) : (
            <>
              <p>non ci sono eventi da caricare</p>
            </>
          )}
        </Row>
        <Row className="text-center  py-3">
          <h2 className="homeTitles">Eventi che potrebbero interessarti</h2>
        </Row>
        <OurSponsor />
      </Container>
    </>
  );
};
export default Home;
