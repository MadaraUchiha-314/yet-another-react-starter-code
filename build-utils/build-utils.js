/*
* Utilities to help in the build process.
* Let's see how this goes.
*/

/*
* Used to get the entry points.
*/
function getEntryPoints(widgetConfig) {
    const entryPoints = [];
    for (const key in widgetConfig.widgets) {
        if (widgetConfig.widgets.hasOwnProperty(key)) {
            entryPoints.push(widgetConfig.widgets[key].path)
        }
    }
    return entryPoints;
}

/*
* All the functions exported from here.
* Weird that webpack itself doesn't support export and impor syntax
*/
module.exports = {
    getEntryPoints: getEntryPoints
};
