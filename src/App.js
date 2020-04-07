import React from 'react';
import Header from "./calculator/Header";
import Output from "./calculator/Output";
import Input from "./calculator/Input";


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
