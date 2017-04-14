import Immutable from 'immutable';

const $$initState = Immutable.fromJS({
    modalVisible: false,
    modalTitle: '',
});

export const queryReducer = (state = $$initState, action) => {
    switch (action.type) {
        case 'SHOW_MODAL': {
        	console.log('showing modal', state);

        	let newState = state.set('modalVisible', true)
        						.set('modalTitle', action.payload);

        	return newState;
        }
        case 'HIDE_MODAL': {
        	return state.set('modalVisible', false);
        }

        case 'ROW_ITEM_SELECTED': {
        	console.log('action in ROW_ITEM_SELECTED', action);
        	return state.set('selectedItem', action.payload.item);
        }
        default: return state;
    }
};