import { useParams } from "react-router-dom";
import { Ievento } from "../../interfaces/luoghiDiInteresseInt";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { format } from "date-fns";
import BingMapsReact from "../map/BingMapsReact";
import "./eventPage.scss";
import EventPageCard from "./evetnsPageComponents/eventPageCard/EventPageCard";
import { getEventByID } from "../../app/slices/eventsSlices/eventByIdSlice";

const EventsDetailsPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const event_Id = params.id;
  const evento: Ievento = useAppSelector((state) => state.eventByID.event);

  const status = useAppSelector((state) => state.eventByID.status);
  const [ev, setEv] = useState<Ievento>();
  const [pushPins, setPushPins] = useState<any[]>([]);
  const [mapReady, setMapReady] = useState(false);
  useEffect(() => {
    if (status === "idle") {
      setEv(evento);
    }
  }, [evento]);
  const addPushPin = () => {
    if (ev?.commenti) {
      let img = new Image();
      img.src = ev?.urlImage;
      let c = document.createElement("canvas");
      var context = c.getContext("2d");
      c.width = 20;
      c.height = 20;
      if (context) {
        //Draw a colored circle behind the pin
        context.beginPath();
        context.arc(13, 13, 11, 0, 2 * Math.PI, false);
        context.fillStyle = "red";
        context.fill();

        //Draw the pushpin icon
        context.drawImage(img, 0, 0);
      }

      const pin = {
        center: {
          latitude: ev.lat,
          longitude: ev.lng,
        },
        options: {
          title: ev.title,
          // icon: c.toDataURL(),
        },
        infobox: {
          closeDelayTime: 100,
          description: ev.description,
          // htmlContent: `<div>${resource.name}</div>,`,
          // maxHeight: 5000,
          // maxWidth
          // showCloseButton
          // showPointer
          // title: e.target.metadata.title,
          title: ev.subTitle,
          zIndex: 1000,
        },
      };
      setPushPins([pin]);
    }
  };

  useEffect(() => {
    console.log(mapReady);
    if (mapReady) {
      addPushPin();
    }
  }, [mapReady]);
  return (
    <>
      <Container>
        {ev?.creatore ? (
          <>
            {ev?.creatore && (
              <EventPageCard
                ev={ev}
                // updateF={() => {}}
                updateF={() => {
                  dispatch(getEventByID({ id_eve: ev.idLuogo }));
                }}
              />
            )}
            <Row style={{ marginBottom: "100px" }}>
              {" "}
              <div className="map__container">
                <BingMapsReact
                  onMapReady={({ map }: any) => {
                    setMapReady(true);
                  }}
                  height="500px"
                  bingMapsKey={process.env.REACT_APP_BINGMAPS_KEY}
                  // pushPins={pushPins}
                  pushPinsWithInfoboxes={pushPins}
                  mapOptions={{
                    enableClickableLogo: false,
                    navigationBarMode: "square",
                    enableHighDpi: true,
                    showTermsLink: false,
                  }}
                  viewOptions={{
                    center: { latitude: ev.lat, longitude: ev.lng },
                    zoom: 12,
                    customMapStyle: {
                      elements: {
                        area: { fillColor: "#b6e591" },
                        water: { fillColor: "#75cff0" },
                        tollRoad: { fillColor: "#a964f4", strokeColor: "#a964f4" },
                        arterialRoad: { fillColor: "#ffffff", strokeColor: "#d7dae7" },
                        road: { fillColor: "#ffa35a", strokeColor: "#ff9c4f" },
                        street: { fillColor: "#ffffff", strokeColor: "#ffffff" },
                        transit: { fillColor: "#000000" },
                      },
                      settings: {
                        landColor: "#efe9e1",
                      },
                    },
                  }}
                />
              </div>
            </Row>
          </>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};
export default EventsDetailsPage;
