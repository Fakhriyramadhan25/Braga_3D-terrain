// React dependencies 
import { useState, useRef, useEffect, useCallback } from 'react';

// deckgl and maplibre 3d dependency 
import { TbLayersIntersect2 } from "react-icons/tb";
import maplibregl from 'maplibre-gl';


// css for maplibre 
import 'maplibre-gl/dist/maplibre-gl.css';
import './Map.css'



function Map() {
 
  // parameter for maplibre visualization 
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(107.61867533366754);
  const [lat] = useState(-6.900867354606107);
  const [zoom] = useState(10);
  // coordinate longitude and latitude consecutively
  // Munich coordinate 11.39085, 47.27574
  // Jakarta Coordinate 106.82733350927734, -6.173638612081088
 // Bandung Coordinate -6.900867354606107, 107.61867533366754
//  trial coordinates -122.44166667, 37.79083333

  const apiKey = "F21nBwBSvcIcqgFbtVNQ";
  
  const mapStyle = {
    version: 8,
    sources: {
        osm: {
            type: 'raster',
            tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; OpenStreetMap Contributors',
            maxzoom: 19
        },
              // Use a different source for terrain and hillshade layers, to improve render quality
              terrainSource: {
                type: 'raster-dem',
                // url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
                tiles: ['http://localhost:5173/BDGtiles/{z}/{x}/{y}.png'],
                tileSize: 256,
                bounds: [107.5, -7, 107.75, -6.75]

                // encoding: "custom",
                // baseShift: 10000,
                // redFactor: 0,
                // greenFactor:1,
                // blueFactor:1
                // scheme: "xyz"
            },
            hillshadeSource: {
                type: 'raster-dem',
                // url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
                tiles: ['http://localhost:5173/BDGtiles/{z}/{x}/{y}.png'],
                tileSize: 256,
            }
        },
    layers: [
        {
            id: 'osm',
            type: 'raster',
            source: 'osm'
        },
        {
            id: 'hills',
            type: 'hillshade',
            source: 'hillshadeSource',
            layout: {visibility: 'visible'},
            paint: {'hillshade-shadow-color': '#473B24'}
        }
      //   {
      //     id: 'terrainSource',
      //     type: 'raster',
      //     source: 'terrainSource'
      // },
    ],
    terrain: {
        source: 'terrainSource',
        exaggeration: 1
    }
};


  useEffect(() => {
    // declaring map using useref thus it doesnt reload when change causing by useeffect 
    if (map.current) return; // stops map from intializing more than once
  
    // declaring map 
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: [lng,lat],
      zoom: zoom,
      pitch: 52,
      bearing: -23.6,
      antialias: true,
      hash: true,
      maxZoom: 18,
      maxPitch: 85
    });

    // adding a navigation control 
    map.current.addControl(
        new maplibregl.NavigationControl({
            visualizePitch: true,
            showZoom: true,
            showCompass: true
        }), 'top-right'
    );

     // adding a terrain control
    map.current.addControl(
        new maplibregl.TerrainControl({
            source: 'terrainSource',
            exaggeration: 1
        })
        , 'top-right'
    );


    // wait for map to be ready
  map.current.on('load', () => {
  // insert the layer into the map using addcontrol 

});

  }, [zoom, lng, lat]);

  const [layerActive, setLayerActive] = useState(true);

  // event handling for changing basemap
  const handleActivate = useCallback(()=>{
    setLayerActive(!layerActive)
    if(layerActive === false){
      map.current.setStyle(`https://api.maptiler.com/maps/basic-v2/style.json?key=${apiKey}`);
    }
    else if(layerActive === true){
      map.current.setStyle(`https://api.maptiler.com/maps/hybrid/style.json?key=${apiKey}`)
    }
  },[layerActive])

  return (
    <>

    {/* basemap switcher button  */}
    <div className='absolute top-20 left-3 p-2 rounded-lg bg-white z-10 hover:bg-sky-300' onClick={handleActivate}>
      <TbLayersIntersect2  size={24}/>
    </div>

    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
    </>
  )
}

export default Map