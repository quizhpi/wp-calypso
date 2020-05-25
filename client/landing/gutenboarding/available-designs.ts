/**
 * External dependencies
 */
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import { isEnabled } from '../../config';
import type { Design } from './stores/onboard/types';

const availableDesigns: Readonly< AvailableDesigns > = {
	featured: [
		{
			title: 'Cassel',
			slug: 'cassel',
			template: 'cassel',
			theme: 'mayland',
			src: 'https://public-api.wordpress.com/rest/v1/template/demo/mayland/cassel/',
			fonts: {
				headings: 'Playfair Display',
				base: 'Fira Sans',
			},
			categories: [ 'featured', 'blog' ],
			is_premium: false,
		},
		{
			title: 'Edison',
			slug: 'edison',
			template: 'edison',
			theme: 'stratford',
			src: 'https://public-api.wordpress.com/rest/v1/template/demo/stratford/edison/',
			fonts: {
				headings: 'Chivo',
				base: 'Open Sans',
			},
			categories: [ 'featured', 'blog' ],
			is_premium: true,
		},
		{
			title: 'Vesta',
			slug: 'vesta',
			template: 'vesta',
			theme: 'mayland',
			src: 'https://public-api.wordpress.com/rest/v1/template/demo/mayland/vesta/',
			fonts: {
				headings: 'Cabin',
				base: 'Raleway',
			},
			categories: [ 'featured', 'portfolio' ],
			is_premium: false,
		},
		{
			title: 'Doyle',
			slug: 'doyle',
			template: 'doyle',
			theme: 'alves',
			src: 'https://public-api.wordpress.com/rest/v1/template/demo/alves/doyle/',
			fonts: {
				headings: 'Playfair Display',
				base: 'Fira Sans',
			},
			categories: [ 'featured', 'business' ],
			is_premium: true,
		},
		{
			title: 'Bowen',
			slug: 'bowen',
			template: 'bowen',
			theme: 'coutoire',
			src: 'https://public-api.wordpress.com/rest/v1/template/demo/coutoire/bowen/',
			fonts: {
				headings: 'Playfair Display',
				base: 'Fira Sans',
			},
			categories: [ 'featured', 'blog' ],
			is_premium: false,
		},
		{
			title: 'Easley',
			slug: 'easley',
			template: 'easley',
			theme: 'maywood',
			src: 'https://public-api.wordpress.com/rest/v1/template/demo/maywood/easley/',
			fonts: {
				headings: 'Space Mono',
				base: 'Roboto',
			},
			categories: [ 'featured', 'portfolio' ],
			is_premium: false,
		},
		{
			title: 'Camdem',
			slug: 'Camdem',
			template: 'camdem',
			theme: 'maywood',
			src: 'https://public-api.wordpress.com/rest/v1/template/demo/maywood/camdem/',
			fonts: {
				headings: 'Space Mono',
				base: 'Roboto',
			},
			categories: [ 'featured', 'portfolio' ],
			is_premium: false,
		},
		{
			title: 'Reynolds',
			slug: 'reynolds',
			template: 'reynolds',
			theme: 'rockfield',
			src: 'https://public-api.wordpress.com/rest/v1/template/demo/rockfield/reynolds/',
			fonts: {
				headings: 'Playfair Display',
				base: 'Fira Sans',
			},
			categories: [ 'featured', 'portfolio' ],
			is_premium: false,
		},
		{
			title: 'Overton',
			slug: 'overton',
			template: 'overton',
			theme: 'alves',
			src: 'https://public-api.wordpress.com/rest/v1/template/demo/alves/overton/',
			fonts: {
				headings: 'Cabin',
				base: 'Raleway',
			},
			categories: [ 'featured', 'business' ],
			is_premium: false,
		},
		{
			title: 'Brice',
			slug: 'brice',
			template: 'brice',
			theme: 'mayland',
			src: 'https://public-api.wordpress.com/rest/v1/template/demo/mayland/brice/',
			fonts: {
				headings: 'Playfair Display',
				base: 'Fira Sans',
			},
			categories: [ 'featured', 'charity', 'non-profit' ],
			is_premium: false,
		},
		{
			title: 'Barnsbury',
			slug: 'barnsbury',
			template: 'barnsbury',
			theme: 'barnsbury',
			src: 'https://public-api.wordpress.com/rest/v1/template/demo/barnsbury/barnsbury/',
			fonts: {
				headings: 'Rubik',
				base: 'Rubik',
			},
			categories: [ 'featured', 'business' ],
			is_premium: false,
		},
		{
			title: 'Twenty Twenty',
			slug: 'twentytwenty',
			template: 'twentytwenty',
			theme: 'twentytwenty',
			src: 'https://public-api.wordpress.com/rest/v1/template/demo/twentytwenty/twentytwenty/',
			fonts: {
				headings: 'Chivo',
				base: 'Open Sans',
			},
			categories: [ 'featured', 'portfolio' ],
			is_premium: false,
		},
		{
			title: 'Alves',
			slug: 'alves',
			template: 'alves',
			theme: 'alves',
			src: 'https://public-api.wordpress.com/rest/v1/template/demo/alves/alves/',
			fonts: {
				headings: 'Lora',
				base: 'Karla',
			},
			categories: [ 'featured', 'non-profit', 'charity' ],
			is_premium: false,
		},
		{
			title: 'Mayland',
			slug: 'mayland',
			template: 'mayland',
			theme: 'mayland',
			src: 'https://public-api.wordpress.com/rest/v1/template/demo/mayland/mayland/',
			fonts: {
				headings: 'Raleway',
				base: 'Cabin',
			},
			categories: [ 'featured', 'portfolio' ],
			is_premium: false,
		},
		{
			title: 'Rivington',
			slug: 'rivington',
			template: 'rivington',
			theme: 'rivington',
			src: 'https://public-api.wordpress.com/rest/v1/template/demo/rivington/rivington/',
			fonts: {
				headings: 'Poppins',
				base: 'Poppins',
			},
			categories: [ 'featured', 'real estate listing' ],
			is_premium: false,
		},
		{
			title: 'Maywood',
			slug: 'maywood',
			template: 'maywood',
			theme: 'maywood',
			src: 'https://public-api.wordpress.com/rest/v1/template/demo/maywood/maywood/',
			fonts: {
				headings: 'Playfair Display',
				base: 'Fira Sans',
			},
			categories: [ 'featured', 'restaurant, small business' ],
			is_premium: false,
		},
		{
			title: 'Balasana',
			slug: 'balasana',
			template: 'balasana',
			theme: 'balasana',
			src: 'https://public-api.wordpress.com/rest/v1/template/demo/balasana/balasana/',
			fonts: {
				headings: 'Roboto Condensed',
				base: 'Roboto',
			},
			categories: [ 'featured', 'restaurant, small business' ],
			is_premium: false,
		},
		{
			title: 'Stratford',
			slug: 'stratford',
			template: 'stratford',
			theme: 'stratford',
			src: 'https://public-api.wordpress.com/rest/v1/template/demo/stratford/stratford/',
			fonts: {
				headings: 'Poppins',
				base: 'Lato',
			},
			categories: [ 'featured', 'school' ],
			is_premium: false,
		},
		{
			title: 'Rockfield',
			slug: 'rockfield',
			template: 'rockfield',
			theme: 'rockfield',
			src: 'https://public-api.wordpress.com/rest/v1/template/demo/rockfield/rockfield/',
			fonts: {
				headings: 'Lora',
				base: 'Lora',
			},
			categories: [ 'featured', 'restaurant', 'small business' ],
			is_premium: false,
		},
		{
			title: 'Coutoire',
			slug: 'coutoire',
			template: 'coutoire',
			theme: 'coutoire',
			src: 'https://public-api.wordpress.com/rest/v1/template/demo/coutoire/coutoire/',
			fonts: {
				headings: 'EB Garamond',
				base: 'Work Sans',
			},
			categories: [ 'featured', 'portfolio' ],
			is_premium: false,
		},
		{
			title: 'Leven',
			slug: 'leven',
			template: 'leven',
			theme: 'leven',
			src: 'https://public-api.wordpress.com/rest/v1/template/demo/leven/leven/',
			fonts: {
				headings: 'Segoe UI',
				base: 'Crimson Text',
			},
			categories: [ 'featured', 'portfolio', 'small business' ],
			is_premium: false,
		},
		{
			title: 'Gibbs',
			slug: 'gibbs',
			template: 'gibbs',
			theme: 'rockfield',
			src: 'https://public-api.wordpress.com/rest/v1/template/demo/rockfield/gibbs/',
			fonts: {
				headings: 'Fira Sans',
				base: 'Fira Sans',
			},
			categories: [ 'featured', 'restaurant', 'small business' ],
			is_premium: false,
		},
	],
};

