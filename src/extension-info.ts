export const PACKAGE: Readonly<any> = require('../package.json');
export const PUBLISHER: String = PACKAGE.publisher;
export const NAME: String = PACKAGE.name;
export const EXTENSION_ID = `${PACKAGE.publisher}.${PACKAGE.name}`;