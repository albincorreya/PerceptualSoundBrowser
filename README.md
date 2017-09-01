# Perceptual Sound Browser

![alt text](https://user-images.githubusercontent.com/14850001/29901219-07367002-8df7-11e7-9249-667ba78b495e.png)

Experimental prototype of a sound browser where you can browse a specific ambiguous sound effect collection (FS-AMB-SFX-700 dataset) by specifying perceptual acoustical qualities of sound such as brightness, depth, hardness and roughness.

This was developed as a part of my final thesis for Masters' in [Sound and Music Computing](https://www.upf.edu/en/smc/) at [Music Technology Group, Barcelona](https://www.upf.edu/web/mtg). You can find a detailed explanation of the project [here]().

This project uses an abstraction of [Freesound_Max-MSP_Modules](https://github.com/albincorreya/Freesound_Max-MSP_Modules) for accessing freesound API services. (Download the repo add it in your Max 7 search patch for using it with other projects)

For timbral feature extraction,this project uses the [timbral sound models](https://github.com/AudioCommons/timbral_models) developed by [Andy Pearce](https://www.surrey.ac.uk/DMM/People/andy_pearce/) as a part of [AudioCommons](http://www.audiocommons.org/) initiative. And, this has been done offline using an [batch extraction python script](https://github.com/albincorreya/smcmasterthesis2017/blob/master/multiclass_timbralfeature_extractor.py)


## Requirements

* You need to have a installed version of Cycling74 [Max 7](https://cycling74.com/products/max) (7.3.1 atleast) in order to use the system.
   You can download the latest version from [here](https://cycling74.com/downloads)


## Setup

1. Download or clone the [repo](https://github.com/albincorreya/PerceptualSoundBrowser) to your local disk

2. Update the api_key.json file inside the ./data folder with your freesound api credentials.
   In case, you don't have any, you can apply for a one at http://freesound.org/apiv2/apply/
   (You need to have a registered freesound.org account in order to apply for api credentials)

3. Open the "PerceptualSoundBrowser.maxpat" file in the home folder and enjoy browsing. In case of doubts, have a look at the following [video](https://vimeo.com/231350962) for understanding the workflow.


## Builds

For [Mac OSX x64bit](https://github.com/albincorreya/PerceptualSoundBrowser/releases)

You might have to install [Max runtime](https://cycling74.com/downloads/older)

PS : Tested only with Mac OSX platform (Yosemite 10.10.5), should be working with other versions as well. For windows, you have to build the binary from source using Max.


## Acknowledgements

Thanks to [Frederic Font](http://www.dtic.upf.edu/~ffont/) and [Xavier Favory](https://www.linkedin.com/in/xavier-favory-6a3387ab/?ppe=1) for their valuable suggestions.


## Authors

Albin Andrew Correya

albin.a.correya@gmail.com


## References

[1]. Pearce, A , Brookes, T and Mason, R. First prototype of timbral characterisation tools for semantically annotating non-musical content (2017), Audiocommons.http://www.audiocommons.org/assets/files/AC-WP5-SURREY-D5.2%20First%20prototype%20of%20timbral%20characterisation%20tools%20for%20semantically%20annotating%20non-musical%20content.pdf
