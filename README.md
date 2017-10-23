# SpireDataPull
Node.js Data pull for Spire Device

This is a Node.js implementation to help pull certain data attributes from the spire API and appends it into a CSV, after iterating through the JSON recieved from the Spire API.

As of the writing of this readme, I am having a lot of trouble accessing: https://developer.spire.io/ I do know they went through some drastic API changes so it is possible that they are updating their Servers again.

In order to use this Node.js Data pull, install the request package from npm: https://www.npmjs.com/package/request 

```npm install request``` 

and it should go successfully through. You could choose to also read from a CSV and have it write out to a CSV as normal, but I elected to not include that in the code for simplicity of use for the initial Node.js script.

This falls under the GNU General Public License
