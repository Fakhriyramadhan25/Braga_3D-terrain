# Data preparation : 3D Terrain

## Description

RGB terrain is the format file for raster-dem source. DEM data configuration needed to be converted complying the given equation. The algorithm is already provided in the RGBTerrain folder but there are some environment in order to run the code. It is explained as follows:

1. Create conda environment (Conda create -n gdaltiles python=3.11.0)
2. Activate the conda environment (conda activate gdaltiles)
3. Install gdal using conda forge (conda install -c conda-forge gdal)
4. Install all other dependencies list in the requirement.txt files (pip install -r requirement.txt)
5. After the environment ready the main command to convert is ready to use
