# Showcase

**Note: This is a work in progress. Please leave an issue with feedback & bug reports**

Showcase is a simple front-end component for displaying a bunch of images in the most optimal way for all devices. A slider on small width screens, a grid of images at biggers widths. Because why hide all your fancy images if you don't have to.

## Why?

Born out of frustration with Shopify themes. While making some small changes to an existing theme, I found that the product image gallery was pulling in 2 different slideshow libraries, both dependent on jQuery of course. Chuck in different sets of markup for desktop and mobile and hundreds of lines of CSS and you've got a payload that's about 250kb - just to display some images. 

Fuck that. 

I also couldn't find a really simple slider that just works, without a crazy ton of options and customization. So I built Showcase.

## What?

Here's the manifesto:

- Provide the best UX for showcasing something on any device
- Encourage best practice through minimum options
- Accessible
- Fast & small
- Support modern browsers only (last 2 versions). No support for IE

### No config

Design and UX decisions are based on user research, best practices and optimisations to converts users into customers. There are no configuration options on purpose. But you can hack at it as you wish of course.

### Accessible

The demo markup includes best practices for accessibility. You can also focus on the slideshow and tap left and right arrows to navigate through it.

### Fast & Small

Performance was a key driver for this project, so I'm keeping it purposefully small and include only the bare essentials

### Modern browsers

Works in all modern browsers and web views. Nobody uses IE anymore (https://caniuse.com/usage-table). 1.42% are on IE11 and Microsoft is trying hard to get people off it. So no polyfills, no hacks, just clean code.

### Design decisions

- No slide transitions, only animating opacity
