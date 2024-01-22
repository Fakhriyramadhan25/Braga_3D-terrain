# Web-apps : 3d Terrain

## Description

It is a customize web application intended for 3d Terrain. The main tools to visualize this 3D terrain is Maplibre GL with Mapbox encoding configuration. In this documentation, it is divided into three folder, these are frontend, 3d tiles data, and the conversion from DEM geotif data to RGB terrain. As it is uses Mapbox encoding thus the data needed to follow several circumstances in order to be rendered. Here are the requirements of the data.

<br/>

## Data Requirements

1. Convert to RGB terrain (.png / .webp)
2. Comply with this equation (height = -10000 + ((R x 256 x 256 + G x 256 + B) x 0.1))
3. EPSG: 3857 with ellipsoid as the height reference

<br/>
For the detail instruction of each section, it is provided in the folders.
