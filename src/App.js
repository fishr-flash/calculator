import React from 'react';
import Header from "./calculator/Header";
import Output from "./calculator/Output";
import Input from "./calculator/Input";

///FIXME: need reconfigure package.json, this don't have flat() and includes()
function App() {
  return (
            <main role="main" className={"App active"}>
                <Header />
                <Output />
                <Input />
            </main>

  );
}

export default App;
