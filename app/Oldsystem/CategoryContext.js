import createDataContext from './context/createDataContext';

const categoryReducer = (state, action) => {
  switch (action.type) {
    
    default:
      return state;
  }
};



export const { Context, Provider } = createDataContext(
  categoryReducer,
  { },
  { name: '',products: []});