# Steam scripts - Various scripts related to Steam.

## dig-store-enhancer.user.js

![Screenshot](http://i.imgur.com/DrdGLQM.png)

Like for any userscripts, you need [TamperMonkey for Chrome/Opera/Edge/Safari or GreaseMonkey for Firefox](https://github.com/OpenUserJs/OpenUserJS.org/wiki/Userscript-beginners-HOWTO#how-do-i-get-going).

[dig-store-enhancer.user.js](https://raw.githubusercontent.com/Omicron666/Steam/master/dig-store-enhancer.user.js)(click to install): Add some functionalities to Steam key store http://www.dailyindiegame.com 

### Changelog

- 0.1
 - Dynamically hide/display games without Volume discounts.

- 0.2.0
  - All pages with game listings know include full Steam prices for reference
  - Games without Steam price will link to related Steam community hub
  - Ability to dynamically sort by DIG price, Steam price, etc.
 
- 0.3.0
  - Redirect all pages to their secured version (https)
  
- 0.4.0
  - Improved performance for Volume discount filter
  - Added Steam review score (includes all purchase types) with sorting on main DIG store page
 
### Known issues :
- Steam store API returns price of bundle if it is discounted cheaper than the game itself. Possible fix. Low priority bug.
- No price returned for unique bundle containing single game which don't have a price itself. Possible fix. Low priority bug.

### Coming :
- Adding Steam review score on other pages
- Dynamically hide/display games without trading cards or VR.
