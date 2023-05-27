import { Container, Row } from "react-bootstrap";
import BingMapsReact from "../map/BingMapsReact";
import { Ievento } from "../../interfaces/luoghiDiInteresseInt";
import { useAppSelector } from "../../app/hooks";
import { useState, useEffect } from "react";
import { Ifetch } from "../../app/slices/eventsSlices/sponsoredEventsByCitta";

const EventsMapPage = () => {
  const evSerachGeneral: Ifetch = useAppSelector((state) => state.eventSearch.events);

  const status = useAppSelector((state) => state.eventSearch.status);
  const [ev, setEv] = useState<Ievento[]>([]);
  const [pushPins, setPushPins] = useState<any[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const addPushPin = () => {
    if (status === "idle" && evSerachGeneral.content.length > 0) {
      const pins: any = [];

      console.log(evSerachGeneral.content);
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
        pins.push(pin);
      });
      setPushPins(pins);
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
        {evSerachGeneral?.content?.length > 0 && (
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
              />
            </div>
          </Row>
        )}
      </Container>
    </>
  );
};
export default EventsMapPage;
