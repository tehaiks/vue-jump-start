const actions = {
  increment(context) {
    context.commit('increment');
  },
  decrement(context) {
    context.commit('decrement');
  },
};

export { actions as default };
