export const getBuffer = (state, action) => {

    return parseFloat(`${state.buffer}${ state.onDot ? ",":"" }${action.value}`);
};

export const getFirstNumber = (state, action, buffer) => {
    let firstNumber = state.firstNumber;

    if (state.resultNumber) {
        firstNumber = state.resultNumber;
    } else if (!state.secondNumber) {
        firstNumber = buffer;
    }
    return firstNumber;
};

export const getSecondNumber = (state, action, buffer) => {
    let secondNumber = state.secondNumber;
    if (state.resultNumber)
        secondNumber = 0;

    return secondNumber;
};

export const getOutput = (state, action, buffer) => {
    return `${state.output === '0' || undefined ? "" : state.output}${action.value}`
};