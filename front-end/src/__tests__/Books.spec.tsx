import React from 'react';
import Books from '../components/Books/Books';
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';


test('Checks that Books renders without crashing', async () => {
    render(<BrowserRouter> <Books /> </BrowserRouter>);
    const screenText = screen.getByTestId("books")
    expect(screenText).toBeInTheDocument();
})