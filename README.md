INSTALL AND START

In directory of choice:
CLI: git clone https://github.com/willcommit/layout_saver_service.git
CLI: cd layout_saver_service
CLI: npm install
CLI: npm start

API URI

GET

Get all layouts
/layouts

Get layout name by id
/layout/{id}/name

Get all screens by layout id
/layout/{id}/screens

Get fullscreen mode based on specific screen on specific layout
/layout/{id}/screen/{id}/fullscreen

Get all decoders by layout id
/layout/{id}/decoders

Get decoder value based on specific decoder on specific layout
/layout/{id}/decoder/{id}/value

POST

Create or update layout with a name
/layout/{id}/name

Create or update screen with a fullscreen or not
/layout/{id}/screen/{id}/fullscreen

Create or update decoder with a value
/layout/{id}/decoder/{id}/value