/**
 * External dependencies
 */
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import { receiveComments } from 'state/comments/actions';

const debug = debugFactory( 'lasagna:channel:public-post' );

export default function( channel, store ) {
	channel.on( 'new_comment', comment => {
		debug( 'New comment', comment );

		if ( ! comment ) {
			return;
		}

		store.dispatch( receiveComments( comment.siteId, comment.postId, [ comment ], true ) );
	} );
}