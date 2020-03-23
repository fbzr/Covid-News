import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
    Graticule,
    ZoomableGroup
  } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import ReactTooltip from "react-tooltip";
import missingGeoMamesList from './missingGeoNamesList';
import { useEffect } from 'react';
// Material ui
import { IconButton, Paper, Hidden } from '@material-ui/core';
import { ZoomIn, ZoomOut } from '@material-ui/icons';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-50m.json';

const colorScale = value => {
  const color = scaleLinear()
  .domain([0, 100, 1000, 3000, 90000])
  .range([
    "#FFC0A8",
    "#FFAB8C",
    "#F26149",
    "#C73B29",
    "#9D0B0B"
  ]);
  return color(value);
}

const MapChart = () => {
  const data = useSelector(state => state.data.Countries);
  const [toolTipContent, setToolTipContent] = useState('');
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [toolTipContent]);

  function handleZoomIn() {
    if (zoom >= 4) return;
    setZoom(zoom * 2);
  }

  function handleZoomOut() {
    if (zoom <= 1) return;
    setZoom(zoom / 2);
  }

  function handleZoomEnd(position) {
    setZoom(position.zoom);
  }

  return (
    <div style={{position: 'relative'}}>
      <ComposableMap height={400}
          projectionConfig={{
              rotate: [-10, 0, 0],
              scale: 147
          }}
      >
      <ZoomableGroup zoom={zoom} onZoomEnd={handleZoomEnd} zoomSensitivity={1}>
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        {data && (
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                let d = data.find(countryData => countryData.Country === geo.properties.NAME);
                if(!d) {
                  d = data.find(countryData => countryData.Country === missingGeoMamesList[geo.properties.ISO_A3]);
                }
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={d ? colorScale(d.TotalConfirmed) : "lightgray"}
                    strokeWidth={0.3}
                    data-tip={d ? `${d.Country}: ${d.TotalConfirmed} cases` : ''}
                    onMouseEnter={() => {
                      d ? setToolTipContent(`${d.Country}: ${d.TotalConfirmed} cases`) : setToolTipContent("");
                    }}
                    onMouseLeave={() => {
                      setToolTipContent("");
                    }}
                    style={{
                      default: {
                        outline: "none"
                      },
                      hover: {
                        fill: d ? "#F53" : 'lightgray',
                        outline: "none",
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none"
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        )}
        </ZoomableGroup>
      </ComposableMap>
      <ReactTooltip place='bottom' />

      <Hidden mdDown>
        <Paper style={{display: 'flex', position: 'absolute', bottom: '1%', right: '2%'}}>
          <IconButton onClick={handleZoomIn}>
            <ZoomIn />
          </IconButton>
          <IconButton onClick={handleZoomOut}>
            <ZoomOut />
          </IconButton>
        </Paper>
      </Hidden>
      <Hidden lgUp>
        <div style={{display: 'flex', position: 'absolute', bottom: '1%', right: '2%'}}>
          <IconButton onClick={handleZoomIn}>
            <ZoomIn />
          </IconButton>
          <IconButton onClick={handleZoomOut}>
            <ZoomOut />
          </IconButton>
        </div>
      </Hidden>
    </div>
  )
};

export default MapChart
