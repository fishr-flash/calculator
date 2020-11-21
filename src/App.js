import React from 'react';
import Header from "./calculator/Header";
import Output from "./calculator/Output";
import Input from "./calculator/Input";
import MemoryScreen from "./calculator/MemoryScreen";

function App() {
  return (
            <main role="main" className={"App active"}>
                <Header />
                <Output />
                <Input />
                <MemoryScreen/>
            </main>

  );
}

export default App;
