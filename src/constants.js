/// action names
export const ON_CLICK_NUMBER = "onClickNumber";
export const ON_CLICK_DOT = "onClickDot";
export const ON_CLICK_SIGN = "onClickSign";
export const ON_CLICK_SIMPLE_OPERATOR = "onClickSimpleOperator";
export const ON_CLICK_RESULT = "onClickResult";
export const ON_CLICK_MAIN = "onClickMain";
export const ON_CLICK_COMPLEXES = "onClickComplexes";
export const ON_CLICK_MEMORY = "onClickMemory";
export const ON_CLICK_PERCENT = "onClickPercent";


/// simple operators
export const SIMPLE_MINUS = "simpleMinus";
export const SIMPLE_PLUS = "simplePlus";
export const SIMPLE_MULTIPLY = "simpleMultiply";
export const SIMPLE_DIVISION = "simpleDivision";
export const SIMPLE_RESULT = "simpleResult";

/// default value of the firstOperator var
export const NOT_OPERATOR = "notOperator";



/// main operators
export const MAIN_BACKSPACE = "mainBackspace";
export const MAIN_CLEAR = "mainClear";
export const MAIN_CLEAR_LAST = "mainClearLast";

/// complexes operators
export const COMPLEXES_DIVISION_X = "complexesDivisionX";
export const COMPLEXES_SQR_X = "complexesSqrX";
export const COMPLEXES_SQRT_X = "complexesSqrtX";


export const DIVISION_BY_ZERO_IS_NOT_POSSIBLE = "Деление на ноль невозможно";


/// memory operators
export const MEMORY_CLEAR = 'memoryClear';
export const MEMORY_READ = 'memoryRead';
export const MEMORY_PLUS = 'memoryPlus';
export const MEMORY_MINUS = 'memoryMinus';
export const MEMORY_SAVE = 'memorySave';
export const MEMORY_LIST = 'memoryList';


/// modes set

export const MODES = {
    BEGIN_MODE: 0
    , FIRST_OPERATOR: 1
    , MULTIPLE_ACTION: 2
    , LAST_NUMBER: 3
    , AFTER_RESULT: 4
}

