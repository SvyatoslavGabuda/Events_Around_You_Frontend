import React, { useEffect, useRef, useCallback } from "react";
declare global {
  interface Window {
    Microsoft: any;
  }
}
interface Props {
  bingMapsKey: string;
  height?: string;
  mapOptions?: any;
  onMapReady?: (map: any) => void;
  pushPins?: any[];
  pushPinsWithInfoboxes?: any[];
  viewOptions?: any;
  width?: string;
}

export default function BingMapsReact({
  bingMapsKey,
  height = "100%",
  mapOptions = null,
  onMapReady,
  pushPins,
  pushPinsWithInfoboxes,
  viewOptions = null,
  width = "100%",
}: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);

  function removePushpins(map: any, Maps: any) {
    for (let i = map.entities.getLength() - 1; i >= 0; i--) {
      const pushpin = map.entities.get(i);
      if (pushpin instanceof Maps.Pushpin) {
        map.entities.removeAt(i);
      }
    }
  }

  const addPushpinsWithInfoboxes = useCallback(
    (pushPinsToAdd: any[], infobox: any, map: any, Maps: any) => {
      removePushpins(map, Maps);
      pushPinsToAdd.forEach((pushPin) => {
        if (pushPin === null) {
          return;
        }
        const newPin = new Maps.Pushpin(pushPin.center, pushPin.options);
        newPin.metadata = {
          ...pushPin.options,
        };
        Maps.Events.addHandler(newPin, "mouseover", (e: any) => {
          infobox.setOptions({
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            htmlContent: pushPin.infobox?.infoboxHtml || pushPin.infoboxHtml,
            location: newPin.getLocation(),
            visible: true,
            ...pushPin.infobox,
          });
        });
        Maps.Events.addHandler(newPin, "mouseout", (e: any) => {
          infobox.setOptions({
            visible: false,
          });
        });
        map.entities.push(newPin);
      });
    },
    []
  );

  const addPushpins = useCallback((pushPinsToAdd: any[], map: any, Maps: any) => {
    removePushpins(map, Maps);
    pushPinsToAdd.forEach((pushPin) => {
      if (pushPin === null) {
        return;
      }
      const newPin = new Maps.Pushpin(pushPin.center, pushPin.options);
      map.entities.push(newPin);
    });
  }, []);

  function setMapViewOptions(map: any, viewOptions: any, Maps: any) {
    const options = { ...viewOptions };
    if (viewOptions.mapTypeId) {
      options.mapTypeId = Maps.MapTypeId[viewOptions.mapTypeId];
    }
    if (viewOptions.hideRoadLabels) {
      options.labelOverlay = Maps.LabelOverlay.hidden;
    }
    map.setView(options);
  }

  function setMapOptions(map: any, mapOptions: any, Maps: any) {
    const options = { ...mapOptions };

    if (mapOptions.navigationBarMode) {
      options.navigationBarMode = Maps.NavigationBarMode[mapOptions.navigationBarMode];
    }
    if (mapOptions.navigationBarOrientation) {
      options.navigationBarOrientation =
        Maps.NavigationBarOrientation[mapOptions.navigationBarOrientation];
    }
    if (mapOptions.supportedMapTypes) {
      options.supportedMapTypes = mapOptions.supportedMapTypes.map(
        (type: any) => Maps.MapTypeId[type]
      );
    }
    map.setOptions(options);
  }

  const makeMap = useCallback(() => {
    const makeMapInternal = () => {
      const { Maps } = window.Microsoft;

      if (!map.current) {
        map.current = new Maps.Map(mapContainer.current, {
          credentials: bingMapsKey,
        });
      }

      if (viewOptions) {
        setMapViewOptions(map.current, viewOptions, Maps);
      }

      if (mapOptions) {
        setMapOptions(map.current, mapOptions, Maps);
      }

      if (pushPins) {
        addPushpins(pushPins, map.current, Maps);
      }

      if (pushPinsWithInfoboxes) {
        const infobox = new Maps.Infobox(map.current.getCenter(), {
          visible: false,
        });
        infobox.setMap(map.current);
        addPushpinsWithInfoboxes(pushPinsWithInfoboxes, infobox, map.current, Maps);
      }

      onMapReady && onMapReady({ map });
    };

    if (window.Microsoft && window.Microsoft.Maps) {
      makeMapInternal();
    } else {
      const scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "text/javascript");
      scriptTag.setAttribute(
        "src",
        `https://www.bing.com/api/maps/mapcontrol?callback=makeMapInternal`
      );
      scriptTag.async = true;
      scriptTag.defer = true;
      document.body.appendChild(scriptTag);
    }
  }, [
    addPushpinsWithInfoboxes,
    addPushpins,
    bingMapsKey,
    mapOptions,
    onMapReady,
    pushPins,
    pushPinsWithInfoboxes,
    viewOptions,
  ]);

  useEffect(() => {
    makeMap();
  }, [makeMap]);

  return <div ref={mapContainer} style={{ height: height, width: width }}></div>;
}

BingMapsReact.defaultProps = {
  bingMapsKey: "",
  mapOptions: null,
  height: "100%",
  onMapReady: null,
  pushPins: null,
  pushPinsWithInfoboxes: null,
  viewOptions: null,
  width: "100%",
};
