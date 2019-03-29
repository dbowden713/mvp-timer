# MVP Timer

Timer list to track kills and respawns of MVPs in the MMORPG Ragnarok Online. Built using React, Electron, and PouchDB.

### Installation

This repository only contains the source code for the project.

* Install dependencies: `npm install` or `yarn install`
* Run the program: `electron .`
* The source code can also be added to a [prebuilt electron binary](https://github.com/electron/electron/releases) to run as a standalone program.

### Usage

Using the program is fairly straightforward. The main screen consists of a list of active timers. If no timers exist, a new one can be created with the **New Timer** button.

#### Add a timer

* Click the new timer button.
* Search for an MVP by name using the search bar.
* Select the map.
* Click map to set kill position.
* Enter kill time in 24hr format. Press enter to use current time.

#### Edit a timer

* Clicking on the map will place a new marker.

#### Delete a timer

* Click the red trash icon ![alt text](https://raw.githubusercontent.com/dbowden713/mvp-timer/master/src/img/delete.png 'Trash icon') to delete a timer.
* Click the _Clear All_ to remove all timers.
* Timers will also auto-delete after the respawn timer limit.

### Credits

[dbowden713](https://github.com/dbowden713)