export default availableDesigns;
interface AvailableDesigns {
	featured: Design[];
}

export const getDesignImageUrl = ( design: Design ) => {
	// We temporarily show pre-generated screenshots until we can generate tall versions dynamically using mshots.
	// See `bin/generate-gutenboarding-design-thumbnails.js` for generating screenshots.
	// https://github.com/Automattic/mShots/issues/16
	// https://github.com/Automattic/wp-calypso/issues/40564
	if ( ! isEnabled( 'gutenboarding/mshot-preview' ) ) {
		return `/calypso/page-templates/design-screenshots/${ design.slug }_${ design.template }_${ design.theme }.jpg`;
	}

	const mshotsUrl = 'https://s.wordpress.com/mshots/v1/';
	const previewUrl = addQueryArgs( design.src, {
		font_headings: design.fonts.headings,
		font_base: design.fonts.base,
	} );
	return mshotsUrl + encodeURIComponent( previewUrl );
};

/**
 * Asynchronously load available design images
 */
export function prefetchDesignThumbs() {
	if ( typeof window !== 'undefined' ) {
		availableDesigns.featured.forEach( ( design: Design ) => {
			const href = getDesignImageUrl( design );
			const link = document.createElement( 'link' );
			link.rel = 'prefetch';
			link.as = 'image';
			link.href = href;
			document.head.appendChild( link );
		} );
	}
}
