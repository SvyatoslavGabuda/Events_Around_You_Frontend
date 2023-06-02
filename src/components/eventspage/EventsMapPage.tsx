import { Col, Container, Row } from "react-bootstrap";
import BingMapsReact from "../map/BingMapsReact";
import { Ievento } from "../../interfaces/luoghiDiInteresseInt";
import { useAppSelector } from "../../app/hooks";
import { useState, useEffect } from "react";
import { Ifetch } from "../../app/slices/eventsSlices/sponsoredEventsByCitta";

import EventCard from "../home/homeComponents/eventCard/EventCard";
import EventsPageSearchBar from "./evetnsPageComponents/eventsPageSearch/EventsPageSearchBar";

const EventsMapPage = () => {
  const evSerachGeneral: Ifetch = useAppSelector((state) => state.eventSearch.events);

  const status = useAppSelector((state) => state.eventSearch.status);

  const [pushPins, setPushPins] = useState<any[]>([]);
  const [mapReady, setMapReady] = useState(false);

  const [selectedEv, setSelectedEv] = useState<Ievento>(evSerachGeneral.content[0]);
  const addPushPin = () => {
    if (status === "idle" && evSerachGeneral.content.length > 0) {
      const pins: any = [];

      // console.log(evSerachGeneral.content);
      evSerachGeneral.content.forEach((ev) => {
        const pin = {
          center: {
            latitude: ev.lat,
            longitude: ev.lng,
          },
          options: {
            title: ev.title,
            // icon: type.icon,
          },
          infobox: {
            closeDelayTime: 100,
            description: ev.description,
            // htmlContent: `<div > <EventCard ev={selectedEv} /> </div>,`,
            // maxHeight: 5000,
            // maxWidth
            // showCloseButton
            // showPointer
            // title: e.target.metadata.title,
            title: ev.title,

            zIndex: 1000,
          },
        };
        pins.push(pin);
      });
      setPushPins(pins);
    }
  };

  useEffect(() => {
    // console.log(mapReady);
    if (mapReady) {
      addPushPin();
    }
  }, [mapReady, evSerachGeneral]);

  return (
    <>
      <Container>
        <Row>
          <EventsPageSearchBar size={100} sort={"startDate"} dir={"ASC"} page={0} />
        </Row>
      </Container>
      <Container className="eventsMapPageCont">
        {evSerachGeneral?.content?.length > 0 && (
          <Row>
            <Col className="mapCardsContainer mb-4 mb-md-0" xs={12} md={4} lg={3}>
              <EventCard ev={selectedEv} />
            </Col>
            <Col xs={12} md={8} lg={9}>
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
                    center: {
                      latitude: evSerachGeneral.content[0].lat,
                      longitude: evSerachGeneral.content[0].lng,
                    },
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
                  onChildClick={(e: any) => {
                    // console.log(e.target._options.title);
                    if (
                      evSerachGeneral.content !== undefined &&
                      e.target._options.title !== undefined
                    ) {
                      setSelectedEv(
                        evSerachGeneral.content.find(
                          (ev) => ev.title === e.target._options.title
                        ) || evSerachGeneral.content[0]
                      );
                    }
                  }}
                />
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};
export default EventsMapPage;
