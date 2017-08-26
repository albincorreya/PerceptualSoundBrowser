# Perceptual Sound Browser

Experimental prototype of a sound browser where you can browse sound effect collections by specifying perceptual acoustical qualities of sound such as brightness, depth, hardness and roughness.

This project was developed as a part of my thesis for Masters' in [Sound and Music Computing](https://www.upf.edu/en/smc/) at [Music Technology Group, Barcelona](https://www.upf.edu/web/mtg). You can find a detailed explanation of the project here.

This project uses the [timbral sound models](https://github.com/AudioCommons/timbral_models) developed by [Andy Pearce](https://www.surrey.ac.uk/DMM/People/andy_pearce/) as a part of [AudioCommons](http://www.audiocommons.org/) initiative.


# Setup

1. You need to have a installed version of Cycling74 [Max 7](https://cycling74.com/products/max) (7.3.1 atleast) in order to use the system.
   You can download the latest version from [here](https://cycling74.com/downloads)

2. Download or clone the [repo](https://github.com/albincorreya/PerceptualSoundBrowser) to your local disk

3. Update the api_key.json file inside the ./data folder with your freesound api credentials.
   In case, you don't have any, you can apply for a one at http://freesound.org/apiv2/apply/
   (You need to have a registered freesound.org account in order to apply for api credentials)

4. Open the "PerceptualSoundBrowser.maxpat" file in the home folder and 

# Acknowledgements

Thanks to [Frederic Font](http://www.dtic.upf.edu/~ffont/) and [Xavier Favory](https://www.linkedin.com/in/xavier-favory-6a3387ab/?ppe=1) for their valuable suggestions.

# References

[1]. Pearce, A , Brookes, T and Mason, R. Timbral attributes for sound effect library searching, A. E. S (2017). https://doi.org/10.5281/zen-odo.167392.2.2.
[2]. Pearce, A , Brookes, T and Mason, R. First prototype of timbral characterisation tools for semantically annotating non-musical content (2017), Audiocommons.http://www.audiocommons.org/assets/files/AC-WP5-SURREY-D5.2%20First%20prototype%20of%20timbral%20characterisation%20tools%20for%20semantically%20annotating%20non-musical%20content.pdf
