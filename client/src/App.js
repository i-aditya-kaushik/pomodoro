import * as React from 'react';
import { DataProvider } from "./GlobalState";
import Pages from './Pages';

export default function App() {
  return (
    <DataProvider>
      <Pages/>
    </DataProvider>
  );
}
