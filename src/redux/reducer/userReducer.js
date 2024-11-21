const initialState = {
  name: "",
  email: "",
  username: "",
  image: "",
  expenses: [],
  budgets: [],
  savings: [],
  savingGoals: [],
};

function userReducer(state = { initialState }, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        username: action.payload.username,
        image: action.payload.image,
        expenses: action.payload.expenses,
        budgets: action.payload.budgets,
        savings: action.payload.savings,
        savingGoals: action.payload.savingGoals,
      };
    case "DELETE_USER":
      return initialState;
    case "UPDATE_EXPENSES":
      return {
        ...state,
        expenses: action.payload,
      };
    case "UPDATE_BUDGETS":
      return {
        ...state,
        budgets: action.payload,
      };
    case "UPDATE_SAVINGS":
      return {
        ...state,
        savings: action.payload,
      };
    case "UPDATE_SAVING_GOALS":
      return {
        ...state,
        savingGoals: action.payload,
      };
    case "GET_USER":
      return state;
    default:
      return state;
  }
}

export default userReducer;
