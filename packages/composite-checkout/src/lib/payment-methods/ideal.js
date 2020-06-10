/**
 * External dependencies
 */
import React from 'react';
import styled from '@emotion/styled';
import debugFactory from 'debug';
import { sprintf } from '@wordpress/i18n';
import { useI18n } from '@automattic/react-i18n';

/**
 * Internal dependencies
 */
import Field from '../../components/field';
import Button from '../../components/button';
import {
	usePaymentProcessor,
	useTransactionStatus,
	useLineItems,
	renderDisplayValueMarkdown,
	useEvents,
} from '../../public-api';
import { SummaryLine, SummaryDetails } from '../styled-components/summary-details';
import { useFormStatus } from '../form-status';
import { registerStore, useSelect, useDispatch } from '../../lib/registry';

const debug = debugFactory( 'composite-checkout:stripe-payment-method' );

export function createIdealPaymentMethodStore() {
	debug( 'creating a new ideal payment method store' );
	const actions = {
		changeCustomerName( payload ) {
			return { type: 'CUSTOMER_NAME_SET', payload };
		},
		changeCustomerBank( payload ) {
			return { type: 'CUSTOMER_BANK_SET', payload };
		},
	};

	const selectors = {
		getCustomerName( state ) {
			return state.customerName || '';
		},
		getCustomerBank( state ) {
			return state.customerBank || '';
		},
	};

	const store = registerStore( 'ideal', {
		reducer(
			state = {
				customerName: { value: '', isTouched: false },
				customerBank: { value: '', isTouched: false },
			},
			action
		) {
			switch ( action.type ) {
				case 'CUSTOMER_NAME_SET':
					return { ...state, customerName: { value: action.payload, isTouched: true } };
				case 'CUSTOMER_BANK_SET':
					return { ...state, customerBank: { value: action.payload, isTouched: true } };
			}
			return state;
		},
		actions,
		selectors,
	} );

	return { ...store, actions, selectors };
}

export function createIdealMethod( { store, stripe, stripeConfiguration } ) {
	return {
		id: 'ideal',
		label: <IdealLabel />,
		activeContent: <IdealFields stripe={ stripe } stripeConfiguration={ stripeConfiguration } />,
		submitButton: (
			<IdealPayButton
				store={ store }
				stripe={ stripe }
				stripeConfiguration={ stripeConfiguration }
			/>
		),
		inactiveContent: <IdealSummary />,
		getAriaLabel: ( __ ) => __( 'iDEAL' ),
	};
}

function IdealFields() {
	const { __ } = useI18n();

	const customerName = useSelect( ( select ) => select( 'ideal' ).getCustomerName() );
	const customerBank = useSelect( ( select ) => select( 'ideal' ).getCustomerBank() );
	const { changeCustomerName, changeCustomerBank } = useDispatch( 'ideal' );

	// TODO: fix autoComplete props
	// TODO: make bank a drop-down
	return (
		<IdealFormWrapper>
			<IdealField
				id="cardholderName"
				type="Text"
				autoComplete="cc-name"
				label={ __( 'Your name' ) }
				description={ __( 'Your name' ) }
				value={ customerName?.value ?? '' }
				onChange={ changeCustomerName }
				isError={ customerName?.isTouched && customerName?.value.length === 0 }
				errorMessage={ __( 'This field is required' ) }
			/>
			<IdealField
				id="cardholderBank"
				type="Text"
				autoComplete="cc-name"
				label={ __( 'Bank' ) }
				description={ __( 'Please select your bank.' ) }
				value={ customerBank?.value ?? '' }
				onChange={ changeCustomerBank }
				isError={ customerBank?.isTouched && customerBank?.value.length === 0 }
				errorMessage={ __( 'This field is required' ) }
			/>
		</IdealFormWrapper>
	);
}

const IdealFormWrapper = styled.div`
	position: relative;
`;

const IdealField = styled( Field )`
	margin-top: 16px;

	:first-of-type {
		margin-top: 0;
	}
`;

function IdealPayButton( { disabled, store, stripe, stripeConfiguration } ) {
	const { __ } = useI18n();
	const [ items, total ] = useLineItems();
	const { formStatus } = useFormStatus();
	const {
		setTransactionRedirecting,
		setTransactionError,
		setTransactionPending,
	} = useTransactionStatus();
	const submitTransaction = usePaymentProcessor( 'ideal' );
	const onEvent = useEvents();
	const customerName = useSelect( ( select ) => select( 'ideal' ).getCustomerName() );
	const customerBank = useSelect( ( select ) => select( 'ideal' ).getCustomerBank() );

	return (
		<Button
			disabled={ disabled }
			onClick={ () => {
				if ( isFormValid( store ) ) {
					debug( 'submitting ideal payment' );
					setTransactionPending();
					onEvent( { type: 'IDEAL_TRANSACTION_BEGIN' } );
					submitTransaction( {
						stripe,
						name: customerName?.value,
						bank: customerBank?.value,
						items,
						total,
						stripeConfiguration,
					} )
						.then( ( stripeResponse ) => {
							if ( ! stripeResponse?.redirect_url ) {
								setTransactionError(
									__(
										'There was an error processing your payment. Please try again or contact support.'
									)
								);
								return;
							}
							debug( 'ideal transaction requires redirect', stripeResponse.redirect_url );
							setTransactionRedirecting( stripeResponse.redirect_url );
						} )
						.catch( ( error ) => {
							setTransactionError( error.message );
						} );
				}
			} }
			buttonState={ disabled ? 'disabled' : 'primary' }
			isBusy={ 'submitting' === formStatus }
			fullWidth
		>
			<ButtonContents formStatus={ formStatus } total={ total } />
		</Button>
	);
}

function ButtonContents( { formStatus, total } ) {
	const { __ } = useI18n();
	if ( formStatus === 'submitting' ) {
		return __( 'Processing…' );
	}
	if ( formStatus === 'ready' ) {
		return sprintf( __( 'Pay %s' ), renderDisplayValueMarkdown( total.amount.displayValue ) );
	}
	return __( 'Please wait…' );
}

function IdealSummary() {
	const customerName = useSelect( ( select ) => select( 'ideal' ).getCustomerName() );
	const customerBank = useSelect( ( select ) => select( 'ideal' ).getCustomerBank() );

	return (
		<SummaryDetails>
			<SummaryLine>{ customerName?.value }</SummaryLine>
			<SummaryLine>{ customerBank?.value }</SummaryLine>
		</SummaryDetails>
	);
}

function isFormValid( store ) {
	const customerName = store.selectors.getCustomerName( store.getState() );
	const customerBank = store.selectors.getCustomerBank( store.getState() );

	if ( ! customerName?.value.length ) {
		// Touch the field so it displays a validation error
		store.dispatch( store.actions.changeCustomerName( '' ) );
	}
	if ( ! customerBank?.value.length ) {
		// Touch the field so it displays a validation error
		store.dispatch( store.actions.changeCustomerBank( '' ) );
	}
	if ( ! customerName?.value.length || ! customerBank?.value.length ) {
		return false;
	}
	return true;
}

function IdealLabel() {
	const { __ } = useI18n();
	// TODO: add icon
	return (
		<React.Fragment>
			<span>{ __( 'iDEAL' ) }</span>
		</React.Fragment>
	);
}
