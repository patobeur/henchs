# 💊 RoadMap

## 1 - Create and display a map
 - [x] (main code stored in core/js/game.js)
   - [x] (Map updated every x secondes)
 - [x] (map datas stored in core/datas/allMaps.js)
 - [x] (managed by class core/js/MapsManager.js )

## 2 - 🕹️ Add a keyboard manager (QZSD ans arrows)
 - [x] (press and release key re stored in core/js/KeyboardControls.js)

	## 2.2 - Add a touch screen manager (???)
 - [ ] 🥺 

## 3 - Add a Visual that can be moved with keyboard manager datas
 - [x] (it work ;))
 - [x] (ghostdiv added on the map ;))
 - [x] this will be used to test colissions with object bouncing box
 - [x] this will be used to move player visual if no colision is detected
 - [ ] ghostdiv can be hidden under the map if need but it must in the map element

## 4 - Add wall to the map !
 - [x] Four walls spawn add top,left,bottom and right sides of the map
 - [ ] if the map is rotated the function broke...
 - [x] (managed by setMapWalls() in MapsManager.js )

## 5 - Add fixed squared object to the map !
 - [x] (object datas added in core/datas/allMaps.js)
 - [x] (object can be rotated)
 - [x] (added to setMapWalls() in MapsManager.js )




# 💊 TO DO

## X - Debug 

 - [ ] screen resize broke ux 
 - [ ] collision not working 
 - [ ] what else
 - [ ] 
## X - Adds 

 - [ ] 🔋 add statistics 
 - [ ] 📖 add rules 
 - [ ] ❤️ add life ;)
